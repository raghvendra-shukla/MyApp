import React, { useEffect, useState } from "react";
import Card from "./Card";
// import Spinner from "./Spinner";
import Login from "./Login";

function Home(props) {
  {
    document.body.style.backgroundColor = "#b7acac";
  }
  const [Data, setData] = useState([]);
//   const [loading, setloading] = useState(false);
  const [search, setsearch] = useState("");
  const Productdata = async () => {
    // https://dummyjson.com/products
    let url = `https://dummyjson.com/products`;
    // setloading(true);
    let data = await fetch(url);
    let parsedData = await data.json();
    setData(parsedData.products);
    // console.log(Data);
    // setloading(false);
  };
  useEffect(() => {
    Productdata();
  }, []);

  const handleonchange=(e)=>{
    localStorage.setItem("search",e.target.value);
    setsearch("");
  }
  
  const handleonckick=(e)=>{
    e.preventDefault();
    const val=localStorage.getItem("search");
    setsearch(val);
  }
  // title,description,price,discountPercentage,rating,stock,brand,category,thumbnail,images

  return (
    <>
    {!localStorage.getItem("token")?<Login showAlert={props.showAlert}/>:
    <div className="container">
      <form className="container flex my-2" role="search">
          <input
            className="form-control me-2 bg-slate-100"
            type="search"
            placeholder="Search"
            aria-label="Search"
            onChange={handleonchange}
            name="search"
          />
            <button className="btn bg-black text-white" type="submit" onClick={handleonckick}>
              Search
            </button>
        </form>
      <div className="flex justify-center">
        <div className="text-center justify-center">
          {/* {loading && <Spinner />} */}
        </div>
        <div className="row text-center my-2">
          {Data.filter((element)=>{
            if(search===""){
              return element;
            }
            else if(JSON.stringify(element).toLowerCase().includes(search.toLowerCase())){
              return element;
            }
          }).map((element) => (
            <div className="col" key={element.id}>
              <Card
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
              />
            </div>
          ))}
        </div>
      </div>
      </div>}
    </>
  );
}

export default Home;