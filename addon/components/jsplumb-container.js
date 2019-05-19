import { inject } from '@ember/service';

import Component from '@ember/component';

import { next } from '@ember/runloop';

import { jsPlumb, jsPlumbUtil } from 'jsplumb';

import layout from '../templates/components/jsplumb-container';

import { ParentMixin, ChildMixin } from 'ember-composability-tools';

export default Component.extend(ParentMixin, ChildMixin, {
  layout,

  jsplumbUtils: inject(),

  classNames: 'jsplumb-container',

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

    this.onDblClick = (e) => {
      if (e.target !== this.element) { return; }

      const id = jsPlumbUtil.uuid();

      const node = {
        id,
        width: 110,
        height: 110,
        top: e.offsetY,
        left: e.offsetX,
        label: 'New Node'
      };

      nodes.pushObject(node);
      this.onCreateNode && this.onCreateNode(node);
    };

    jsPlumb.on(this.element, 'dblclick', this.onDblClick);

    jsPlumb.bind('dblclick', (connection, e) => {
      if (e.target.hasAttribute('contenteditable')) { return; }
      jsPlumb.deleteConnection(connection);
    });

    jsPlumb.bind('beforeDrop', (info) => {
      const source = jsplumbUtils.getNode(info.sourceId);
      const target = jsplumbUtils.getNode(info.targetId);
      const uniqueEndpoint = jsplumbUtils.get('uniqueEndpoint');
      const connection = jsplumbUtils.getConnection(source.elId, target.elId);

      if (uniqueEndpoint && connection && connection !== info.connection) { return false; }

      const edge = {
        source: source.id,
        target: target.id,
        label: 'New Connection'
      };

      edges.pushObject(edge);
      this.onConnection && this.onConnection(edge);
    });

    jsPlumb.bind('beforeDetach', (info) => {
      const source = jsplumbUtils.getNode(info.sourceId);
      const target = jsplumbUtils.getNode(info.targetId);
      const edge = jsplumbUtils.getEdge(source.id, target.id, edges);

      if (!edge) { return false; }

      edges.removeObject(edge);
      this.onConnectionDetached && this.onConnectionDetached(edge);
    });
  },

  unbind() {
    jsPlumb.unbind('dblclick');
    jsPlumb.unbind('connection');
    jsPlumb.off(this.element, 'dblclick', this.onDblClick);
  }
});
