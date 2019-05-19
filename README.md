[![Ember Observer Score](http://emberobserver.com/badges/ember-cli-jsplumb.svg)](http://emberobserver.com/addons/ember-cli-jsplumb)
[![Build Status](https://travis-ci.org/devotox/ember-cli-jsplumb.svg)](http://travis-ci.org/devotox/ember-cli-jsplumb)
[![Coverage Status](https://codecov.io/gh/devotox/ember-cli-jsplumb/branch/master/graph/badge.svg)](https://codecov.io/gh/devotox/ember-cli-jsplumb)
[![NPM Version](https://badge.fury.io/js/ember-cli-jsplumb.svg)](http://badge.fury.io/js/ember-cli-jsplumb)
[![NPM Downloads](https://img.shields.io/npm/dm/ember-cli-jsplumb.svg)](https://www.npmjs.org/package/ember-cli-jsplumb)
[![Dependency Status](https://david-dm.org/devotox/ember-cli-jsplumb.svg)](https://david-dm.org/devotox/ember-cli-jsplumb)
[![DevDependency Status](https://david-dm.org/devotox/ember-cli-jsplumb/dev-status.svg)](https://david-dm.org/devotox/ember-cli-jsplumb#info=devDependencies)
[![Greenkeeper](https://badges.greenkeeper.io/devotox/ember-cli-jsplumb.svg)](https://greenkeeper.io/)

ember-cli-jsplumb
==============================================================================

Simple Wrapper around [JS PLUMB](https://github.com/jsplumb/jsplumb).

This provides a component that can be used to initialize jsplumb and create workflow diagrams

[DEMO](http://devotox.github.io/ember-cli-jsplumb)

Installation
------------------------------------------------------------------------------

```
ember install ember-cli-jsplumb
```

Usage
------------------------------------------------------------------------------

```javascript
import Route from '@ember/routing/route';

import { computed } from '@ember/object';

export default Route.extend({
  definitionString: computed('controller.definition.{nodes,edges}', function(){
    const definition = this.get('controller').get('definition');

    return JSON.stringify(definition, null, 4);
  }),

  setupController() {

    this.get('controller').set('definition', transform(definition));

    this.get('controller').set('definitionString', this.get('definitionString'));

    setInterval(() => {
      this.notifyPropertyChange('definitionString');
      this.get('controller').set('definitionString', this.get('definitionString'));
    }, 500);
  },

  actions: {
    onEditNode(node) {
      window.alert(`Editing Node: ${node.id}`);
    },
    onRemoveNode(node) {
      window.alert(`Removing Node: ${node.id}`);
    },
    onResizxeNode(node) {
      // window.alert(`Resizing Node: ${node.id}`);
    }
  }
});
```

```handlebars
<h2 id="title">Ember CLI JS Plumb</h2>

{{ember-jsplumb
  definition=definition
  onEditNode=(action (route-action "onEditNode"))
  onRemoveNode=(action (route-action "onRemoveNode"))
  onResizeNode=(action (route-action "onResizeNode"))
}}

{{ember-ace
  lines=35
  readOnly=true
  mode="ace/mode/json"
  theme="ace/theme/chrome"
  value=definitionString
}}
```

Contributing
------------------------------------------------------------------------------

See the [Contributing](CONTRIBUTING.md) guide for details.


License
------------------------------------------------------------------------------

This project is licensed under the [MIT License](LICENSE.md).
