## 🌟 Disruptive Technical Test Web App

¡Bienvenidos a mi prueba técnica! Esta aplicación, desarrollada con **React** y **Zustand**, permite la gestión contenido y categorias con diferentes roles y permisos.

---

### 🚀 Características

- **Autenticación**: Inicia sesión utilizando las siguientes credenciales:
  - **Email**: `admin@admin.com`
  - **Contraseña**: `Admin123456`

- **Roles de Usuario**:
  - **📖 Lector**: Puede ver la información.
  - **✍️ Creador**: Puede ver y crear contenido, **pero debe tener al menos una categoría creada** para poder crear contenido.
  - **👑 Admin**: Puede ver, crear y eliminar contenido.

---

### 🛠️ Componentes

- **🔑 Login**: En la página de inicio de sesión, encontrarás un componente para realizar el logueo y otro para la creación de usuarios con los roles de lector y creador.

- **🌐 Navegación**: 
  - En la parte superior de la aplicación, hay un botón **"Cerrar sesión"** que permite finalizar la sesión actual.
  - La **navbar** incluye un buscador que permite buscar por nombre o título, dependiendo de si estás en el panel de categorías o en el contenido.

---

### 📦 Instalación

Para instalar y ejecutar la aplicación, sigue estos pasos:

1. **Clona el repositorio**:
   ```bash
   git clone https://github.com/nestordqa/disruptive-webapp.git
   ```

2. **Navega al directorio del proyecto**:
   ```bash
   cd disruptive-webapp
   ```

3. **Instala las dependencias**:
   ```bash
   npm install
   ```

4. **Inicia la aplicación**:
   ```bash
   npm run start
   ```

---

¡Gracias por usar la **Disruptive Technical Test Web App**! Si tienes alguna pregunta o sugerencia, no dudes en abrir un issue en el repositorio.🌟