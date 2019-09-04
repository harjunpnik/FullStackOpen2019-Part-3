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

//  GET ALL PERSONS
app.get('/api/persons', (req, res, next) => {
  Person.find({}).then(person => {
    res.json(person.map(pers => pers.toJSON()))
  })
  .catch(error => next(error))
})

//  GET PERSON WITH ID
app.get('/api/persons/:id', (req, res, next) => {
  Person.findById(req.params.id).then(person => {
    if(person){
      res.json(person.toJSON())
  } else{
      res.status(404).end()
  }
  })
  .catch(error => next(error))
})

//  POST PERSON
app.post('/api/persons', (req, res, next) => {
    
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
    .catch(error => next(error))
  })

//  UPDATE PERSON
app.put('/api/persons/:id', (req, res, next) => {
  const person = {
    name:req.body.name,
    number: req.body.number
  }

  Person.findByIdAndUpdate(req.params.id, person, { new: true })
    .then(updatePerson => {
      res.json(updatePerson.toJSON())
    })
    .catch(error => next(error))
})
  
//  DELETE PERSON WITH ID
app.delete('/api/persons/:id', (req, res, next) => {
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

const errorHandler = (error, req, res, next) => {
  console.error(error.message)

  if (error.name === 'CastError' && error.kind === 'ObjectId') {
    return res.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return res.status(400).json({ error: error.message })
  }
 

  next(error)
}
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})