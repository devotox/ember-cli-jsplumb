import { inject } from '@ember/service';

import Component from '@ember/component';

import { jsPlumb, jsPlumbUtil } from 'jsplumb';

import { guidFor } from '@ember/object/internals';

import { ChildMixin } from 'ember-composability-tools';

import layout from '../templates/components/jsplumb-node';

import { getProperties, setProperties } from '@ember/object';

export default Component.extend(ChildMixin, {
  layout,

  tagName: '',

  node: {}, // eslint-disable-line

  nodes: [], // eslint-disable-line

  jsplumbUtils: inject(),

  init() {
    this._super(...arguments);
    this.id = this.id || `${guidFor(this)}-jsplumb-node`;
  },

  setElement() {
    this._element = document.getElementById(this.id);
  },

  didInsertElement() {
    this._super(...arguments);
    this.setElement();
    this.initialize();
  },

  initialize() {
    const element = this._element;

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

    jsplumbUtils.get('editable')
      && jsplumbUtils.get('draggable')
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

  actions: {
    resizeNode(_, { width, height }) {
      const element = this._element;
      const node = this.get('node');

      setProperties(node, {
        width, height
      });

      jsPlumbUtil.sizeElement(
        element,
        node.left, node.top,
        node.width, node.height
      );

      jsPlumb.revalidate(element);
    },
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

      jsPlumb.remove(element);
      jsplumbUtils.removeNode(node, nodes, edges);
      this.onRemove && this.onRemove(node, element);
    }
  }
});
