
import React from 'react';
import {connectToStores, provideContext} from 'fluxible/addons';
import {handleHistory} from 'fluxible-router';
import debug from 'debug';

import ApplicationStore from './store/ApplicationStore';
import routeMap from '../../config/routeMap';


const bootDebug = debug('Laichi');
class Application extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
      var currentRoute = this.props.appStore.currentRoute;
      var label = currentRoute['label'] || currentRoute.get('label');
      var Handler = routeMap[label];
      bootDebug('Application render');
      bootDebug('current Route', currentRoute);

      return (
          <Handler />
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
            appStore: appStore.getState()
        };
    }
)));
