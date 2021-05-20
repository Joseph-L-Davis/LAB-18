import { Component } from 'react';
import FoodItem from './FoodItem';
import './FoodList.css';

export default class FoodList extends Component {
  
  render() {
    return (
      <div className="FoodList">
        <FoodItem/>
      </div>
    );
  }

}