// Finish 3.1-3.21 //

require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()
const Person = require('./models/person')
app.use(cors())
app.use(express.json())

app.use(express.static('build'))

morgan.token('body', (req) => {
  return req.method === 'POST' ? JSON.stringify(req.body) : ''
})

app.use(
  morgan((tokens, req, res) => {
    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, 'content-length'),
      '-',
      tokens['response-time'](req, res),
      'ms',
      tokens.body(req, res),
    ].join('  ')
  })
)

app.get('/api/persons', (req, res, next) => {
  Person.find({})
    .then((persons) => {
      res.json(persons)
    })
    .catch((error) => {
      next(error)
    })
})

app.get('/info', (req, res, next) => {
  Person.countDocuments({})
    .then((result) => {
      const responseText = `<div>Phone book has info for ${result} people</div> <div>${new Date().toString()}</div>`
      res.send(responseText)
    })
    .catch((error) => {
      next(error)
    })
})

app.get('/api/persons/:id', (req, res, next) => {
  Person.findById(req.params.id)
    .then((person) => {
      if (person) {
        res.json(person)
      } else {
        res.status(404).end()
      }
    })
    .catch((error) => next(error))
})

app.delete('/api/persons/:id', (req, res, next) => {
  const id = req.params.id
  Person.findByIdAndDelete(id)
    .then((person) => {
      if (person) {
        return res.status(204).json(person)
      } else {
        return res.status(404).send({ error: `can't find person id: ${id}` })
      }
    })
    .catch((error) => {
      next(error)
    })
})

app.post('/api/persons', (req, res, next) => {
  if (!req.body.name || !req.body.number) {
    return res.status(400).json({
      error: 'name or number is missing',
    })
  }

  Person.findOne({ name: req.body.name }).then((foundPerson) => {
    if (foundPerson) {
      return res.status(400).json({
        error: 'name must be unique',
      })
    }

    const newPerson = new Person({
      name: req.body.name,
      number: req.body.number,
    })

    newPerson
      .save()
      .then((savedPerson) => {
        res.json(savedPerson)
      })
      .catch((error) => {
        next(error)
      })
  })
})

app.put('/api/persons/:id', (req, res, next) => {
  const id = req.params.id
  const body = req.body

  const person = { name: body.name, number: body.number }

  Person.findByIdAndUpdate(id, person, {
    new: true,
    runValidators: true,
    context: 'query',
  })
    .then((p) => {
      console.log(p)
      res.status(204).send(p)
    })
    .catch((error) => {
      next(error)
    })
})

const errorHandler = (error, request, response, next) => {
  console.log(error.name)
  if (error.name === 'CastError') {
    return response
      .status(400)
      .send({ error: `malformatted ID error: ${error.message}` })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }
  next(error)
}
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
