# EcoSort Rewards ♻️

Plataforma de reciclaje inteligente B2B y SaaS. Convierte los residuos en valor recompensando a ciudadanos y midiendo el impacto ambiental real.

## Stack Tecnológico 💻
- **Frontend / Framework:** Next.js 14 (App Router) + React
- **Estilos:** Tailwind CSS v4 + lucide-react + shadcn/ui
- **Autenticación:** NextAuth.js (Auth.js v5)
- **Base de Datos:** Prisma ORM + PostgreSQL (Configurado localmente con SQLite para demostración)
- **Lenguaje:** TypeScript

## Instalación y Arranque 🚀

1. Instalar dependencias:
   ```bash
   npm install
   ```

2. Configurar Base de datos:
   ```bash
   npx prisma db push --accept-data-loss
   npx prisma db seed
   ```

3. Levantar Servidor de Desarrollo:
   ```bash
   npm run dev
   ```

## Usuarios de Prueba (Seed Data)
Para acceder al panel como administrador, ve a `/login` e ingresa con:
- Email: `admin@ecosort.com`
- Password: *(Cualquier valor en entorno local de demo)*

## Despliegue en Producción 🌍
Se recomienda desplegar en Vercel.

### 1. Variables de entorno:
Asegúrate de configurar en Producción:
```env
DATABASE_URL="postgresql://usuario:password@host:5432/ecosort"
AUTH_SECRET="cualquier-string-muy-seguro"
```

### 2. Migración final
Si actualonas el Prisma schema cambiará el driver a Postgres:
```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```
Y ejecuta `npx prisma generate` y `npx prisma migrate deploy` en el CI/CD.

## Autor
Desarrollado para EcoSort Rewards
