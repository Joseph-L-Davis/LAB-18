import { Component } from 'react';
import RecipeList from '../food/RecipeList';
import RecipeSearch from '../food/RecipeSearch';
import { getRecipes, addFavorite, deleteFavorite, getMyFavorites } from '../utils/recipes-api';
import './FoodPage.css';

export default class FoodPage extends Component {
    state = {
      recipes: [],
      favorites: []
    }

    async componentDidMount() {
      try {
        const favorites = await getMyFavorites();
        this.setState({ favorites: favorites });
      }
      catch (err) {
        console.log(err.message);
      }
    }

    handleSearch = async search => {
      try {
        const { favorites } = this.state;

        const recipes = await getRecipes(search);

        const upgradedRecipes = recipes.map(recipe => {
          const found = favorites.find(favorite => favorite.recipeId === recipe.recipeId);
          return found ? found : recipe;
        });

        this.setState({ recipes: upgradedRecipes });
      }
      catch (err) {
        console.log(err.message);
      }
    }

    
  
    render() {
      return (
        <div className="FoodPage">
        
        </div>
      );
    }

}