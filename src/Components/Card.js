// import { Button } from "bootstrap";
import React from "react";
import { useState } from "react";

function Card(props) {
  const {title,description,price,discountPercentage,rating,stock,brand,category,thumbnail,images} = props;
  const [Product, setProduct] = useState({Title:title,Description:description,Price:price,DiscountPercentage:discountPercentage,Rating:rating,Stock:stock,Brand:brand,Category:category,Thumbnail:thumbnail,Images:images});
    const addProduct= async(title,description,price,discountPercentage,rating,stock,brand,category,thumbnail,images)=>{
        //API call
        const response = await fetch("http://localhost:5000/api/cart/addCart", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            "auth-token": localStorage.getItem("token"),
          },
          body: JSON.stringify({title,description,price,discountPercentage,rating,stock,brand,category,thumbnail,images})
        });
        const Cart= await response.json();
        // console.log(Product);
        // console.log(Pdf);
      }
  const handleonclick=(e)=>{
    e.preventDefault();
    setProduct({Title:title,Description:description,Price:price,DiscountPercentage:discountPercentage,Rating:rating,Stock:stock,Brand:brand,Category:category,Thumbnail:thumbnail,Images:images});
    addProduct(Product.Title,Product.Description,Product.Price,Product.DiscountPercentage,Product.Rating,Product.Stock,Product.Brand,Product.Category,Product.Thumbnail,Product.Images);
  }
  return (
    <div className="container my-2 text-center flex
    justify-center">
      <div className="card bg-slate-200" style={{ width: "18rem" }}>
        <img src={thumbnail} className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title text-lg font-bold">{title}</h5>
          <ul className="list-group list-group-flush">
            <li className="list-group-item bg-slate-200">{description}</li>
            <li className="list-group-item bg-slate-200">{price}</li>
            <li className="list-group-item bg-slate-200">{rating}</li>
            <li className="list-group-item bg-slate-200">{stock}</li>
            <li className="list-group-item bg-slate-200">{brand}</li>
            <li className="list-group-item bg-slate-200">{category}</li>
            {/* <li className="list-group-item bg-slate-200">{thumbnail}</li> */}
            <li className="list-group-item bg-slate-200">{discountPercentage}</li>
          </ul>
          <button  className="btn bg-black text-white my-2 mx-2 hover:bg-green-600 active:bg-green-600" onClick={handleonclick}>Add To Cart</button>
        </div>
      </div>
    </div>
  );
}

export default Card;