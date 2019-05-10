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

    console.log('plumb', window.temp1 = this);

  },

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

    jsPlumb.setContainer(element);

    jsPlumb.recalculateOffsets(element);

  },

  bind() {
    const nodes = this.get('definition.nodes');

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

    jsPlumb.bind('dblclick', function (connection, e) {
      if (e.target.hasAttribute('contenteditable')) { return; }
      jsPlumb.deleteConnection(connection);
    });

    jsPlumb.bind('connection', function (info) {
      const label = info.connection.getOverlay('label');
      label && label.setLabel(info.connection.id);
    });
  },

  unbind() {
    jsPlumb.unbind('dblclick');
    jsPlumb.unbind('connection');
    jsPlumb.off(this.element, 'dblclick');
  }
});
