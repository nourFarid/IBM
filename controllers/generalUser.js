const httpStatusText = require('../utils/httpStatusText.js');
const errorHandling = require('../utils/errorHandling.js');
const BookModel= require('../DB models/book.js')
const UserModel= require('../DB models/user.js')
const HashAndCompare= require('../utils/HashAndCompare.js')
const GenerateToken= require("../utils/GenerateAndVerifyToken.js")
const getAllBooks= errorHandling.asyncHandler(async(req,res,next)=>{
        const books= await BookModel.find().populate('reviews.reviewer','name')

    if(!books)
        {
            return res.status(404).json({ status: httpStatusText.FAIL, message: "NO BOOKS!" });

        }
    return res.status(200).json({ status: httpStatusText.SUCCESS, data:books });

    
})

const getByISBN= errorHandling.asyncHandler(async(req,res,next)=>{
const {ISBN}= req.params
 const book= await BookModel.findOne({ISBN})
 if(!book)
    {
        return res.status(404).json({ status: httpStatusText.FAIL, message: "NO BOOK!" });
    }
    return res.status(200).json({ status: httpStatusText.SUCCESS, data:book });
})

const getByAuthor= errorHandling.asyncHandler(async(req,res,next)=>{
    const {author}= req.params
    const books= await BookModel.find({author})
    if(!books)
       {
           return res.status(404).json({ status: httpStatusText.FAIL, message: "NO BOOKs!" });
       }
       return res.status(200).json({ status: httpStatusText.SUCCESS, data:books });
})

const getByTitle= errorHandling.asyncHandler(async(req,res,next)=>{
    const {title}= req.params
    const books= await BookModel.find({title})
    if(!books)
       {
           return res.status(404).json({ status: httpStatusText.FAIL, message: "NO BOOKs!" });
       }
       return res.status(200).json({ status: httpStatusText.SUCCESS, data:books });

})

const getReviews= errorHandling.asyncHandler(async(req,res,next)=>{
const {id}= req.params
const reviews= await BookModel.findById(id).select(reviews)
if(!reviews)
    {
        return res.status(404).json({ status: httpStatusText.FAIL, message: "NO REVIEWS!" });
    }
    return res.status(200).json({ status: httpStatusText.SUCCESS, data:reviews });

})

const addBook= errorHandling.asyncHandler(async(req,res,next)=>{
    const book= new BookModel(req.body)
    await book.save()
    return res.status(201).json({ status: httpStatusText.SUCCESS, data:book });
})
const addReview= errorHandling.asyncHandler(async(req,res,next)=>{
    const {review}= req.body
    const {id}= req.params
    const addedReview= BookModel.findByIdAndUpdate({id},{$set:{
        reviews:review
    }},
{new:true})
    if(!addedReview)
        {
            return res.status(400).json({ status: httpStatusText.FAIL, message: "CAN NOT ADD" });
        }
    return res.status(201).json({ status: httpStatusText.SUCCESS, data:addedReview });
})

const register= errorHandling.asyncHandler(async(req,res,next)=>{
    const{name,email,password}= req.body

    const user= await UserModel.create({
        name,
        email,
        password:HashAndCompare.hash(password)

    })
    if(!user)
        return res.status(400).json({status:httpStatusText.FAIL, message:"CAN NOT ADD USER"})
  
    return res.status(201).json({ status: httpStatusText.SUCCESS, data:user });

})

const login= errorHandling.asyncHandler(async(req,res,next)=>{
    const{email,password}= req.body

    const user= await UserModel.findOne({email})
    if(!user)
        return res.status(400).json({status:httpStatusText.FAIL, message:"CAN NOT FIND USER"})
  

    const isMatch= HashAndCompare.compare(password,user.password)
    if(!isMatch)
        return res.status(400).json({status:httpStatusText.FAIL, message:"CAN NOT LOGIN"})
const payload= {email:user.email,id: user._id}
console.log('====================================');
console.log(payload);
console.log('====================================');
const token= GenerateToken.generateToken({payload})

    return res.status(201).json({ status: httpStatusText.SUCCESS, token:token });

})

module.exports= {getAllBooks,getByISBN,getByAuthor,getByTitle,getReviews,addBook,addReview,register,login}