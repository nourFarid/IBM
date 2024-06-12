const router =require('express').Router()
const {addReview,deleteReview}= require("../controllers/registeredUsers")
const auth= require("../middleware/verifyUser")

router.post('/addReview/:id',auth.auth(),addReview)
router.put('/deleteReview/:id',auth.auth(),deleteReview)








module.exports=router