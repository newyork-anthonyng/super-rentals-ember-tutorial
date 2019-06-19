import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Helper | rental-property-type', function(hooks) {
  setupRenderingTest(hooks);

  test("it renders correctly for a Standalone rental", async function(assert) {
    this.set("inputValue", "Estate");

    await render(hbs`{{rental-property-type inputValue}}`);

    assert.equal(this.element.textContent.trim(), "Standalone");
  });

  test("it renders correctly for a Community rental (Apartment)", async function(assert) {
    this.set("inputValue", "Apartment");

    await render(hbs`{{rental-property-type inputValue}}`);

    assert.equal(this.element.textContent.trim(), "Community");
  });

  test("it renders correctly for a Community rental (Condo)", async function(assert) {
    this.set("inputValue", "Condo");

    await render(hbs`{{rental-property-type inputValue}}`);

    assert.equal(this.element.textContent.trim(), "Community");
  });

  test("it renders correctly for a Community rental (Townhouse)", async function(assert) {
    this.set("inputValue", "Townhouse");

    await render(hbs`{{rental-property-type inputValue}}`);

    assert.equal(this.element.textContent.trim(), "Community");
  });
});