# Tienda SENA

---

### Juan Camilo Gallego Jurado
### Carlos Andres Usuga Arenas
### Cristian David Vargas Arenas

---

## Version 

### Reglas para la numeración

1. Comienza en `V1.0.0` cuando se lance la primera versión pública estable.
2. Incrementa:
   - **MAJOR** cuando introduces cambios incompatibles con versiones anteriores.
   - **MINOR** cuando añades nuevas funcionalidades compatibles con versiones anteriores.
   - **PATCH** cuando arreglas errores o realizas mejoras internas.
3. Utiliza etiquetas de **pre-lanzamiento** para versiones en desarrollo, como:
   - `alpha`: Versión en desarrollo inicial, puede ser inestable. Ejemplo: `1.2.0-alpha.1`.
   - `beta`: Versión más estable, pero puede contener errores. Ejemplo: `1.2.0-beta.1`.
   - `rc` (release candidate): Candidata a ser estable si no se encuentran errores. Ejemplo: `1.2.0-rc.1`.

---
## Convencionales

- Carpetas: 
  - `src/`: Contiene el código fuente del proyecto.
  - `config/`: Contiene archivos de configuración.
  - `public/`: Contiene archivos estáticos como imágenes, CSS, y JavaScript.

- Archivos: 
  - `index.js`: Punto de entrada principal de la aplicación.
  - `package.json`: Archivo de configuración del proyecto y dependencias.
  - `.gitignore`: Lista de archivos y carpetas que Git debe ignorar.
  - `README.md`: Documentación del proyecto.

- Funciones: 
  - Las funciones deben tener nombres descriptivos y estar en camelCase.
  - Las funciones deben ser pequeñas y realizar una sola tarea.
  - Las funciones deben estar documentadas con comentarios que expliquen su propósito y uso.

- Variables: 
  - Las variables deben tener nombres descriptivos y estar en camelCase.
  - Las constantes deben estar en mayúsculas y separadas por guiones bajos (e.g., `MAX_LIMIT`).
  - Evitar el uso de variables globales siempre que sea posible.
  - Utilizar `let` y `const` en lugar de `var` para declarar variables.

---



