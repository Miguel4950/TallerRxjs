# Taller 1: Consumo de APIs con RxJS en Angular

**Materia:** Desarrollo Web  
**Profesor:** Juan Sebastián Angarita Torres  
**Universidad:** Pontificia Universidad Javeriana  

**Integrantes:**
- Miguel Ángel Acuña
- Javier Jaimes
- Samuel Manrique
- Juan Pablo Mota

Este proyecto simula la búsqueda de perfiles en una red social consumiendo la API de [DummyJSON](https://dummyjson.com/).

---

## Características

- **Sin rutas:** Toda la aplicación se presenta en una sola página.
- **Búsqueda por username:** Permite consultar usuarios por su nombre de usuario. Si no existe, muestra un mensaje avisando que no se encontró y oculta el resto de la información.
- **Datos de usuario:** Componente que muestra la foto, nombre, usuario, correo, teléfono y demás información de perfil.
- **Publicaciones y comentarios:** Componente que lista las publicaciones del usuario, sus comentarios con el nombre de cada autor y el número de reacciones con iconos (likes, dislikes y vistas).
- **Componentes y comunicación:** El componente principal se encarga de las consultas HTTP y pasa la información mediante `@Input` a los componentes hijos.
- **Diseño:** Maquetado con Bootstrap 5 y Bootstrap Icons.

---

## Estructura del Proyecto

```
src/app/
├── components/
│   ├── user-profile/     # Componente con los datos del usuario
│   └── user-posts/       # Componente con posts, reacciones y comentarios
├── models/
│   ├── user.model.ts     # Interfaces de usuario
│   ├── post.model.ts     # Interfaces de publicaciones
│   └── comment.model.ts  # Interfaces de comentarios
├── services/
│   ├── user.service.ts   # Peticiones a /users
│   ├── post.service.ts   # Peticiones a /posts
│   └── comment.service.ts# Peticiones a /comments
├── app.component.ts      # Componente principal con la lógica de búsqueda
├── app.component.html
└── app.config.ts         # Configuración del HttpClient
```

---

## Cómo ejecutar el proyecto

1. Instalar dependencias (si es necesario):
   ```bash
   npm install
   ```

2. Iniciar el servidor local:
   ```bash
   npm start
   ```

3. Abrir en el navegador:
   ```
   http://localhost:4200
   ```

4. Puedes probar buscando usuarios como `emilys`, `michaelw`, `sophiab` o un usuario que no exista para ver la alerta.
