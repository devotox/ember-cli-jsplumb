import { jsPlumb } from 'jsplumb';

import { next } from '@ember/runloop';

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
    jsPlumb.ready(() => next(this, this.initialize));
  },

  initialize() {
    const edge = this.get('edge');
    const jsplumbUtils = this.get('jsplumbUtils');

    const source = jsplumbUtils.getElement(edge.source);
    const target = jsplumbUtils.getElement(edge.target);

    const parent = this.parentComponent;
    const onEdit = parent && parent.parentComponent.onEditEdge;
    const overlays = jsplumbUtils.setupOverlays(edge, onEdit, { source, target});

    if(!source || !target) { return; }

    jsPlumb.connect({
      overlays,
      source: source.element,
      target: target.element
    });
  }
});
