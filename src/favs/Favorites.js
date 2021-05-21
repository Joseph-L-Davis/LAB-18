import { Component } from 'react';
import FoodList from '../food/FoodList';
import { addFavorite, deleteFavorite, getMyFavorites } from '../utils/recipe-api';
import './Favorites.css';

export default class Favorites extends Component {
    state = {
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

    handleFavorited = async favorite => {
      try {
        if (favorite.deleted) {
          const { favorites } = this.state;
          const newFavorite = await addFavorite(favorite);
          const updatedFavorites = favorites.map(f => {
            return f.id === favorite.id ? newFavorite : f;
          });
          this.setState({ favorites: updatedFavorites });
        } else {
          await deleteFavorite(favorite.id);
          favorite.deleted = true;
        }
      }
      catch (err) {
        console.log(err.message);
      }
    }
  
    render() {
      const { favorites } = this.state;

      return (
        <div className="Favorites">
          <FoodList recipes={favorites} onFavorited={this.handleFavorited}/>
        
        </div>
      );
    }
}