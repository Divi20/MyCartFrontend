import React, { useState, useEffect } from "react";
import "../styles.css";
import { API } from "../backend";
import Base from "./Base";
import Cards from "./Card";
import { getProducts } from "./helper/coreapicalls";
import { getCategories } from "../admin/helper/adminapicall";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All Products");
  const [searchItem, setSearchItem] = useState("");
  const [searchtext, setSearchText] = useState("");

  const loadAllProduct = () => {
    getProducts().then(data => {
      if (data.error) {
        setError(data.error);
      } else {
        setProducts(data);
      }
    });
  };

  const loadAllCategory = () => {
    getCategories().then(data => {
      if (data.error) {
        setError(data.error);
      } else {
        setCategories(data);
      }
    });
  };

  useEffect(() => {
    loadAllProduct();
  }, []);
  useEffect(() => {
    loadAllCategory();
  }, []);
  
  const SortProducts = (products,selectedCategory) =>{
    var sortedproducts = products;
    if(selectedCategory === "IncreasingPrice"){
     sortedproducts = products.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
    }
    else{

      if(selectedCategory === "IncreasingPrice"){
        sortedproducts = products.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
       }

    }
  }
  return (
    <Base title="Home Page" description="Welcome to the Tshirt Store">
   
      <div className="row text-center">
        <div className="col-3">
       <div className="container" style={{minHeight:"100vh", color:"black",margin:"0%"}}>
      <div className="card card text-white bg-dark border border-info">
      <div className="card-body">
      <div className="row" style={{textAlign:"center"}}>
      <input type="text" placeholder="search" onChange={event => setSearchText(event.target.value)} ></input>
      <button onClick={()=>{setSearchItem(searchtext)}}> Search</button>
      </div>
      </div>
      
    
      <div className="card-header">
      <h3>Categories</h3>
      </div>
      <div className="card-body">
      <ul>
      <li onClick={() =>setSelectedCategory("All Products")}>All products</li>
     
      {categories.map((category, index) => {
        return (
         
            <li key={index} onClick={() =>setSelectedCategory(category._id)}>{category.name}</li>
        );
       
      })}
      </ul>
      </div>
      <div className="card-header">
      <h3>Filter</h3>
      </div>
      <div className="card-body">
      <ul>
      <li onClick={()=>setSelectedCategory("Increasing Price")}>Increasing Price</li>
      <li onClick={()=>setSelectedCategory("Decreasing Price")}>Decreasing Price</li>
      </ul>
      </div>
      </div>
       
       </div>
        
        </div>
        <div className="col-9">

        <div className="row">
        {products.map((product, index) => {

          {if(selectedCategory === "All Products"){
            console.log(product.category)
            return (
              <div key={index} className="col-4">
                <Cards product={product} />
              </div>
            );
           
          }
       }
         
        })}


        {products.map((product, index) => {

          {if(product.category._id === selectedCategory){
            console.log(product.category)
            return (
              <div key={index} className="col-4">
                <Cards product={product} />
              </div>
            );
           
          }
       }
         
        })}

        
       
            {products.map((product, index) => {
              if(searchtext){
              {if((product.name).toLowerCase() === (searchtext).toLowerCase() || (product.name).toLowerCase() == (searchItem).toLowerCase()){
                return (
                  <div key={index} className="col-4">
                    <Cards product={product} />
                  </div>
                );
               
              }
           
 } }})}



          
        
      </div>
        </div>
       
      </div>
    </Base>
  );
}
