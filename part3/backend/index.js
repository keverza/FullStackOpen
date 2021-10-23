// const http = require('http')
require('dotenv').config()
const express = require('express')
const morgan = require("morgan")
const app = express()
const cors = require('cors')


// app.use(requestLogger) // request.body is undefined!
app.use(express.json())
app.use(cors())
app.use(express.static('build'))

morgan.token("payload", function (req) {
  return JSON.stringify(req.body)
})

app.use(morgan(":method :url :status :res[content-length] - :response-time ms :payload"))

const Person = require('./models/person')
// const Person = mongoose.model('Person', personSchema)

// let persons = [
//   {
//     "id": 1,
//     "name": "Arto Hellas",
//     "number": "040-123456"
//   },
//   {
//     "id": 2,
//     "name": "Ada Lovelace",
//     "number": "39-44-5323523"
//   },
//   {
//     "id": 3,
//     "name": "Dan Abramov",
//     "number": "12-43-234345"
//   },
//   {
//     "id": 4,
//     "name": "Mary Poppendieck",
//     "number": "39-23-6423122"
//   },
//   {
//     "id": 5,
//     "name": "Barie Pioppendyck",
//     "number": "39-23-6423122"
//   }
// ]


app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (request, response) => {
  Person.find({}).then(people => {
    response.json(people)
  })
})

app.get('/info', (request, response, next) => {
  Person.find({})
    .then((persons) => {
        response.send(`
    <p>The phonebook has info for ${Object.keys(persons).length} people</p>
    <p>${new Date()}</p>`)
    })
    .catch((error) => next(error))
})

app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then((people) => {
      if (people) {
        response.json(people)
      } else {
        response.status(404).end
      }
    })
    .catch(error => next(error))

})

const generateId = () => {
  const maxId = Math.floor(Math.random() * 9000)
  return maxId
}
app.post('/api/persons', (request, response, next) => {
  const body = request.body
  const person = new Person({
    name: body.name,
    number: body.number,
  })

  person
    .save()
    .then(savedPerson => savedPerson.toJSON())
    .then((savedAndFormattedPerson) =>  response.json(savedAndFormattedPerson))
    .catch((error) => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body
  const person = {
    name: body.name,
    number: body.number,
  }

  Person.findByIdAndUpdate(request.params.id, person, {
    new: true,
    runValidators: true,
    context: "query"
  })
    .then((updatedPerson) => {
    response.json(updatedPerson)
  })
    .catch((error) => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch((error) => next(error))
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}
// handler of requests with unknown endpoint
app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message})
  }
  next(error)
}
// this has to be the last loaded middleware.
app.use(errorHandler)


const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})