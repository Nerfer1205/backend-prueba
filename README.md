Backend Project
Este proyecto es una API backend construida con Nest.js y Prisma ORM, conectada a una base de datos MySQL. La guía a continuación te ayudará a instalar, configurar y ejecutar el backend y la base de datos.

Prerrequisitos
Node.js (versión 14 o superior)
Docker
Nest.js CLI (Opcional, pero recomendado)
Prisma CLI para la gestión de la base de datos
Instalación
Clonar el repositorio:

bash
Copiar código
git clone https://github.com/tu_usuario/tu_repositorio.git
cd tu_repositorio
Instalar las dependencias del proyecto:

bash
Copiar código
npm install
Configurar las variables de entorno:

Crea un archivo .env en el directorio raíz y agrega los siguientes valores:

plaintext
Copiar código
DATABASE_URL="mysql://usuario:contraseña@localhost:3306/nombre_bd"
Reemplaza usuario, contraseña, localhost, 3306, y nombre_bd con tus valores de conexión a MySQL.

Configuración de la Base de Datos con Docker
Si prefieres ejecutar MySQL usando Docker, sigue estos pasos:

Crear un contenedor de MySQL:

bash
Copiar código
docker run --name mysql-container -e MYSQL_ROOT_PASSWORD=contraseña -e MYSQL_DATABASE=nombre_bd -p 3306:3306 -d mysql:8.0
Esto ejecutará MySQL en el puerto 3306 con nombre_bd como nombre de la base de datos. Asegúrate de actualizar la variable DATABASE_URL en tu archivo .env con estos detalles.

Ejecutar migraciones de Prisma:

Inicializa la base de datos y sincroniza el esquema ejecutando:

bash
Copiar código
npx prisma migrate dev --name init
Esto creará las tablas en tu base de datos de acuerdo con el esquema de Prisma.

Generar el cliente Prisma:

Si aún no has generado el cliente Prisma, ejecútalo con:

bash
Copiar código
npx prisma generate
Ejecución del Backend
Iniciar el servidor de desarrollo de Nest.js:

bash
Copiar código
npm run start:dev
El servidor estará disponible en http://localhost:3000.

Verificar la conexión a la base de datos:

Puedes verificar la conexión y los datos utilizando un cliente de base de datos como DBeaver o la consola Prisma:

bash
Copiar código
npx prisma studio
Prisma Studio se abrirá en tu navegador y te permitirá ver y gestionar los datos de la base de datos.
