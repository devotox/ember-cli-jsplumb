import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | jsplumb-node', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`{{jsplumb-node}}`);

    assert.equal(this.element.textContent.trim().replace(/\s+/g, ' '), 'edit add_circle remove_circle');

    // Template block usage:
    await render(hbs`
      {{#jsplumb-node}}
        template block text
      {{/jsplumb-node}}
    `);

    assert.equal(this.element.textContent.trim().replace(/\s+/g, ' '), 'edit add_circle remove_circle');
  });
});
