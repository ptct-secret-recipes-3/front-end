import React, { useState, useEffect } from "react";
import { axiosWithAuth } from "./axiosWithAuth";
import { Link } from "react-router-dom";

const HomePage = () => {
 
  const [recipe, setRecipe] = useState([]);

  useEffect(() => {
    const getRecipes = () => {
      axiosWithAuth()
        .get("api/recipes")
        .then((res) => {
          setRecipe(res.data);
        })
        .catch((err) => {
          console.error({err});
        });
    };
    getRecipes();
  }, []);



  return (
    <section>
      <div>
        {recipe.map((res) => (
            <Link to={`/recipe/${res.id}`} key={res.id}>            
              <section className="recipeCard">
                <h2>{res.title}</h2>
                <div>
                  <p>Source: </p> {res.source}
                </div>
                <div>
                  <p>Ingredients: </p> {res.ingredients}
                </div>
                <div>
                  <p>Instructions: </p> {res.instructions}
                </div>
                <div>
                  <p>Category: </p> {res.category}
                </div>
              </section>     
            </Link>
        ))}
      </div>

      <div>         
          <Link to="/RecipeForm">
            <button> Create New Recipe </button>
          </Link>
      </div>
      
      
    </section>
  );
};

export default HomePage;

