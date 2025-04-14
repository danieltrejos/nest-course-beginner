# GUIA DE NESTJS

## Instalación y configuración

npm i -g @nestjs/cli
nest new project-name

## Configurar linter y formateador

### Eslint

eslint.config.mjs

```js
rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-floating-promises': 'warn',
      '@typescript-eslint/no-unsafe-argument': 'warn',
      'prettier/prettier': 'off' // Desactiva Prettier dentro de ESLint
    }
```

> Reload eslint server

### Prettier:

.prettierrc

```json
{
  "endOfLine": "auto",
  "semi": true,
  "singleQuote": true,
  "printWidth": 100,
  "trailingComma": "none",
  "bracketSpacing": true,
  "proseWrap": "preserve"
}
```

### VSCODE

settings.json

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "eslint.format.enable": false, // 👈 Desactiva el formateo de ESLint
  "files.trimTrailingWhitespace": false
}
```

> Open workspace setting JSON
> Cambiar a iconos de material icon la extensio para nets js
> {
> "material-icon-theme.activeIconPack": "nest"
> }

### Scripts para usar

Desarollo: `start:dev`

### Reinicia VSCode y limpia caché de ESLint y Prettier

```sh
rm -rf node_modules package-lock.json
npm install
npx eslint --fix .
npx prettier --write .
```

## Modulo de configuracion

Usamos el modulo de configuración para poder acceder a variables de entorno desde el .env y asi injectarl el ConfigService

---

```sh
npm i --save @nestjs/config
```

Importar el modulo en el src/app.module.ts:

```ts
import { ConfigModule } from '@nestjs/config';

// Asegurar que el process.env.NODE_ENV se cargue aunque sea en desarrollo
const envFilePath = `.${process.env.NODE_ENV || 'development'}.env`;

console.log('Cargando archivo de entorno:', envFilePath);

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath,
      isGlobal: true
    }),
    UsersModule
  ]
})
export class AppModule {}
```

Las variables de entorno vienen de .development.env:

```
NODE_ENV=development
PORT=8000
DATABASE_USER=test
DATABASE_PASSWORD=test
```

---

Instanciar el servicio ConfigService en main.ts y usarlo como variable para extraer el puerto

```ts
import { ConfigService } from '@nestjs/config';

const configService = app.get(ConfigService); // configService.get('PORT')

console.log('PORT desde ConfigService:', configService.get('PORT'));
```

configService.get('PORT')

### Instalar morgan para LOG de peticiones

En consola:

```sh
npm i morgan
npm i --save-dev @types/morgan
```

importar morgan en main.ts:
`import * as morgan from 'morgan'`

Usar morgan en el main.ts, dentro de la funcion bootstrap:

`app.use(morgan('dev'))`

### Instalar CORS para permitir peticiones desde otro dominio

En src/constants/cors.ts:

```ts
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

export const CORS: CorsOptions = {
  origin: true,
  methods: 'GET, HEAD, PUT, PATH POST, DELETE, OPTIONS',
  credentials: true
};

// se crea un index.ts en la misma carpeta y se exporta
export { CORS } from './cors';
```

En el main.ts se importa cors:

```js
import { CORS } from './constants';

// Dentro de la funcion bootstrap se activa el cors
app.enableCors(CORS);
```

### Habilitar un prfijo global

Dentro de main.ts, deontro de la funcion, se configura el prefijo:
`app.setGlobalPrefix('api')`

# Creacion de componentes

Para conocer lo que podemos crear con CLI usamos

- La bandera --flat permite crearlo sin crear una nueva carpeta por eso se instalan dentro de carpetas especificas
- La bandera --no-spec: Omite los archivos de testing

```sh
nest
nest g mo users
nest g co users/controllers/users --flat --no-spec
nest g s users/services/users --flat --no-spec
```

### Creacion de un recuros completo
nest g res productos --no-spec


### Generar Documentacion
npm install --save @nestjs/swagger

Luego en el main.ts

## Docker

docker compose up -d
docker exec -it postgres_db psql -U postgres -d postgres
