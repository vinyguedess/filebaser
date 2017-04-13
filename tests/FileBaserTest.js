const assert = require("chai").assert;

const FileBaser = require("./../src/FileBaser"),
  Collection = require("./../src/Collection");

describe("DocFileTest", () => {
  describe("testAddingCollection", () => {
    let db = new FileBaser("file-baser.json");
    let collection = db.addCollection("datalist");

    it("Should confirm collection is instance of Collection", () => {
      assert.instanceOf(collection, Collection);
    });

    it("Should confirm collection's name", () => {
      assert.equal("datalist", collection.getName());
    });
  });

  describe("testGettingCollection", () => {
    let db = new FileBaser("file-baser.json"),
      collection = db.addCollection("datalist");

    it("Should confirm collection is instance of Collection", () => {
      assert.instanceOf(collection, Collection);
    });

    it("Should confirm collection's name", () => {
      assert.equal("datalist", collection.getName());
    });

    it("Should throws Exception on unknown collection request", () => {
      assert.throws(
        () => {
          return db.getCollection("testing");
        },
        Error
      );
    });
  });

  describe("testDroppingDatabase", () => {
    it("Should drop the database", () => {
      let db = new FileBaser("file-baser.json");
      assert.isTrue(db.dropDatabase());
    });
  });
});
