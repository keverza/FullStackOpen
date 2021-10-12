const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://Fullstackopen:${password}@cluster0.3x9sp.mongodb.net/phonebook-app?retryWrites=true&w=majority`

mongoose.connect(url)

const personSchema = new mongoose.Schema({
  id: Number,
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

const generateId = () => {
  const maxId = Math.floor(Math.random() * 9000)
  return maxId
}
if (process.argv[3]) {
  const person = new Person({
    "id": generateId(),
    "name": process.argv[3],
    "number": process.argv[4]
  })

  person.save().then(result => {
    console.log('contact saved!')
    console.log(process.argv.length)
    mongoose.connection.close()
  })
} else if (process.argv.length < 5) {
  Person.find({}).then(people => {
    console.log('phonebook:')
    people.forEach(person => {

      console.log(person.name, person.number)
    })
    mongoose.connection.close()
  })
}