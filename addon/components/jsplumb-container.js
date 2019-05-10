import { next } from '@ember/runloop';

import { inject } from '@ember/service';

import Component from '@ember/component';

import { jsPlumb, jsPlumbUtil } from 'jsplumb';

import { ParentMixin } from 'ember-composability-tools';

import layout from '../templates/components/jsplumb-container';

export default Component.extend(ParentMixin, {
  layout,

  classNames: 'jsplumb-container',

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
    this.initialize();

    next(() => this.bind());
  },

  willDestroyElement() {
    this._super(...arguments);
    this.unbind();
  },

  initialize() {
    const element = this.element;

    jsPlumb.setContainer(element);

    jsPlumb.recalculateOffsets(element);

  },

  bind() {
    const nodes = this.get('definition.nodes');
    const edges = this.get('definition.edges');

    const jsplumbUtils = this.get('jsplumbUtils');

    jsPlumb.on(this.element, 'dblclick', (e) => {
      if (e.target !== this.element) { return; }

      const id = jsPlumbUtil.uuid();

      nodes.pushObject({
        id,
        top: e.offsetY,
        left: e.offsetX,
        text: `New Node ${id.substring(0, 6)}`
      });
    });

    jsPlumb.bind('dblclick', (connection, e) => {
      if (e.target.hasAttribute('contenteditable')) { return; }
      jsPlumb.deleteConnection(connection);
    });

    // jsPlumb.bind('connection', (info) => {
    //   const label = info.connection.getOverlay('label');
    //   label && label.setLabel(info.connection.id);
    // });


    jsPlumb.bind('beforeDrop', (info) => {
      const source = jsplumbUtils.getNode(info.sourceId);
      const target = jsplumbUtils.getNode(info.targetId);
      const uniqueEndpoint = jsplumbUtils.get('uniqueEndpoint');
      const connection = jsplumbUtils.getConnection(source.elId, target.elId);

      if (uniqueEndpoint && connection && connection !== info.connection) { return; }

      const edge = {
        source: source.id,
        target: target.id,
        label: 'New Connection'
      };

      edges.pushObject(edge);
      this.onConnection && this.onConnection(edge);
    });
  },

  unbind() {
    jsPlumb.unbind('dblclick');
    jsPlumb.unbind('connection');
    jsPlumb.off(this.element, 'dblclick');
  }
});
