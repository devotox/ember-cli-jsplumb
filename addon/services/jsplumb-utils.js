import { A } from '@ember/array';

import Service from '@ember/service';

import { next } from '@ember/runloop';

import EmberObject, { computed, set, get } from '@ember/object';
import {jsPlumb} from "jsplumb";

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

  getElement(id) {
    const elements = jsPlumb.getManagedElements();
    const elementDefinitions = jsPlumb.sourceEndpointDefinitions;

    const [elementID, { default: { def: definition } }]
      = Object.entries(elementDefinitions)
        .find(([, { default: { def: definition }}]) => {
          return definition.id === id;
        });

    const element = elements[elementID];
    definition.elId = elementID;

    return { element, definition };
  },

  editable: true,

  draggable: true,

  maxConnections: -1,

  allowLoopback: false,

  uniqueEndpoint: false,

  anchor: computed(function() {
    return 'Continuous';
  }),

  endpoint: computed(function() {
    return ['Dot', { width: 3, height: 3, radius: 5, fill: 'gray' }]
  }),

  connector: computed(function(){
    return ['Flowchart', { curviness: 100, cornerRadius: 5 }];
  }),

  filter: computed(function() {
    return '.ep';
  }),

  dropOptions: computed(function() {
    return { hoverClass: 'dragHover' };
  }),

  paintStyle: computed(function(){
    return { fill: 'gray' };
  }),

  hoverPaintStyle: computed(function() {
    return { stroke: '#1e8151', strokeWidth: 5 };
  }),

  connectorStyle: computed(function() {
    return {
      strokeWidth: 2,
      outlineWidth: 4,
      stroke: '#5c96bc',
      outlineStroke: 'transparent'
    };
  }),

  connectorHoverPaintStyle: computed(function() {
    return {
      strokeWidth: 20,
      outlineWidth: 20,
      stroke: 'black',
      outlineStroke: 'transparent'
    };
  }),

  connectorOverlays: computed(function() {
    const editable = this.get('editable');

    const arrow = [
      'Arrow', {
        location: 1,
        id: 'arrow',
        length: 14,
        foldback: 0.8
      }];

    const label = [
      'Label', {
        label: '',
        id: 'label',
        cssClass: 'aLabel'
      }];

    const custom = [
      'Custom', {
        location: 0.5,
        id: 'customOverlay',
        create: (connection) => {
          const element = connection.source
            .querySelector('[contenteditable')
            .cloneNode(true);

          element.textContent = connection.id;
          element.setAttribute('placeholder', 'Enter Label');
          element.classList.add('jtk-overlay');
          element.classList.add('aLabel');

          // next(() => this.selectElementContents(element));
          return element;
        }
      }];

    return [ arrow, editable ? custom : label];
  }),

  setupOverlays(edge = {}) {
    const editable = this.get('editable');
    const edgeLabel = edge.label || edge.data && edge.data.label;

    const arrow = [
      'Arrow', {
        location: 1,
        id: 'arrow',
        length: 14,
        foldback: 0.8
      }];

    const label = [
      'Label', {
        id: 'label',
        label: edgeLabel,
        cssClass: 'aLabel'
      }];

    const custom = [
      'Custom', {
        location: 0.5,
        id: 'customOverlay',
        create: (connection) => {
          const element = connection.source
            .querySelector('[contenteditable')
            .cloneNode(true);

          element.textContent = edgeLabel || connection.id;
          element.setAttribute('placeholder', 'Enter Label');
          element.classList.add('jtk-overlay');
          element.classList.add('aLabel');

          next(() => this.selectElementContents(element));
          return element;
        }
      }];

    return [ arrow, editable ? custom : label];
  }
});
