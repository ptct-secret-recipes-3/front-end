import React, { useState, useEffect } from "react";
import { axiosWithAuth } from "./axiosWithAuth";

const HomePage = () => {
 
  const [recipe, setRecipe] = useState([]);

  useEffect(() => {
    const getRecipes = () => {
      axiosWithAuth()
        .get("#")
        .then((res) => {
          setRecipe(res.data);
        })
        .catch((err) => {
          console.error({err});
        });
    };
    getDatData();
  }, []);



  return (
    <div>
      
      <h1>Our Recipes</h1>

    </div>
  );
};

export default HomePage;

