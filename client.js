
import React from 'react';
import debug from 'debug';

import app from './app';

const bootstrapDebug = debug('Laichi:client');
const dehydratedState = window.context;

window.React = React;

debug.enable('*');

bootstrapDebug('rehydrating app');
app.rehydrate(dehydratedState, function (err, context) {
    if (err) {
        throw err;
    }

    window.context = context;
    const mountNode = document.querySelector('.app');

    bootstrapDebug(context)
    bootstrapDebug('React Rendering');

    React.render(context.createElement(), mountNode, () => {
        bootstrapDebug('React Rendered');
    });
});
