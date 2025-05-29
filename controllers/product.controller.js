const ProductService = require("../services/product.service");
exports.insertProductToDatabase = async (req,res)=>{
  try {
    const{userId,userEmail,items,totalPrice}=req.body;
    await ProductService.insertProductInfo(userId,userEmail,items,totalPrice);
    res.setHeader('Content-Type', 'application/json');
    res.json({status:true,success:"Purchase sucessful"});
  } catch (error) {
    throw error;
  }
}

exports.getOrderStatusFromDatabase = async(req, res)=>{
  try {
    const userId = req.query.userId;
    const purchase = await ProductService.getOrderStatus(userId);
    // if(!purchase||purchase.items.length === 0){
    //   return res.status(200).json({status:false,items:[]});
    // }
    res.status(200).json(purchase);
  } catch (error) {
    res.status(500).json({ status: false, message: 'Server error' });
  }
}

exports.FetchAllItemsMostOfTrinding = async (req,res)=>{
    try {
        const result = await ProductService.showAllItemsMostOfTrindingInApp();
        res.json(result);
    } catch (err) {
        console.error(err);
    res.status(500).send('DB Error');
    }
}