
import React from 'react';
import {connectToStores, provideContext} from 'fluxible/addons';
import {handleHistory} from 'fluxible-router';

import Tile from './Tile.jsx';
import recipesApi from '../../requests/recipes';

var tiles = {
  hot: [
    {
      name: '回锅肉',
      desc: '拈花惹草'
    },
    {
      name: '醋溜白菜',
      desc: '拈花惹草'
    },
    {
      name: '干锅花菜',
      desc: '拈花惹草'
    },
    {
      name: '青椒鸡蛋饼',
      desc: '拈花惹草'
    },
    {
      name: '韭菜汁蛋卷',
      desc: '拈花惹草'
    },
    {
      name: '鲫鱼汤',
      desc: '拈花惹草'
    }
  ],
  rank: [
    {
      name: '莴笋炒腊肉',
      desc: '详细信息'
    },
    {
      name: '韭菜汁蛋卷',
      desc: '拈花惹草'
    }
  ]
}

class Hottag extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    randomColor() {
      var color = Math.round(Math.random() * 0xffffff);
      return '#' + color.toString(16);
    }

    render() {
      var hotTiles = tiles.hot.map((tile, idx) => {
        return (
          <Tile
              style={{backgroundColor: this.randomColor()}}
              key={tile.name + idx}
              name={tile.name}
              desc={tile.desc}
          />
        );
      });

      var rankTiles = tiles.rank.map((tile, idx) => {
        return (
          <Tile
              style={{backgroundColor: this.randomColor()}}
              key={tile.name + idx}
              name={tile.name}
              desc={tile.desc}
          />
        );
      });

      return (
        <section className="hot-tag">
          <div className="section-wrapper">
            <div className="section__main">
              <div className="section__main--head">
                <h1 className="title">热门标签</h1>
                <p className="title-desc">看看大家都关心什么菜~</p>
              </div>
              <div className="section__main--body">
                {hotTiles}
              </div>
            </div>
            <aside className="section__side">
              <div className="section__aside--head">
                <h2 className="title">菜谱排行</h2>
              </div>
              <div className="section__aside--body">
                {rankTiles}
              </div>
            </aside>
          </div>
        </section>
      );
    }
}

export default Hottag;
