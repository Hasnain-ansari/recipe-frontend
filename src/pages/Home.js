import {useEffect, useState} from 'react'
import axios from 'axios';
import { useGetUserID } from '../hooks/useGetUserID';
import {useCookies} from 'react-cookie'

export const Home = () => {

  const userID = useGetUserID();
  const [recipes, setRecipes] = useState([]);
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [cookies, _] = useCookies(["access_token"]);





  useEffect(() => {
    const fetchRecipe = async () =>{
      try {
        const response = await axios.get("https://recipebackend-pc6s.onrender.com/recipes");
        setRecipes(response.data)
      } catch (error) {
        console.error(error);
      }
    };


    const fetchSavedRecipe = async () =>{
      try {
        const response = await axios.get(`https://recipebackend-pc6s.onrender.com/recipes/savedRecipes/ids/${userID}`);
        setSavedRecipes(response.data.savedRecipes)
        // console.log(response.data)
      } catch (error) {
        console.error(error);
      }
    };


    fetchRecipe();

    if(cookies.access_token) fetchSavedRecipe();
   
  }, [])

  const SavedRecipe = async (recipeID) =>{
    try {
      const response = await axios.put("https://recipebackend-pc6s.onrender.com/recipes",
        {recipeID, userID},
        {headers: {authorization: cookies.access_token}}
       );
      setSavedRecipes(response.data.savedRecipes)
      
    } catch (error) {
      console.error(error);
    }
  }


  const isRecipeSaved = (id) => savedRecipes && savedRecipes.includes(id);
  
  return (
    <div >
      <h1 >
        Recipes
      </h1>

      <ul className='home1'>
        {recipes.map((recipe) =>{
          return <li key={recipe._id}>
            <div>
              <h2>{recipe.name}</h2>
              <button onClick={() => SavedRecipe(recipe._id)} disabled={isRecipeSaved(recipe._id)}>
                {isRecipeSaved(recipe._id) ? "saved" : "save"}
                </button>
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
