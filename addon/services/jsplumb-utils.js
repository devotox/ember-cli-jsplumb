import { jsPlumb } from 'jsplumb';

import { A } from '@ember/array';

import Service from '@ember/service';

import { next, once } from '@ember/runloop';

import { getOwner } from '@ember/application';

import EmberObject, { computed, set, get } from '@ember/object';

export default Service.extend({
  selectElementContents(element) {
    if (!element) { return; }

    const range = document.createRange();
    range.selectNodeContents(element);
    const sel = window.getSelection();

    sel.removeAllRanges();
    sel.addRange(range);
    element.focus();
  },

  setupDefinition(definition = {}){
    set(definition, 'nodes', A(get(definition, 'nodes') || []));
    set(definition, 'edges', A(get(definition, 'edges') || []));
    return EmberObject.create(definition);
  },

  getNode(id) { // HTML ID
    if (!id){ return; }

    const elementDefinitions = jsPlumb.sourceEndpointDefinitions;
    return elementDefinitions[id].default.def;
  },

  removeNode(node, nodes, edges) {
    nodes.removeObject(node);
    edges.filter((edge) => {
      return edge.source === node.id
          || edge.target === node.id;
    }).forEach(edges.removeObject.bind(edges))
  },

  getEdge(sourceId, targetId, edges) { // Node IDs
    if (!sourceId || !targetId || !edges) { return; }

    return edges.find((edge) => {
      return edge.source === sourceId
        && edge.target === targetId;
    });
  },

  getConnection(sourceId, targetId) { // HTML IDs
    if (!sourceId || !targetId) { return; }

    const connections = jsPlumb.getAllConnections();
    return connections.find((connection) => {
      return connection.sourceId === sourceId
        && connection.targetId === targetId;
    });
  },

  getElement(id) { // Node ID
    if (!id){ return; }

    const elementDefinitions = jsPlumb.sourceEndpointDefinitions;

    const [elementID, { default: { def: definition } }]
      = Object.entries(elementDefinitions)
        .find(([, { default: { def: definition = {} } = {}} = {}]) => {
          return definition.id === id;
        });

    const element = document.getElementById(elementID);
    definition.elId = elementID;

    return { element, definition };
  },

  rerender() {
    jsPlumb.reset();

    once(() => {
      set(this, 'hideForRerender', true);

      next(this, () => {
        set(this, 'hideForRerender', false);
      });
    });
  },

  editable: true,

  draggable: false,

  maxConnections: -1,

  allowLoopback: false,

  uniqueEndpoint: true,

  hideForRerender: false,

  colors: computed('editable', function() {
    return {
      gray: '#9e9e9e',
      darkBlue: '#0d47a1',
      lightBlue: '#2196f3',
      lightGreen: '#4caf50'
    };
  }),

  anchor: computed('editable', function() {
    return 'Continuous';
  }),

  filter: computed('editable', function() {
    return '.connect-node';
  }),

  draggableHandle: computed('editable', function() {
    return '.label-wrapper, .action-wrapper, .node-wrapper';
  }),

  endpoint: computed('editable', function() {
    const { gray } = this.get('colors');
    return ['Dot', { width: 3, height: 3, radius: 5, fill: gray }]
  }),

  connector: computed('editable', function(){
    return ['Flowchart', { curviness: 100, cornerRadius: 5 }];
  }),

  dropOptions: computed('editable', function() {
    return { hoverClass: 'dragHover' };
  }),

  paintStyle: computed('editable', function(){
    const { gray } = this.get('colors');
    return { fill: gray };
  }),

  hoverPaintStyle: computed('editable', function() {
    const { lightGreen } = this.get('colors');
    return { stroke: lightGreen, strokeWidth: 5 };
  }),

  connectorStyle: computed('editable', function() {
    const { darkBlue } = this.get('colors');
    return {
      strokeWidth: 1.25,
      outlineWidth: 4,
      stroke: darkBlue,
      outlineStroke: 'transparent'
    };
  }),

  connectorHoverPaintStyle: computed('editable', function() {
    return {
      stroke: 'black',
      strokeWidth: 20,
      outlineWidth: 20,
      outlineStroke: 'transparent'
    };
  }),

  connectorOverlays: computed('editable', function() {
    const arrow = [
      'Arrow', {
        location: 1,
        id: 'arrow',
        length: 14,
        foldback: 0.8
      }];

    return [ arrow ];
  }),

  contentEditable(edge) {
    const owner = getOwner(this);

    const editable = this.get('editable');

    const contentEditable = owner
      .factoryFor('component:content-editable');

     const component = contentEditable.create({
       tagName: 'span',
       value: edge.label,
       disabled: !editable,
       allowNewlines: false,
       classNames: 'edge-label',
       placeholder: 'Enter Edge Label',
       'key-up': () => set(edge, 'label', event.target.innerText)
    });

    const div = document.createElement('div');

    component.didReceiveAttrs();
    component.appendTo(div);

    return component;
  },

  setupOverlays(edge = {}) {
    const [ arrow ] = this.get('connectorOverlays');

    const customLabel = [
      'Custom', {
        location: 0.5,
        id: 'customOverlay',
        create: () => {
          next(() => this.selectElementContents(element));
          const { element } = this.contentEditable(edge);
          return element;
        }
      }];

    return [ arrow, customLabel ];
  }
});
