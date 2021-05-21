import { Component } from 'react';
import FoodItem from './FoodItem';
import './FoodList.css';

export default class FoodList extends Component {
  
  render() {
    const { recipes, onFavorited } = this.props;

    return (
      <ul className="FoodList">
        {recipes.map(recipe => (
          <FoodItem key={recipe.id} recipe={recipe} onFavorited={onFavorited}/>
        ))}
      </ul>
    );
  }

}