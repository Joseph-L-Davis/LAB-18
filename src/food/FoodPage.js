import { Component } from 'react';
import FoodList from '../food/FoodList';
import FoodSearch from '../food/FoodSearch';
import { getRecipes, addFavorite, deleteFavorite, getMyFavorites } from '../utils/recipe-api.js';
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

    handleFavorited = async recipe => {
      try {
        const { recipes } = this.state;
        const favoriteId = recipe.id;

        if (favoriteId) {
          await deleteFavorite(favoriteId);

          const updatedRecipes = recipes.map(recipe => {
            return recipe.id === favoriteId
              ? {
                recipeId: recipe.recipeId,
                name: recipe.name,
                thumbnail_url: recipe.thumbnail_url,
                num_servings: recipe.num_servings
              }
              : recipe;
          });
          this.setState({ recipes: updatedRecipes });
        } else {
          const addedFavorite = await addFavorite(recipe);

          const updatedRecipes = recipes.map(r => {
            return r.recipeId === addedFavorite.recipeId
              ? addedFavorite
              : r;
          });
          this.setState({ recipes: updatedRecipes });
        }
      }
      catch (err) {
        console.log(err.message);
      }
    }
  
    render() {
      const { recipes } = this.state;

      return (
        <div className="FoodPage">
          <FoodSearch onSearch={this.handleSearch}/>
          <FoodList recipes={recipes} onFavorited={this.handleFavorited}/>
        </div>
      );
    }

}