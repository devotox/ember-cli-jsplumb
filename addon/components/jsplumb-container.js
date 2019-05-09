import { jsPlumb } from 'jsplumb';
import { A } from '@ember/array';
import Component from '@ember/component';
import { ParentMixin } from 'ember-composability-tools';
import layout from '../templates/components/jsplumb-container';

export default Component.extend(ParentMixin, {
  layout,

  classNames: 'jsplumb-container',

  definition: null,

  didInsertElement() {
    this._super(...arguments);
    this.initialize();
    this.bind();
  },

  initialize() {
    const element = this.element;

    jsPlumb.setContainer(element);

    jsPlumb.recalculateOffsets(element);
  },

  bind() {
    const nodes = A(this.get('definition.nodes'));

    jsPlumb.on(this.element, 'dblclick', (e) => {
      if (e.target !== this.element) { return; }

      nodes.pushObject({
        text: 'New Node',
        left: e.offsetX,
        top: e.offsetY
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

  actions: {
  }
});
