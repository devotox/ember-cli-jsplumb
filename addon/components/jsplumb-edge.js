import { jsPlumb } from 'jsplumb';

import { inject } from '@ember/service';

import Component from '@ember/component';

import { ChildMixin } from 'ember-composability-tools';

import layout from '../templates/components/jsplumb-edge';

export default Component.extend(ChildMixin, {
  layout,

  edge: {}, // eslint-disable-line

  nodes: [], // eslint-disable-line

  jsplumbUtils: inject(),

  didInsertElement() {
    this._super(...arguments);

    jsPlumb.ready(() => {
      this.initialize();
      this.bind();
    });
  },

  willDestroyElement() {
    this._super(...arguments);
    this.unbind();
  },

  initialize() {
    const edge = this.get('edge');

    const jsplumbUtils = this.get('jsplumbUtils');

    const source = jsplumbUtils.getElement(edge.source);
    const target = jsplumbUtils.getElement(edge.target);
    const overlays = jsplumbUtils.setupOverlays(edge);

    if(!source || !target) { return; }

    jsPlumb.connect({
      overlays,
      source: source.element.el,
      target: target.element.el
    });
  },

  bind() {

  },

  unbind() {

  }
});
