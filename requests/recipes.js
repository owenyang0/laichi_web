
import sp from 'superagent';

// const BASE_URL = 'http://budget.corporate.thoughtworks.com';
const BASE_URL = '/api';

var recipeApi = {
  fetchRecipesByType(type) {
    var recipes = [
      {
        image: 'http://lorempixel.com/240/160/food',
        title: '秋季抗燥汤饮',
        action: {
          like: 8878,
          storeup: 13
        }
      },
      {
        image: 'http://lorempixel.com/240/160',
        title: '红豆沙西多士',
        action: {
          like: 9999,
          storeup: 3111
        }
      },
      {
        image: 'http://lorempixel.com/240/160',
        title: '香菇鸡肉米线',
        action: {
          like: 9789,
          storeup: 4211
        }
      }
    ];

    return new Promise((resolve, reject) => {
      return resolve(recipes);
      // sp
      //   .get(`${BASE_URL}/recipes/${type}`)
      //   .end((err, res) => {
      //     if (err) {
      //       reject(err);
      //     }
      //
      //     resolve(res.body)
      //   });
    });
  }
}

export default recipeApi;
