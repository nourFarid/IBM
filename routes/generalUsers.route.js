const router =require('express').Router()
const {getAllBooks,getByISBN,getByAuthor,getByTitle,getReviews,addBook,addReview,register,login}= require("../controllers/generalUser")

router.get('/getAll', getAllBooks)
router.get('/getByISBN/:ISBN', getByISBN)
router.get('/getByAuthor/:author', getByAuthor)
router.get('/getByTitle/:title', getByTitle)
router.get('/getReviews/:id', getReviews)
router.post('/addReview/:id', addReview)
router.post('/register',register)
router.post('/login',login)
router.post('/addBook',addBook)








module.exports=router