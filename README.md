# Proyecto Backend con Nest.js y Prisma

Este proyecto es una API backend construida con Nest.js y Prisma ORM para gestionar una base de datos MySQL.

## Prerrequisitos

Antes de empezar, asegúrate de tener instaladas las siguientes herramientas:

- [Node.js](https://nodejs.org/) (versión 14 o superior)
- [Docker](https://www.docker.com/get-started) para ejecutar MySQL en contenedores
- [Nest.js CLI](https://docs.nestjs.com/cli/overview) (opcional pero recomendado)
- [Prisma CLI](https://www.prisma.io/docs/concepts/components/prisma-cli) para gestionar la base de datos

## Instalación y Configuración

### 1. Clonar el repositorio

```bash
git [clone https://github.com/tu_usuario/tu_repositorio.git](https://github.com/Nerfer1205/backend-prueba.git)
cd backend-prueba
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar las variables de entorno
Crea un archivo .env en la raíz del proyecto y agrega la URL de conexión a la base de datos:
```plaintext
DATABASE_URL="mysql://usuario:contraseña@localhost:3306/nombre_bd"
```
Reemplaza usuario, contraseña, localhost, 3306, y nombre_bd con la información de conexión de tu base de datos MySQL.

##Configuración de la Base de Datos con Docker
Para configurar una base de datos MySQL en Docker:

## 1.Crear un contenedor de MySQL
```bash
docker run --name mysql-container -e MYSQL_ROOT_PASSWORD=contraseña -e MYSQL_DATABASE=nombre_bd -p 3306:3306 -d mysql:8.0
```
##2. Ejecutar migraciones de Prisma
Con la base de datos configurada, sincroniza el esquema de Prisma ejecutando:
```bash
npx prisma migrate dev --name init
```

## 3. Generar el cliente Prisma
Para generar el cliente Prisma (necesario para interactuar con la base de datos), usa el comando:
```bash
npx prisma generate
```
## Ejecución del Backend
"" 1. Iniciar el servidor de desarrollo
Para iniciar el servidor en modo desarrollo:
```bash
npm run start:dev
```
