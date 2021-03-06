'use strict';
var mergeTrees = require( 'broccoli-merge-trees' );
var Funnel = require('broccoli-funnel');


module.exports = {
  name: 'ember-semantic-ui',
  included: function(app){
    if (typeof app.import !== 'function' && app.app) {
      app = app.app;
    }
    this._super.included(app);
    app.import({
        development : 'node_modules/moment/min/moment-with-locales.js',
        production  : 'node_modules/moment/min/moment-with-locales.min.js'
    });
    app.import('node_modules/pikaday/pikaday.js');
    app.import('node_modules/pikaday/css/pikaday.css');
    app.import('vendor/shims/moment.js');
    app.import('vendor/shims/pikaday.js');

  },
  postprocessTree: function( type, tree ) {
    return mergeTrees([ tree,
          new Funnel( 'bower_components/semantic/dist', {
              srcDir  : 'themes',
              include   : ['**/*'],
              destDir : '/assets/themes'
          }),
          new Funnel('bower_components/semantic/dist', {
              srcDir  : '.',
              include   : ['*.min.*'],
              destDir : '/assets/'
          })
        ],
        {
          overwrite: true
        });
  }
};