'use strict';

const EmberAddon = require('ember-cli/lib/broccoli/ember-addon');

module.exports = function(defaults) {
  let app = new EmberAddon(defaults, {
    // Add options here
    sassOptions: {
      includePaths: [
        'app/styles',
        'addon/styles'
      ]
    },

    ace: {
      themes: ['chrome', 'tomorrow', 'kuroir', 'gruvbox', 'idle_fingers', 'monokai'],
      modes: ['css', 'handlebars', 'html', 'javascript', 'json', 'kotlin',  'mysql',
        'plain_text', 'pgsql', 'ruby', 'scss', 'sql', 'sqlserver', 'xml', 'yaml'],
      workers: ['css', 'handlebars', 'html', 'javascript', 'json', 'kotlin',  'mysql',
        'plain_text', 'pgsql', 'ruby', 'scss', 'sql', 'sqlserver', 'xml', 'yaml'],
      exts: ['beautify', 'emmet', 'spellcheck', 'settings_menu', 'whitespace',
        'modelist', 'searchbox', 'themelist', 'language_tools', 'linking',
        'elastic_tabstops_lite', 'error_marker', 'keybinding_menu']
    }
  });

  /*
    This build file specifies the options for the dummy test app of this
    addon, located in `/tests/dummy`
    This build file does *not* influence how the addon or the app using it
    behave. You most likely want to be modifying `./index.js` or app's build file
  */

  return app.toTree();
};
