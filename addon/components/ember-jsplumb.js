import { jsPlumb } from 'jsplumb';

import { set } from '@ember/object';

import { inject } from '@ember/service';

import Component from '@ember/component';

import { next, once } from '@ember/runloop';

import { ParentMixin } from 'ember-composability-tools';

import layout from '../templates/components/ember-jsplumb';

import { addObserver, removeObserver } from '@ember/object/observers';

export default Component.extend(ParentMixin, {
  layout,

  classNames: 'ember-jsplumb',

  definition: {}, // eslint-disable-line

  jsplumbUtils: inject(),

  init() {
    this._super(...arguments);

    const definition = this.get('definition');

    const jsplumbUtils = this.get('jsplumbUtils');

    const newDefinition = jsplumbUtils.setupDefinition(definition);

    this.set('definition', newDefinition);
  },

  didInsertElement() {
    this._super(...arguments);

    next(() => this.bind());
  },

  willDestroyElement() {
    this._super(...arguments);
    this.unbind();
  },

  repaint() {
    jsPlumb.repaintEverything();
  },

  rerender() {
    const jsplumbUtils = this.get('jsplumbUtils');
    jsplumbUtils.rerender();
  },

  bind() {
    const jsplumbUtils = this.get('jsplumbUtils');

    addObserver(jsplumbUtils, 'editable', this.rerender.bind(this));
    addObserver(jsplumbUtils, 'draggable', this.rerender.bind(this));
  },

  unbind() {
    const jsplumbUtils = this.get('jsplumbUtils');

    removeObserver(jsplumbUtils, 'editable', this.rerender.bind(this));
    removeObserver(jsplumbUtils, 'draggable', this.rerender.bind(this));
  }
});
