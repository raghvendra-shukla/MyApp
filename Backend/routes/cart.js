const express=require("express");
const router = express.Router();
const Cart=require('../models/Cart');
const { body, validationResult } = require('express-validator');
const middleware = require("../middelware/middleware");

// Route1: fetching using get request
router.get('/fetchCart',middleware, async(req, res) => {
  try {
    const cart=await Cart.find({user:req._id});
    res.json(cart);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error occured");
  }
});
// Route2: adding to cart using post 
router.post("/addCart",[
  body("id"),
  body("title"),
  body("description"),
  body("price"),
  body("discountPercentage"),
  body("rating"),
  body("stock"),
  body("brand"),
  body("category"),
  body("thumbnail"),
  body("images"),
],middleware,async(req,res)=>{
  const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
  try{
    const {id,title,description,price,discountPercentage,rating,stock,brand,category,thumbnail,images}=req.body;
    const cart=new Cart({
      id,title,description,price,discountPercentage,rating,stock,brand,category,thumbnail,images
    });
    const saveData=await cart.save();
    res.json(saveData);
  }catch(error){
    console.error(error.message);
    res.status(500).send("Some error occured");
  }
});

// Route:3 delete Cart the using delete request
router.delete("/deleteCart/:id",middleware,async (req,res)=>{
    //find the cart to be delete and delete it
    try{
      let cart=await Cart.findById(req.params.id);
      if(!cart){return res.status(404).send("Not Found")};
      if(cart._id.toString()!==req.params.id){
        return res.send("Not Allowed");
      }
      cart=await Cart.findByIdAndDelete(req.params.id);
      res.json("Success:The cart has been deleted");
    }
    catch(error){
      console.error(error.message);
      res.status(500).send("Internal server error");
    }
  });


module.exports=router