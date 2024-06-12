const httpStatusText = require('../utils/httpStatusText.js');
const errorHandling = require('../utils/errorHandling.js');
const BookModel= require('../DB models/book.js')
const UserModel= require('../DB models/user.js')
const HashAndCompare= require('../utils/HashAndCompare.js')
const GenerateToken= require("../utils/GenerateAndVerifyToken.js")


const addReview= errorHandling.asyncHandler(async(req,res,next)=>{

    const {review,}= req.body
    const  reviewerId= req.user
    const {id}= req.params //id of book
    const addedReview=await BookModel.findByIdAndUpdate(id,{$push:{
        reviews:[{
            reviewer:reviewerId,
            comment:review
        }]
    }},
{new:true}).select('_id title ISBN reviews')
    if(!addedReview)
        {
            return res.status(400).json({ status: httpStatusText.FAIL, message: "CAN NOT ADD" });
        }


        // const rev= await BookModel.find().populate('reviews.reviewer','name')
    return res.status(201).json({ status: httpStatusText.SUCCESS, data:addedReview });


})

const deleteReview = errorHandling.asyncHandler(async (req, res, next) => {
    const reviewerId = req.user;
    const reviewId = req.body.reviewId; // Assuming the reviewId is sent in the request body
    const { id } = req.params; // Id of the book

    const updatedBook = await BookModel.findOneAndUpdate(
        { _id: id, 'reviews._id': reviewId, 'reviews.reviewer': reviewerId },
        { $pull: { reviews: { _id: reviewId } } },
        { new: true }
    );

    return res.json(updatedBook);
});


module.exports= {addReview,deleteReview}
