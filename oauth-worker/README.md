# Proveedor de OAuth para el panel de contenido

`worker.js` es la pieza que hace posible el login de GitHub en
`/admin`. GitHub Pages no tiene servidor propio, así que esto se
despliega aparte (gratis) como un Cloudflare Worker. Se hace **una sola
vez**.

## Pasos (en este orden)

1. **Desplegar el Worker (sin secretos todavía)**
   - Entra a [dash.cloudflare.com](https://dash.cloudflare.com) → crea una
     cuenta gratis si no tienes → **Workers & Pages** → **Create** →
     **Create Worker**.
   - Bórrale el código de ejemplo y pega el contenido completo de
     `worker.js`.
   - Dale **Deploy**. Anota la URL que te da, algo como
     `https://josi-cms-oauth.tu-usuario.workers.dev`.

2. **Crear la GitHub OAuth App**
   - En [github.com](https://github.com), entra a tu cuenta → foto de
     perfil (arriba a la derecha) → **Settings** → **Developer settings**
     (hasta abajo del menú izquierdo) → **OAuth Apps** → **New OAuth App**.
   - Llena el formulario:
     - **Application name**: `JOSI Site CMS` (o el nombre que quieras)
     - **Homepage URL**: `https://nanifranco.github.io/JOSI/`
     - **Authorization callback URL**: la URL del Worker del paso 1 +
       `/callback`, por ejemplo
       `https://josi-cms-oauth.tu-usuario.workers.dev/callback`
   - Dale **Register application**.
   - Click en **Generate a new client secret** y copia tanto el
     **Client ID** como el **Client Secret** (el secret solo se muestra
     una vez).

3. **Pegar esos datos en el Worker**
   - Vuelve al Worker en Cloudflare → **Settings** → **Variables and
     Secrets** → **Add**:
     - `GITHUB_OAUTH_CLIENT_ID` = el Client ID del paso 2 (tipo
       **Variable**, texto plano).
     - `GITHUB_OAUTH_CLIENT_SECRET` = el Client Secret del paso 2 (tipo
       **Secret**, cifrado).
   - Guarda / vuelve a desplegar el Worker para que tome los cambios.

4. **Actualizar el sitio con la URL real del Worker**
   - En el repo, edita `public/admin/config.yml` y reemplaza
     `https://REEMPLAZAR-CON-TU-WORKER.workers.dev` por la URL real del
     Worker (sin `/auth` al final, solo la URL base).
   - Sube el cambio a `main` (se puede editar directo en github.com y dar
     "Commit changes").

5. **Si Rosi va a entrar con su propia cuenta de GitHub**
   - En el repo → **Settings** → **Collaborators** → **Add people** →
     escribe su usuario o correo de GitHub. Ella tiene que aceptar la
     invitación (le llega por correo) antes de poder entrar al panel.

6. **Probar**
   - Abre `https://nanifranco.github.io/JOSI/admin/`, dale **Login with
     GitHub**, autoriza la aplicación la primera vez, y confirma que
     aparece la lista de secciones editables.
