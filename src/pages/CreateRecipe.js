import React, { useState } from 'react'
import axios from 'axios';
import { useGetUserID } from '../hooks/useGetUserID';
import {useNavigate} from 'react-router-dom'
import {useCookies} from 'react-cookie'

export const CreateRecipe = () => {
  const userID = useGetUserID();
  const navigate = useNavigate();

  const [cookies, _] = useCookies(["access_token"]);


  const [recipe, setRecipe] = useState({
    name: "",
    ingredients: [],
    instructions: "",
    imageUrl: "",
    cookingTime: 0,
    userOwner: userID,
  });



  const handleChange = (e) =>{
    const {name, value} = e.target;
    setRecipe({...recipe, [name]: value});
  }

  const handleIngredientChange = (e, idx) =>{
    const {value} = e.target;
    const ingredients = recipe.ingredients;
    ingredients[idx] = value;
    setRecipe({...recipe, ingredients});
    // console.log(recipe); 
  }

  const addIngredient = () => {
    setRecipe({...recipe, ingredients: [...recipe.ingredients, ""]});
  }

  const onSubmit = async (e) =>{
    e.preventDefault();

    try {
      await axios.post("https://recipebackend-pc6s.onrender.com/recipes", recipe,
      {headers: {authorization: cookies.access_token},
    });
      alert("Recipe Created");
      navigate("/")
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className='create-recipe'>
      <h2>Create Recipe</h2>
      <form onSubmit={onSubmit}>
        <label htmlFor="name">Name</label>
        <input type="text" name="name" id="name" onChange={handleChange}/>

        <label htmlFor="ingredients">Ingredients</label>
        {recipe.ingredients.map((ingredient, idx) => {
          return <input key={idx} type="text" name="ingredients" value={ingredient} id="ingredients" 
          onChange={(e) => handleIngredientChange(e, idx)}/>
        })}

        <button onClick={addIngredient} type="button" >Add ingredients</button>

        <label htmlFor="instructions">Instructions</label>
        <textarea name="instructions" id="instructions" cols="10" rows="4" onChange={handleChange}></textarea>
        <label htmlFor="imageUrl">ImageUrl</label>
        <input type="text" id="imageUrl" name="imageUrl" onChange={handleChange}/>
        <label htmlFor="cookingTime">Cooking Tine (minutes) </label>
        <input type="number" name="cookingTime" id="cookingTime" onChange={handleChange}/>
        <br />
        <button type="submit" >Create Recipe</button>
      </form>
    </div>
  );
};
