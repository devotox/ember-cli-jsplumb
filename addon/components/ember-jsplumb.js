import { jsPlumb } from 'jsplumb';

import { next } from '@ember/runloop';

import { inject } from '@ember/service';

import Component from '@ember/component';

import { ParentMixin } from 'ember-composability-tools';

import layout from '../templates/components/ember-jsplumb';

import { addObserver, removeObserver } from '@ember/object/observers';

export default Component.extend(ParentMixin, {
  layout,

  classNames: 'ember-jsplumb layout-column flex',

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
    jsPlumb.reset();

    this.unbind();

    this.childComponents
      .forEach((child) => child.unbind());
  },

  repaint() {
    jsPlumb.repaintEverything();
  },

  rerender() {
    const jsplumbUtils = this.get('jsplumbUtils');
    jsplumbUtils.rerender();

    this.childComponents
      .forEach((child) => child.unbind().bind());
  },

  bind() {
    this.rerender = this.rerender.bind(this);
    const jsplumbUtils = this.get('jsplumbUtils');

    addObserver(jsplumbUtils, 'editable', this.rerender);
    addObserver(jsplumbUtils, 'draggable', this.rerender);
  },

  unbind() {
    const jsplumbUtils = this.get('jsplumbUtils');

    removeObserver(jsplumbUtils, 'editable', this.rerender);
    removeObserver(jsplumbUtils, 'draggable', this.rerender);
  }
});
