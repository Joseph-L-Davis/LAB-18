import { Component } from 'react';
import './FoodItem.css';

export default class FoodItem extends Component {
  
  render() {
    const { recipe } = this.props.recipe;

    return (
      <li className="FoodItem">
        
        <h2>{recipe.name}</h2>
        <img src={recipe.thumbnail_url} alt='Food'/>
        <p className='num-servings'>Number of servings: {recipe.num_servings}</p>

      </li>
    );
  }

}