
import React from 'react';
import {connectToStores, provideContext} from 'fluxible/addons';
import {handleHistory} from 'fluxible-router';

import Recipe from './Recipe.jsx';
import recipesApi from '../../requests/recipes';

class DelicateMenu extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
          recipes: []
        }
    }

    componentDidMount () {
      recipesApi.fetchRecipesByType()
        .then(function(recipes) {
          this.setState({
            recipes: recipes
          });
        }.bind(this));
    }

    render() {

      const recipes = this.state.recipes;

      var Recipes = recipes.map(function (recipe, idx) {
        return (
          <Recipe
              key={recipe.title + idx}
              image={recipe.image}
              title={recipe.title}
              action={recipe.action}
          />
        )
      })

      return (
        <section className="delicate-menu group">
          <div className="section-wrapper">
            <div className="section__main col span_3_of_4">
              <div className="section__main--head">
                <h1 className="title">精品菜谱</h1>
                <ul className="category">
                  <li className="category-unit">流行</li>
                  <li className="category-unit">川菜</li>
                  <li className="category-unit">湘菜</li>
                  <li className="category-unit">家常菜</li>
                  <li className="category-unit">私房菜</li>
                  <li className="category-unit">养生</li>
                </ul>
              </div>
              <div className="section__main--body">
                {Recipes}
                {Recipes}
              </div>
            </div>
            <aside className="section__side col span_1_of_4">
              <div className="section__aside--head">
                <h2 className="title">菜谱排行</h2>
                <ul className="category">
                  <li className="category-unit">周</li>
                  <li className="category-unit">月</li>
                </ul>
              </div>
              <div className="section__aside--body">
                <ol className="rank">
                  <li className="rank-unit"><a className="name">英式早餐(特别蘑菇版)</a><span className="icon--like">11803</span></li>
                  <li className="rank-unit"><a className="name">剁椒鱼头</a><span className="icon--like">11803</span></li>
                  <li className="rank-unit"><a className="name">传统东坡肉</a><span className="icon--like">11803</span></li>
                </ol>
              </div>
            </aside>
          </div>
        </section>
      );
    }
}

DelicateMenu.contextTypes = {
    getStore: React.PropTypes.func,
    executeAction: React.PropTypes.func
};

export default DelicateMenu;
