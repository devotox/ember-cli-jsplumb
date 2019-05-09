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

export default Route.extend({
	actions: {
	}
});
```

```handlebars
{{jsplumb

}}
```

Contributing
------------------------------------------------------------------------------

See the [Contributing](CONTRIBUTING.md) guide for details.


License
------------------------------------------------------------------------------

This project is licensed under the [MIT License](LICENSE.md).
