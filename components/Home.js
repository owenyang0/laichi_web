
import React from 'react';
import DelicateMenu from './delicate-menu';
import Hottag from './hottag';

class Home extends React.Component {
    render() {
        return (
          <div className="app-home">
            <h1> Home Page</h1>
            <DelicateMenu />
            <Hottag />
            <DelicateMenu />
            <h1>Footer</h1>
          </div>
        )
    }
}

export default Home;
