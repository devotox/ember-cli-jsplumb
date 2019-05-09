'use strict';

const { name } = require('./package');

module.exports = {
  name,
  included: function(app) {
    this._super.included(app);
    app.import('node_modules/jsplumb/css/jsplumbtoolkit-defaults.css');
  }
};
