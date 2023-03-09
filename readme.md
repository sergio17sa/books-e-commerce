# Books e-commerce

## Descripción
Esta aplicación es el Back-end de e-commerce de libros construida utilizando Prisma, Node.js, PostgreSQL, Bcrypt y JWT. Se ha utilizado un paradigma de programación orientado a objetos para asegurar la escalabilidad de la aplicación.

## Instalación
- Clonar el repositorio o descargar el archivo zip.
- Instalar las dependencias con `npm install`.
- Variables de entorno necesarias: 
`PORT`: donde corre la app, 
`DATABASE_URL`: credenciales de la base de datos de PostgreSQL, 
`KEY_TOKEN`: clave secreta para creación y decifrado del token.
- Ejecutar la aplicación con `npm start`.

## Uso
La documentación de los endpoints de la API se encuentra en el siguiente link de Postman: [Link de documentación de Postman](https://documenter.getpostman.com/view/23509083/2s93JrvjDa).

## Funcionalidades
- Registro de usuarios con correo electrónico, nombre y contraseña.
- Inicio de sesión de usuarios con correo electrónico y contraseña.
- Edición de dirección de residencia y foto de perfil de usuario.
- Creación de libros indicando el ISBN, título, precio, autor, editorial y número de existencias.
- Creación de productos en la categoría "otherproducts" con precio, código, nombre y número de existencias.
- Creación de categorías.
- Creación de roles.
- Actualización de existencias de productos en cualquier momento.
- Registro de ingreso (compra) de un producto indicando el distribuidor y la cantidad comprada.
- Consulta de productos por id y tipo para verificar sus existencias.
- Agregado de productos al carrito de compras.
- Consulta de la lista de productos con nombres y precios.

## Seguridad
Esta aplicación implementa las siguientes medidas de seguridad:
- Bcrypt para el hash y la verificación de contraseñas de usuario.
- JWT (JSON Web Tokens) para la autenticación y autorización de usuarios.
- Variables de entorno para almacenar credenciales y otros datos confidenciales.

## Contribuciones
Las contribuciones son bienvenidas. Si deseas contribuir a este proyecto, por favor crea un pull request.

