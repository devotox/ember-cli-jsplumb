import Component from '@ember/component';
import { jsPlumb, jsPlumbUtil } from 'jsplumb';
import { ChildMixin } from 'ember-composability-tools';
import { computed, getProperties } from '@ember/object';
import layout from '../templates/components/jsplumb-node';
import hbs from 'htmlbars-inline-precompile';

export default Component.extend(ChildMixin, {
  layout,

  node: {}, // eslint-disable-line

  maxConnections: -1,

  editable: true,

  draggable: true,

  allowLoopback: false,

  uniqueEndpoint: false,

  classNames: 'jsplumb-node w',

  classNameBindings: ['nodeType'],

  nodeType: computed('node.type', function(){
    const node = this.get('node');
    return `flowchart-object flowchart-${node.type}`
  }),

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
    return [
      [ 'Arrow', {
        location: 1,
        id: 'arrow',
        length: 14,
        foldback: 0.8
      }],
      [ 'Label', {
        label: '',
        id: 'label',
        cssClass: 'aLabel'
      }],
      ["Custom", {
        create: function() {
          return hbs(`{{content-editable
            value=node.text
            tagName="span"
            allowNewlines=false
            placeholder="Enter Node Label"
          }}`);
        },
        location:0.7,
        id:"customOverlay"
      }]
    ];
  }),

  didInsertElement() {
    this._super(...arguments);
    this.initialize();
    this.bind();
  },

  initialize() {
    const node = this.get('node');

    const element = this.element;

    const properties = getProperties(this, [
      'anchor', 'filter',
      'allowLoopback', 'uniqueEndpoint',
      'paintStyle', 'hoverPaintStyle',
      'connectorStyle', 'connectorPaintStyle',
      'connector', 'connectorHoverPaintStyle',
      'endpoint', 'endpointStyle', 'endpointHoverStyle',
      'dropOptions', 'maxConnections', 'connectorOverlays'
    ]);

    const defaults = {
      isTarget: true,
      isSource: true,
      deleteEndpointsOnDetach: true
    };

    jsPlumbUtil.sizeElement(element, node.left, node.top, node.width, node.height);

    this.get('draggable') && jsPlumb.draggable(element, {
      containment: true,
      handle: '.handle'
    });

    jsPlumb.makeSource(element, properties, defaults);

    const input = element.querySelector('[contenteditable');
    selectElementContents(input)
  },
  bind() {
  }
});

function selectElementContents(el) {
  const range = document.createRange();
  range.selectNodeContents(el);
  const sel = window.getSelection();
  sel.removeAllRanges();
  sel.addRange(range);
  el.focus();
}
