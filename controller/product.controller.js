const Category = require("../schema/category.schema");
const Products = require("../schema/product.schema");
const commentSchema=require("../schema/comment.schema")

// get all category
const getCategory = async (req, res) => {
  try {
    const getAllCategory = await Category.find();

    res.status(200).json({
      success: true,
      categories: getAllCategory,
    });
  } catch (error) {
    res.status(500).json({
      success: true,
      msg: error.message,
    });
  }
};

// get all products
const getProducts = async (req, res) => {
  try {
    const data = [
      {
        $lookup: {
          from: "Categories",
          localField: "category",
          foreignField: "_id",
          as: "categoryInfo",
        },
      },
      {
        $unwind: "categoryInfo",
      },
    ];
    const getData = Products.aggregate(data);
    res.status(200).json({
      success: true,
      data: getData,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      msg: error.message,
    });
  }
};


// single product
const SingleProduct=async(req,res)=>{
    const product_id=req.body;
try {
const product=await Products.findById(product_id).populate("category");
if(!product){
    return res.status(404).json({
        success:false,
        msg:"product not found"
    })
}
res.status(201).json({
    success:true,
    data:product
})
} catch (error) {
    res.status(500).json({
      success: false,
      msg: error.message,
    });
}
}

//comments
const addCommentsRating=async(req,res)=>{
  try {
    const{text,rating,productId}=req.body;
    const userId=req.user_details;

await commentSchema.findOneAndUpdate( 
  { userId, productId }, 
  { text, rating, createdAt: new Date() }, 
  { new: true, upsert: true } 
)

res.status(201).json({
  success:true,
  msg:"actions updated successfully"
})
  } catch (error) {
    res.status(500).json({
      success:true,
      msg:error.status
    })
  }
}

// get comments
const getCommentsAvRating=async (req, res) => {
  const { productId } = req.params;

  try {
    const comments = await Comment.find({ productId })
      .populate("userId", "name") 
      .sort({ createdAt: -1 });

    const ratings = comments.map(c => c.rating).filter(r => typeof r === "number");

    const averageRating =
      ratings.length > 0 ? (ratings.reduce((a, b) => a + b, 0) / ratings.length).toFixed(1) : 0;

    res.status(200).json({
      success: true,
      averageRating,
      totalReviews: ratings.length,
      comments
    });
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
};




module.exports = { getCategory, getProducts,SingleProduct,addCommentsRating,getCommentsAvRating };
