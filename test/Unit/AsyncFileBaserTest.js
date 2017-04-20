const assert = require("chai").assert;

const FileBaser = require("./../../src/FileBaser");

describe("AsyncFileBaserTest", () => {
  let db = new FileBaser("file-baser-async.json");

  describe("testGettingCollections", () => {
    it("Should get a list of all collections", done => {
      db.getCollectionsAsync().then(collections => {
        assert.isTrue(Array.isArray(collections));

        done();
      });
    });
  });

  after(() => {
    db.dropDatabase();
  });
});
