import React from 'react'

function Card2(props) {
    const { title,description,price,discountPercentage,rating,stock,brand,category,thumbnail,images,deleteproduct,id} = props;
  return (
    <>
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
              <li className="list-group-item bg-slate-200">{discountPercentage}</li>
            </ul>
          <button className="btn bg-black text-white my-2 mx-2 hover:bg-green-600 active:bg-green-600" onClick={()=>{deleteproduct(id)}}>Remove</button>
        </div>
      </div>
    </div>
    </>
  )
}

export default Card2