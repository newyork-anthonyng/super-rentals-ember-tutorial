import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

const DUMMY_ELEMENT = {};

module('Unit | Service | map-element', function(hooks) {
  setupTest(hooks);

  test("should create a new map if one isn't cached for location", async function (assert) {
    assert.expect(5);
    const stubMapService = {
      createMap(element, coords) {
        assert.ok(element, "createMap called with element");
        assert.deepEqual(coords, [0, 0], "createMap given coordinates");

        return DUMMY_ELEMENT;
      }
    };
    const stubGeocodeService = {
      fetchCoordinates(location) {
        assert.equal(location, "San Francisco", "fetchCoordinates called with location");
        return Promise.resolve([0, 0]);
      }
    }
    const mapService = this.owner.factoryFor("service:map-element").create({
      map: stubMapService,
      geocode: stubGeocodeService
    });
    const element = await mapService.getMapElement("San Francisco");
    assert.ok(element, "element exists");
    assert.equal(element.className, "map", "element has class name of map");
  });

  test("should use existing map if one is cached for location", async function (assert) {
    assert.expect(1);
    const stubCachedMaps = {
      sanFrancisco: DUMMY_ELEMENT
    };
    const mapService = this.owner.factoryFor("service:map-element").create({
      cachedMaps: stubCachedMaps
    });
    const element = await mapService.getMapElement("San Francisco");
    assert.deepEqual(element, DUMMY_ELEMENT, "element fetched from cache");
  });
});
