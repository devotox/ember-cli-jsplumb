import { inject } from '@ember/service';

import Component from '@ember/component';

import { jsPlumb, jsPlumbUtil } from 'jsplumb';

import { ChildMixin } from 'ember-composability-tools';

import layout from '../templates/components/jsplumb-node';

import { computed, getProperties, setProperties } from '@ember/object';

export default Component.extend(ChildMixin, {
  layout,

  node: {}, // eslint-disable-line

  nodes: [], // eslint-disable-line

  jsplumbUtils: inject(),

  classNames: 'jsplumb-node',

  classNameBindings: ['nodeType'],

  nodeType: computed('node.type', function(){
    const node = this.get('node');
    return `node-${node.type}`
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
        handle, containment: true,
        stop({ pos: [left, top]}) {
          setProperties(node, { left, top });
        }
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

      const jsplumbUtils = this.get('jsplumbUtils');
      const { element } = jsplumbUtils.getElement(node.id);

      this.onEdit && this.onEdit(node, element);
    },
    deleteNode() {
      const node = this.get('node');
      const nodes = this.get('nodes');
      const edges = this.get('edges');

      const jsplumbUtils = this.get('jsplumbUtils');
      const { element } = jsplumbUtils.getElement(node.id);

      jsPlumb.remove(element.el);
      jsplumbUtils.removeNode(node, nodes, edges);
      this.onRemove && this.onRemove(node, element);
    }
  }
});
