'use strict';

const { name } = require('./package');

module.exports = {
  name,

  options: {
    sassOptions: {
      includePaths: [
        'app/styles',
        'addon/styles'
      ]
    }
  },

  included: function(app) {
    this._super.included(app);
    app.import('node_modules/jsplumb/css/jsplumbtoolkit-defaults.css');
  }
};
