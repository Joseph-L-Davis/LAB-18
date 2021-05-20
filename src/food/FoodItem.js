import { Link } from 'react-router-dom';
import { Component } from 'react';
import './FoodItem.css';

const RED_HEART = '❤️';
const WHITE_HEART = '♡';

export default class FoodItem extends Component {
  state = 
    {
      isFavorite: false
    }
  
    handleFavoriteClick = e => {
      const { onFavorited, recipe } = this.props;
      e.preventDefault();
      onFavorited(recipe);
      this.setState({ isFavorite: true });
    }

    render() {
      const { isFavorite } = this.state;
      const { recipe } = this.props;

      return (
        <li className="FoodItem">
          <Link to={`/recipes/${recipe.id}`}>
            <h2>{recipe.name}</h2>
            <img src={recipe.thumbnail_url} alt='Food'/>
            <p className='num-servings'>Number of servings: {recipe.num_servings}</p>
            <button className="favorite" onClick={this.handleFavoriteClick}>
              {isFavorite ? RED_HEART : WHITE_HEART}
            </button>
          </Link>
        </li>
      );
    }

}