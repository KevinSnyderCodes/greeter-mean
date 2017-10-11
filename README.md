# Greeter API

A MEAN stack API that greets people by name and remembers how many times it has seen a certain name.

## Run

Make sure you have MongoDB installed, and run `npm install` to install all necessary packages. Then run `npm start`.

## API

GET: `localhost:3000/api`

- Returns the status of the API. If you get a response, the API is running.

POST: `localhost:3000/api/name`

Data:

```json
{ "name": String }
```

- Greets the person and records the interaction.

GET: `localhost:3000/api/name/${name}`

- Tells you how many times the API has seen the given name.