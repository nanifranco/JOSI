/**
 * Proveedor de OAuth para el panel de contenido (Decap CMS) del sitio JOSI.
 *
 * GitHub Pages no tiene servidor propio, así que el login del panel
 * ("Login with GitHub") necesita esta pieza aparte para intercambiar el
 * código de autorización de GitHub por un token de acceso. Este archivo NO
 * se compila ni se despliega junto con el sitio (está fuera de src/ y
 * public/) — es solo la fuente de referencia. Se despliega por separado
 * como un Cloudflare Worker gratuito.
 *
 * Configurar en el Worker (Settings → Variables and Secrets):
 *   GITHUB_OAUTH_CLIENT_ID       (Variable, texto plano)
 *   GITHUB_OAUTH_CLIENT_SECRET   (Secret, cifrado)
 *
 * Ver el checklist de instalación para los pasos completos.
 */

const GITHUB_AUTHORIZE_URL = 'https://github.com/login/oauth/authorize'
const GITHUB_TOKEN_URL = 'https://github.com/login/oauth/access_token'
const SCOPE = 'repo,user'

export default {
  async fetch(request, env) {
    const url = new URL(request.url)

    if (url.pathname === '/auth') {
      return handleAuth(url, env)
    }
    if (url.pathname === '/callback') {
      return handleCallback(url, env)
    }
    return new Response('Not found', { status: 404 })
  },
}

function handleAuth(url, env) {
  const redirectUri = `${url.origin}/callback`
  const authorizeUrl = new URL(GITHUB_AUTHORIZE_URL)
  authorizeUrl.searchParams.set('client_id', env.GITHUB_OAUTH_CLIENT_ID)
  authorizeUrl.searchParams.set('redirect_uri', redirectUri)
  authorizeUrl.searchParams.set('scope', SCOPE)

  return Response.redirect(authorizeUrl.toString(), 302)
}

async function handleCallback(url, env) {
  const code = url.searchParams.get('code')

  if (!code) {
    return renderPopupResponse({ error: 'missing_code', message: 'No code returned by GitHub.' })
  }

  const tokenRes = await fetch(GITHUB_TOKEN_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      client_id: env.GITHUB_OAUTH_CLIENT_ID,
      client_secret: env.GITHUB_OAUTH_CLIENT_SECRET,
      code,
    }),
  })

  const tokenData = await tokenRes.json()

  if (tokenData.error || !tokenData.access_token) {
    return renderPopupResponse({
      error: tokenData.error || 'token_exchange_failed',
      message: tokenData.error_description || 'Could not exchange code for token.',
    })
  }

  return renderPopupResponse({ token: tokenData.access_token, provider: 'github' })
}

/** content es { token, provider: 'github' } si todo salió bien, o { error, message } si falló. */
function renderPopupResponse(content) {
  const isSuccess = 'token' in content
  const messageType = isSuccess ? 'success' : 'error'
  const payload = isSuccess ? { token: content.token, provider: 'github' } : { message: content.message }

  const html = `<!doctype html>
<html><body>
<script>
  (function () {
    function receiveMessage(e) {
      window.opener.postMessage(
        'authorization:github:${messageType}:${JSON.stringify(payload)}',
        e.origin
      )
      window.removeEventListener('message', receiveMessage, false)
    }
    window.addEventListener('message', receiveMessage, false)
    window.opener.postMessage('authorizing:github', '*')
  })()
</script>
</body></html>`

  return new Response(html, { headers: { 'Content-Type': 'text/html;charset=UTF-8' } })
}
