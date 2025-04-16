# 💼 Boss Machine

## Descripción del Proyecto

Boss Machine es una API completa creada con Node.js y Express.js, que simula una aplicación de gestión para empresarios malvados de gran éxito. La aplicación permite administrar:

- 👨‍🔧 Minions (esbirros)

- 💡 Ideas millonarias

- 📅 Reuniones molestas

- 🧑‍💻 Tareas asignadas a minions (bonus)

---

### Estructura del Servidor

El servidor se configura en server.js.

- Debes agregar middleware:

- body-parser para manejar req.body

- cors para permitir peticiones CORS

- Montar el apiRouter en la ruta /api

- Usar la constante PORT para iniciar el servidor

---
#### Routes

- `/api/minions`
  - GET /api/minions Devuelve todos los minions
  - POST /api/minions Crea un nuevo minion
  - GET /api/minions/:minionId Devuelve un minion por ID
  - PUT /api/minions/:minionId Actualiza un minion
  - DELETE /api/minions/:minionId Elimina un minion
- `/api/ideas`
  - GET /api/ideas Devuelve todas las ideas
  - POST /api/ideas Crea una idea nueva
  - GET /api/ideas/:ideaId Devuelve una idea por ID
  - PUT /api/ideas/:ideaId Actualiza una idea
  - DELETE /api/ideas/:ideaId Elimina una idea
- `/api/meetings`
  - GET /api/meetings Devuelve todas las reuniones
  - POST /api/meetings Crea una reunión automáticamente
  - DELETE /api/meetings Elimina todas las reuniones

---

### Base de Datos Simulada (db.js)

La base de datos está compuesta por arrays en memoria. Puedes usar las funciones auxiliares:

`getAllFromDatabase`:

- Devuelve todos los elementos

`getFromDatabaseById`:

- Devuelve un elemento por ID

`addToDatabase`:

- Agrega un nuevo elemento

`updateInstanceInDatabase`:

- Actualiza un elemento existente

`deleteFromDatabasebyId`:

- Elimina un elemento por ID

`deleteAllFromDatabase`:

- Borra todos los elementos del modelo

---

#### Schemas

- Minion:
  - id: string
  - name: string
  - title: string
  - salary: number
- Idea
  - id: string
  - name: string
  - description: string
  - numWeeks: number
  - weeklyRevenue: number
- Meeting
  - time: string
  - date: JS `Date` object
  - day: string
  - note: string

---

### Middleware Personalizado

- Ubicado en server/checkMillionDollarIdea.js, este middleware valida que las ideas valgan al menos un millón de dólares (producto de numWeeks * weeklyRevenue). Si no lo cumple, retorna un error 400.

---

## Testing

#### 🔧 Instalación
Asegúrate de haber ejecutado:

- npm install

#### Ejecutar tests:

- npm run test

También puedes ejecutar una sola vez:
- npx mocha

Los tests ayudarán a:

- Verificar que todas las rutas funcionen correctamente

- Validar casos borde

- Asegurar la integridad de los datos

- Confirmar que el middleware esté funcionando como se espera
