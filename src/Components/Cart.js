import React from "react";
import { useEffect, useRef } from "react";
import { useState } from "react";
import Card2 from "./Card2";
import { useNavigate } from "react-router-dom";
import Login from "./Login";

// new name for this is Favourite
function Cart(props) {
  {
    document.body.style.backgroundColor = "#b7acac";
  }
  let [Cnt, setCnt] = useState(0);
  const [products, setproducts] = useState([]);
  const { showAlert } = props;
  const getproducts = async () => {
    //API call
    const response = await fetch("http://localhost:5000/api/cart/fetchCart", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    const json = await response.json();
    // console.log(json.length);
    setCnt(json.length);
    setproducts(json);
  };
  useEffect(() => {
    getproducts();
  }, []);

  //Delete a product
  const deleteproduct = async (id) => {
    //Deleting a product
    const response = await fetch(
      `http://localhost:5000/api/cart/deleteCart/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
        body: JSON.stringify(),
      }
    );
    const json = response.json();
    const newproduct = products.filter((products) => {
      return products._id !== id;
    });
    setproducts(newproduct);
    setCnt(newproduct.length);
  };
  return (
    <>
    {!localStorage.getItem("token")?<Login showAlert={props.showAlert}/>:
    <div>
      <div className="row text-center my-2">
        <h2 className="text-center my-2 text-2xl font-semibold">
          Your Favourite products
        </h2>
        <h5>Total elements {Cnt}</h5>
        {products.map((element) => {
          return (
            <div className="col" key={element._id}>
              <Card2
                title={element.title}
                description={element.description}
                price={element.price}
                discountPercentage={element.discountPercentage}
                rating={element.rating}
                stock={element.stock}
                brand={element.brand}
                category={element.category}
                thumbnail={element.thumbnail}
                images={element.images}
                id={element._id}
                showAlert={showAlert}
                deleteproduct={deleteproduct}
              />
            </div>
          );
        })}
      </div>
      </div>}
    </>
  );
}

export default Cart;
