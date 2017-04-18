const assert = require("chai").assert;

const FileBaser = require("./../../src/FileBaser"),
  Collection = require("./../../src/Collection/Collection");

describe("AsyncCollectionTest", () => {
  describe("Doing something async way", () => {
    let db = new FileBaser("file-baser.json");

    it("Should find data asynchronously", done => {
      db.getCollectionAsync("datalist").then(collection => {
        assert.instanceOf(collection, Collection);

        done();
      });
    });
  });
});
