var router = require('express').Router();
const Model = require('../../models/books');
let bookList = [
  {id:0,name:'Make Time: How to Focus on what Matters Every Day'},
  {id:1,name:'The Power Of Habit'},
]


// Replace the route name
router.get('/', (request, response) => {
  // The function will return your bookList in a JSON
  // Sample: { allBooks: ["Make Time: How to Focus on what Matters Every Day", "The Power Of Habit"]}
  return response.json({ allBooks: bookList })
})

router.post('/', (request, response) => {
  // We get the parameter 'name' from the body
  const bookName = request.body.name

  // We check if the book list includes the new book
  // If it is, we return 'false'
  console.log(request.body.name)
  if (bookList.includes(bookName)) return response.json({ success: false })

  // Otherwise, we add the new book in the list and return 'true'
  bookList.push({name:bookName,id:Math.floor(Math.random() * 99999999999) + 1})
 
   const data = new Model({
        name: request.body.name,
    })

    try {
        const dataToSave = data.save();
        response.status(200).json(dataToSave)
    }
    catch (error) {
        response.status(400).json({message: error.message})
    }
     return response.json(bookList)
})

router.delete('/', (request, response) => {
  // We get the parameter 'name' from the body
  const bookToDelete = request.body.name

  // We create a new array with all elements different from the book to delete
  bookList = bookList.filter((book) => book !== bookToDelete)

  // We return the new list
  return response.json({ allBooks: bookList })
})
router.put('/', (request, response) => {
  // We get the parameters 'nameToUpdate' and 'updatedName' from the body
  const bookToUpdate = request.body.nameToUpdate
  const updatedBook = request.body.updatedName

  // We search if the book to update is in the list
  const indexOfBookToUpdate = bookList.findIndex(
    (book) => book === bookToUpdate
  )

  // If it is not a book from the list, we return 'false'
  if (indexOfBookToUpdate === -1) return response.json({ success: false })

  // Otherwise, we replace the name and return 'true'
  bookList[indexOfBookToUpdate] = updatedBook
  return response.json({ success: true })
})
module.exports = router