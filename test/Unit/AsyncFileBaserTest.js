const assert = require("chai").assert;

const FileBaser = require("./../../src/FileBaser");

describe("AsyncFileBaserTest", () => {
  let db = new FileBaser("file-baser-async.json");
  db.addCollection("datalist");
  db.addCollection("listdata");

  describe("testGettingCollections", () => {
    it("Should get a list of all collections", done => {
      db.getCollectionsAsync().then(collections => {
        assert.isTrue(Array.isArray(collections));

        done();
      });
    });
  });

  describe("testDropppingCollection", () => {
    it("Should drop defined collection and delete all its data", done => {
      db.dropCollectionAsync("listdata").then(response => {
        assert.isTrue(response);

        done();
      });
    });
  });

  describe("testDroppingDatabase", () => {
    it("Should drop database completely and remove it's files", done => {
      db.dropDatabaseAsync().then(response => {
        assert.isTrue(response);

        done();
      });
    });
  });
});
