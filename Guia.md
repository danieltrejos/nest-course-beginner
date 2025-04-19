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

En el archivo main.ts

importar DocumentBuilder, SwaggerModule

Luego en el main.ts dentro de la funcion bootstrap

```ts
//!Configuración de Swagger
  const config = new DocumentBuilder()
    .setTitle('Next Template')
    .setDescription('Documentación de la API')
    .setVersion('1.0')
    .addTag('api')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
```
A continuacion si registran los diferentes decoradores de Api de swagger en los modulos y dto


### Añadiendo Pipes

Una tubería(Pipe) es una clase anotada con el decorador @Injectable(), que implementa la PipeTransform interfaz.

Las tuberías tienen dos casos de uso típicos:

- transformación : transformar los datos de entrada al formato deseado (por ejemplo, de cadena a entero)
- Validación : evalúa los datos de entrada y, si son válidos, simplemente los pasa sin cambios; de lo contrario, lanza una excepción.

En ambos casos, las tuberías operan sobre el argumentsprocesamiento de un controlador de ruta . Nest interpone una tubería justo antes de invocar un método, la cual recibe los argumentos destinados al método y opera sobre ellos. Cualquier operación de transformación o validación se realiza en ese momento, tras lo cual se invoca el controlador de ruta con cualquier argumento (potencialmente) transformado.

Los pipe se vinculan a metodos de las rutas del controlador.

Nest incluye varias tuberías integradas que puedes usar de inmediato. También puedes crear tus propias tuberías personalizadas. 

Las tuberías se ejecutan dentro de la zona de excepciones. Esto significa que, cuando una tubería genera una excepción, esta es gestionada por la capa de excepciones (filtro de excepciones global y cualquier filtro de excepciones aplicado al contexto actual). Dado lo anterior, debe quedar claro que, cuando se genera una excepción en una tubería, no se ejecuta ningún método de controlador. Esto proporciona una técnica recomendada para validar los datos que llegan a la aplicación desde fuentes externas en el límite del sistema.

Nest viene con varios tubos disponibles de fábrica Se exportan desde el paquete @nestjs/common :

- ValidationPipe
- ParseIntPipe
- ParseFloatPipe
- ParseBoolPipe
- ParseArrayPipe
- ParseUUIDPipe
- ParseEnumPipe
- DefaultValuePipe
- ParseFilePipe
- ParseDatePipe


### Validacion

Nest funciona bien con la biblioteca de validadores de clases . Esta potente biblioteca permite usar la validación basada en decoradores. Esta validación es extremadamente potente, especialmente al combinarse con las funciones Pipe de Nest , ya que tenemos acceso a metatypela propiedad procesada. Antes de comenzar, necesitamos instalar los paquetes necesarios:

`npm i --save class-validator class-transformer`

Una vez instalados, podemos agregar algunos decoradores a la DTO. Aquí vemos una ventaja significativa de esta técnica: la DTO sigue siendo la única fuente de información para nuestro objeto "Cuerpo de la publicación" (en lugar de tener que crear una clase de validación independiente).

> Una vez instaladas las clases de validacion se utilizan importandolos en el DTO y luego se implementa la validacion requerida, mediante decoradores https://github.com/typestack/class-validator#usage

https://github.com/typestack/class-validator?tab=readme-ov-file#validation-decorators

```js
import {
  validate,
  validateOrReject,
  Contains,
  IsInt,
  Length,
  IsEmail,
  IsFQDN,
  IsDate,
  Min,
  Max,
} from 'class-validator';

export class xxxDto {
  @IsString()

  name: string;

  @IsInt()
  age: number;

}

```

Luego que se han usado los decoradores, en el controladore de la ruta del post o el update, en el @Body(), se pasa como argumento el ValidationPipe (se debe importar)




### QUERY

Dentro del controlador, se puede importar el paquete {Query} from '@nestjs/common'

El cual se injecta en el @GET(), dentro d un metodo

@GET() //users or /users?role = alue
@findAll(@Query('role') role?:'Intern'|'Engineer'){
  return []
}



## Prisma

npm i prisma -D
npx prisma@latest init --db
npx prisma migrate dev --name init
npx prisma migrate reset
npx prisma migrate dev --name init
prisma studio

Cuando genere una modificacion en los medelos de base de datos, debo modificar el el Dto correspondiente


Se crea el servicio de prisma
nest g service prisma


Prisma en la carpeta generated crea typos de los modelos con ts para poder manejar una fuente de verdad

Sin embargo, en los dto necesito clases (no tipos) para poder usar validation pipes.

Como guia, en el dto de creacion, se importa el import { Product } from 'generated/prisma'; tipo Producto, para poder crear los campos del Dto y Saber cuales estan disponibles, y a continuacion se procede a meterles validacion.


```jsx
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';


@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
    async onModuleInit() {
        await this.$connect();
    }
}
```
npm install @prisma/client


## Docker

docker compose up -d
docker exec -it postgres_db psql -U postgres -d postgres

