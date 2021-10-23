const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator');



// if (process.argv.length < 3) {
//   console.log('Please provide the password as an argument: node mongo.js <password>')
//   process.exit(1)
// }

// const password = process.argv[2]

const url = process.env.MONGODB_URI
// mongodb+srv://Fullstackopen:${password}@cluster0.3x9sp.mongodb.net/phonebook-app?retryWrites=true&w=majority

console.log('connecting to', url)
mongoose.connect(url)
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

const personSchema = new mongoose.Schema({
  id: Number,
  name: {
    type: String,
    minLength: 3,
    unique: true,
    required: true
  },
  number: {
    type: String,
    match: /^\d{8}$/g,
    required: true
  },
})

personSchema.plugin(uniqueValidator)

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})
//
// if (process.argv[2]) {
//   const person = new Person({
//     "name": process.argv[2],
//     "number": process.argv[3]
//   })
//
//   person.save().then(result => {
//     console.log('contact saved!')
//     console.log(process.argv.length)
//     mongoose.connection.close()
//   })
// } else if (process.argv.length < 5) {
//   Person.find({}).then(people => {
//     console.log('phonebook:')
//     people.forEach(person => {
//
//       console.log(person.name, person.number)
//     })
//     mongoose.connection.close()
//   })
// }


module.exports = mongoose.model('Person', personSchema)