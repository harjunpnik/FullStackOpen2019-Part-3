require('dotenv').config()
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')

app.use(cors())
app.use(express.static('build'))
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(morgan(':method :url :status :response-time ms :content'))

morgan.token('content', function (req, res) { return JSON.stringify(req.body) })

let persons = [
    {
        name: "Arto Hellas",
        number: "040-123456",
        id: 1
    },
    {
        name: "Ada Lovelace",
        number: "39-44-5323523",
        id: 2
    },
    {
        name: "Dan Abramov",
        number: "12-43-234345",
        id: 3
    },
    {
        name: "Mary Poppendieck",
        number: "39-23-6423122",
        id: 4
    },
  ]

//  GET ALL PERSONS
app.get('/api/persons', (req, res) => {
  Person.find({}).then(person => {
    res.json(person.map(pers => pers.toJSON()))
  })
})

//  GET PERSON WITH ID
app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const person = persons.find(person => person.id === id)

    if(person){
        res.json(person)
    } else{
        res.status(404).end()
    }
})

//  POST PERSON
app.post('/api/persons', (req, res) => {
    
    if (!req.body.number || !req.body.name) {
        return res.status(400).json({ 
          error: 'name or number is missing' 
        })
    }

    const person = new Person({
      name:req.body.name,
      number: req.body.number
    })

    person.save().then(savedPerson => {
      res.json(savedPerson.toJSON())
    })
  })
//  DELETE PERSON WITH ID
app.delete('/api/persons/:id', (req, res,next) => {
  Person.findByIdAndRemove(req.params.id)
    .then(result =>{
      res.status(204).end()
    })
    .catch(error => next(error))
})

//  GET INFO
app.get('/info', (req, res) => {
    res.send(`<div>
        <p>Phonebook has info for ${persons.length} people </p>
        <p>${new Date()}</p>
    </div>`)
})

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError' && error.kind === 'ObjectId') {
    return response.status(400).send({ error: 'malformatted id' })
  } 

  next(error)
}
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})