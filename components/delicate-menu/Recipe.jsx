
import React from 'react';

class Recipe extends React.Component {
    render() {
      const props = this.props;

      return (
        <div className="recipe">
          <img src={props.image}/>
          <div className="desc">
            <h3 className="desc__title">{props.title}</h3>
            <div className="desc__action">
              <span className="like">{props.action.like}人点赞</span>
            <span className="storeup">{props.action.storeup}人收藏</span>
            </div>
          </div>
        </div>
      )
    }
}

export default Recipe;
