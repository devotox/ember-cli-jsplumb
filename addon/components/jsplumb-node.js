import { inject } from '@ember/service';

import Component from '@ember/component';

import { jsPlumb, jsPlumbUtil } from 'jsplumb';

import { ChildMixin } from 'ember-composability-tools';

import { computed, getProperties } from '@ember/object';

import layout from '../templates/components/jsplumb-node';

export default Component.extend(ChildMixin, {
  layout,

  node: {}, // eslint-disable-line

  nodes: [], // eslint-disable-line

  jsplumbUtils: inject(),

  classNames: 'jsplumb-node w',

  classNameBindings: ['nodeType'],

  nodeType: computed('node.type', function(){
    const node = this.get('node');
    return `flowchart-object flowchart-${node.type}`
  }),

  didInsertElement() {
    this._super(...arguments);
    this.initialize();
    this.bind();
  },

  willDestroyElement() {
    this._super(...arguments);
    this.unbind();
  },

  initialize() {
    const element = this.element;

    const node = this.get('node');

    const jsplumbUtils = this.get('jsplumbUtils');

    const handle = jsplumbUtils.get('draggableHandle');

    const properties = getProperties(jsplumbUtils, [
      'anchor', 'filter',
      'allowLoopback', 'uniqueEndpoint',
      'paintStyle', 'hoverPaintStyle',
      'connectorStyle', 'connectorPaintStyle',
      'connector', 'connectorHoverPaintStyle',
      'endpoint', 'endpointStyle', 'endpointHoverStyle',
      'dropOptions', 'maxConnections', 'connectorOverlays'
    ]);

    jsPlumbUtil.sizeElement(
      element,
      node.left, node.top,
      node.width, node.height
    );

    jsplumbUtils.get('draggable')
      && jsPlumb.draggable(element, {
        containment: true,
        handle
      });

    jsPlumb.makeSource(element, properties, {
      id: node.id,
      isTarget: true,
      isSource: true,
      setDragAllowedWhenFull: true,
      deleteEndpointsOnDetach: true
    });

    const input = element.querySelector('[contenteditable]');
    jsplumbUtils.selectElementContents(input);
  },
  bind() {

  },
  unbind() {

  },

  actions: {
    editNode() {
      const node = this.get('node');
      const nodes = this.get('nodes');

      const jsplumbUtils = this.get('jsplumbUtils');
      const { element } = jsplumbUtils.getElement(node.id);

      nodes.removeObject(node);
      jsPlumb.remove(element.el);
    },
    deleteNode() {
      const node = this.get('node');
      const nodes = this.get('nodes');

      const jsplumbUtils = this.get('jsplumbUtils');
      const { element } = jsplumbUtils.getElement(node.id);

      nodes.removeObject(node);
      jsPlumb.remove(element.el);
    }
  }
});
