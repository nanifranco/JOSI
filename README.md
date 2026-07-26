# JOSI MAKEUP

Sitio web de una sola página para una maquillista profesional. React + TypeScript + Tailwind CSS v4, con animaciones discretas (Framer Motion) e íconos mínimos (Lucide).

## Desarrollo

```bash
npm install
npm run dev      # servidor de desarrollo
npm run build    # build de producción (tsc + vite build)
npm run lint      # oxlint
```

## Cómo editar el contenido

Todo el contenido editable vive en **`src/config/site.ts`**: contacto (WhatsApp, Instagram, correo, zona, horarios), textos, servicios y precios, preguntas frecuentes, testimonios y las fotografías. Busca las etiquetas `EDITAR:` para ubicar rápidamente lo que falta por completar con información real.

### Fotografías

Cada espacio de imagen se define como un `ImageSlot` (`{ src, alt, label }`) en `site.ts`. Mientras `src` esté vacío se muestra un marcador de posición editorial con una etiqueta indicando qué fotografía colocar ahí. Para usar una imagen real, coloca el archivo en `public/images/` y actualiza `src`, por ejemplo:

```ts
hero: {
  image: { src: '/images/hero.jpg', alt: '...', label: '...' },
}
```

### WhatsApp

El formulario de agenda (`src/components/BookingForm.tsx`) arma un mensaje con `src/lib/whatsapp.ts` y abre `wa.me` con el número definido en `contact.whatsappNumber` (`src/config/site.ts`). Enviar el formulario **solicita disponibilidad**, no confirma la cita automáticamente.

Para integrar en el futuro un sistema de reservas externo (Calendly, Cal.com, Google Calendar o un backend propio), el punto de partida es `contact.externalBookingUrl` en `site.ts` y el `handleSubmit` de `BookingForm.tsx`.
