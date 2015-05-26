
import React from 'react';
import {connectToStores, provideContext} from 'fluxible/addons';
import {handleHistory} from 'fluxible-router';

import ApplicationStore from './store/ApplicationStore';
var Home = require('../Home');
var About = require('../About');


class Application extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
      console.log(Home);
      var Handler = this.props.context.getStore(ApplicationStore).currentRoute.get('handler');

      return (
          <div id="app">
            <Handler />
          </div>
      );
    }
}

Application.contextTypes = {
    getStore: React.PropTypes.func,
    executeAction: React.PropTypes.func
};

export default handleHistory(provideContext(connectToStores(
    Application,
    [ApplicationStore],
    function (stores, props) {
        var appStore = stores.ApplicationStore;
        return {
            currentPageName: appStore.getCurrentPageName(),
            pageTitle: appStore.getPageTitle(),
            pages: appStore.getPages()
        };
    }
)));
