import {useEffect, useState} from 'react'
import axios from 'axios';
import { useGetUserID } from '../hooks/useGetUserID';

export const SavedRecipe = () => {

  const userID = useGetUserID();
  const [savedRecipes, setSavedRecipes] = useState([]);

  useEffect(() => {
    


    const fetchSavedRecipe = async () =>{
      try {
        const response = await axios.get(`https://recipebackend-pc6s.onrender.com/recipes/savedRecipes/${userID}`);
        setSavedRecipes(response.data.savedRecipes)
        // console.log(response.data)
      } catch (error) {
        console.error(error);
      }
    };


    fetchSavedRecipe();
  }, [])


  return (
    <div>
      <h1>
        Saved Recipes
      </h1>

      <ul>
        {savedRecipes && savedRecipes.map((recipe) =>{
          return <li key={recipe._id}>
            <div>
              <h2>{recipe.name}</h2>
            </div>
            <div className='instructions'>
              <p>{recipe.instructions}</p>
            </div>
            <img src={recipe.imageUrl} alt={recipe.name} />
            <p>Cooking Time: {recipe.cookingTime} (minutes)</p>
          </li>
        })}
      </ul>
    </div>
  )
}

