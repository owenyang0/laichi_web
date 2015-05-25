
import React from 'react';
import Fluxible from 'fluxible';
import Application from './components/application';
import ApplicationStore from './components/application/store/ApplicationStore';





import {RouteStore} from 'fluxible-router';
import routes from './config/routes';

var RS = RouteStore.withStaticRoutes(routes);

let app = new Fluxible({
    component: Application,
    stores: [
        ApplicationStore,
        RS
    ]
});

// app.registerStore(ApplicationStore);
export default app;
