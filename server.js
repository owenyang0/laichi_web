require('node-jsx').install({ extension: '.jsx' });

import koa from 'koa';
import jade from 'koa-jade';
import compress from 'koa-compress';
import React from 'react';
import serve from 'koa-static';
import bodyparser from 'koa-bodyparser';
import debug from 'debug';
import serialize from 'serialize-javascript';
import {navigateAction} from 'fluxible-router';

import Application from './app';
import ApplicationStore from './components/application/store/ApplicationStore';


const bootDebug = debug('laichi:server');
var app = koa();

app.name = "laichi";
require('koa-qs')(app);

if (process.env.NODE_ENV === 'development') {
  app.use(require('koa-livereload')());
}

app.use(compress());

function preRender (ctx) {
  return new Promise(function(resolve, reject) {
    bootDebug('Pre Rendering')
    var context = Application.createContext();

    context.getActionContext().executeAction(navigateAction, {
      url: ctx.request.url
    }, function(err) {
      if (err) {
        bootDebug(err);

        return reject(err);
      }

      bootDebug('Exposing context state');
      var exposed = serialize(Application.dehydrate(context));

      bootDebug('Rendering Application component into html');
      var html = React.renderToStaticMarkup(context.createElement());

      var pageTitle = context
        .getComponentContext()
        .getStore(ApplicationStore)
        .getPageTitle();

      bootDebug('Sending markup');
      resolve({
        app: html,
        title: pageTitle,
        context: exposed
      });
    });
  });
}

app.use(bodyparser());

app.use(serve('./public'));
app.use(jade.middleware({
  viewPath: __dirname + '/components/application/views',
  debug: true,
  pretty: true,
  compileDebug: true
}));

app.use(function* (next) {
  try {
    var result = yield preRender(this, next);
    this.render('index', result, false);
  }
  catch(e) {
    console.error(e);
  }
});


var server = app.listen(3000, function() {
  console.log('server started');
});
