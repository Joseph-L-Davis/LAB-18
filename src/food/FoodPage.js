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
  
    render() {
      const { recipes } = this.state;

      return (
        <div className="FoodPage">
          {/* <FoodSearch onSearch={this.handleSearch}/> */}
          <FoodList recipes={recipes}/>
        </div>
      );
    }

}