const mongoose = require('mongoose')
const url = process.env.MONGODB_URI
mongoose.set('strictQuery', false)

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
  },
  date: { type: Date, default: Date.now },
  number: {
    type: String,
    validate: {
      validator: (i) => {
        if (i.includes('-')) return /^((\d{3}|\d{2}-\d+))$/.test(i)
      },
      vmessage: (props) => `${props.value} is not a valid phone number!`,
    },
    minLength: 8,
  },
})
personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

mongoose
  .connect(url)
  .then(() => {
    console.log('database connected')

    if (process.argv.length === 3) {
      return Person.find({})
    } else if (process.argv.length === 5) {
      const newName = process.argv[3]
      const newNumber = process.argv[4]
      const newdate = new Date()

      const newPerson = new Person({
        name: newName,
        number: newNumber,
        date: newdate,
      })

      return newPerson.save()
    }
  })
  .then((data) => {
    if (process.argv.length === 3) {
      console.log('phonebook:')

      data.forEach((person) => {
        console.log(`${person.name} ${person.number}`)
      })
    } else if (process.argv.length === 5) {
      console.log(`added ${data.name} ${data.number} to phonebook`)
    }
    // mongoose.connection.close();
  })

const Person = mongoose.model('Person', personSchema)

module.exports = Person
