const assert = require("chai").assert;

const FileBaser = require("../../src/FileBaser"),
  Collection = require("../../src/Collection/Collection");

describe("FileBaserTest", () => {
  describe("testGettingAnInstanceOfFileBaser", () => {
    it("Should make an instance of FileBaser from static call", () => {
      assert.instanceOf(FileBaser.getInstance(), FileBaser);
    });
  });

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

  describe("testGettingDatabaseInfo", () => {
    let db = new FileBaser("file-baser.json");

    it("Should show database information", () => {
      assert.isTrue(typeof db.getInfo() === "object");
      assert.isNumber(db.getInfo().getSize());
      assert.instanceOf(db.getInfo().createdAt(), Date);
      assert.instanceOf(db.getInfo().modifiedAt(), Date);
    });
  });

  describe("testGettingCollection", () => {
    let db = new FileBaser("file-baser.json"),
      collection = db.addCollection("datalist");

    it("Should list all database collections", () => {
      db.addCollection("col_one");
      db.addCollection("col_three");
      db.addCollection("col_two");

      let collections = db.getCollections();
      assert.isTrue(Array.isArray(collections));
    });

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
