# 💬 Aplicación de Chat en Tiempo Real

Este proyecto es una aplicación de chat interno en tiempo real, desarrollada como solución de comunicación entre los miembros del equipo de trabajo de Don Parca. Utiliza WebSockets para una comunicación bidireccional eficiente y MongoDB para persistencia de datos.

## 🚀 Tecnologías Utilizadas

- **Node.js** - Entorno de ejecución JavaScript del backend  
- **Express.js** - Framework para servidor HTTP  
- **Socket.io** - Comunicación en tiempo real  
- **MongoDB** - Base de datos NoSQL  
- **Mongoose** - ODM para MongoDB  
- **Bootstrap 5** - Estilizado y diseño responsivo  
- **bcryptjs** - Encriptación de contraseñas  
- **dotenv** - Gestión de variables de entorno  

## 📦 Instalación

1. **Clona el repositorio**

```bash
git clone https://github.com/tu-usuario/nombre-del-repo.git
cd nombre-del-repo
```

2. **Instala las dependencias**

```bash
npm install
```

3. **Crea un archivo `.env`**

```bash
touch .env
```

Y agrega las siguientes variables:

```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/chatdb
JWT_SECRET=tu_clave_secreta
```

4. **Ejecuta el servidor**

```bash
npm run dev
```

El servidor correrá en [http://localhost:3000](http://localhost:3000)

## 🛠 Funcionalidades

- Registro y login de usuarios  
- Chat en tiempo real con WebSockets  
- Sistema de salas privadas  
- Mensajes persistentes  
- Estilo responsivo con Bootstrap  

## 📁 Estructura del Proyecto

```
├── config/           # Configuración de la DB
├── controllers/      # Controladores para rutas
├── models/           # Modelos de Mongoose
├── public/           # Archivos estáticos (HTML, CSS, JS)
├── routes/           # Rutas de la aplicación
├── views/            # Plantillas de frontend
├── .env              # Variables de entorno
├── server.js         # Archivo principal
```

## ✨ Créditos

Aplicación desarrollada por y para el equipo de trabajo de **Don Parca** 🦴 como parte de actividades académicas de arquitectura de software.

---

¡Conectá, compartí y trabajá mejor con esta herramienta de comunicación interna!
