const assert = require("chai").assert;

const FileBaser = require("./../src/FileBaser"),
  Collection = require("./../src/Collection");

describe("CollectionTest", () => {
  let db = new FileBaser("file-baser.json");
  db.addCollection("datalist");

  describe("testInsertingDataIntoCollection", () => {
    let collection = db.getCollection("datalist");

    it("Should insert data", () => {
      let inserted = collection.insert({
        name: "doc-file",
        version: "0.1",
        code: 10
      });

      assert.isTrue(inserted);
      assert.isAtLeast(collection.count(), 1);
    });
  });

  describe("testFind", () => {
    let collection = db.getCollection("datalist");
    collection.insert({ name: "Google", version: "56.0", code: 2 });
    collection.insert({ name: "Bing", version: "13.0", code: 7 });
    collection.insert({ name: "Yahoo", version: "7.13.1", code: 1 });

    it("Should find any element", () => {
      let element = collection.find();

      assert.isTrue(typeof element === "object");
    });

    it("Should find many elements", () => {
      let elements = collection.findAll({
        offset: 2,
        limit: 1
      });

      assert.equal(1, elements.length);
      assert.equal("Yahoo", elements[0].name);
    });

    it("Should find and filter data", () => {
      assert.equal(
        1,
        collection.findAll({
          where: {
            version: "7.13.1"
          }
        }).length
      );

      assert.equal(
        "Google",
        collection.find({
          where: {
            code: { neq: 10 }
          }
        }).name
      );

      assert.equal(
        2,
        collection.findAll({
          where: {
            name: { like: "oo" }
          }
        }).length
      );

      assert.isNull(
        collection.find({
          where: {
            code: { gte: 10 }
          }
        })
      );

      assert.isNull(
        collection.find({
          where: {
            code: { gt: 10 }
          }
        })
      );

      assert.equal(
        1,
        collection.findAll({
          where: {
            code: { lt: 2 }
          }
        }).length
      );
    });
  });

  describe("testCountingResults", () => {
    let collection = db.getCollection("datalist");
    collection.insert({ name: "Google", version: "56.0", code: 2 });
    collection.insert({ name: "Bing", version: "13.0", code: 7 });
    collection.insert({ name: "Yahoo", version: "7.13.1", code: 1 });

    it("Should count data without problems", () => {
      assert.equal(3, collection.count());
    });

    it("Should count data based on filters", () => {
      assert.equal(
        1,
        collection.count({
          where: {
            name: "Google"
          }
        })
      );

      assert.equal(
        1,
        collection.count({
          where: {
            code: { gte: 7 }
          }
        })
      );
    });
  });

  describe("testUpdatingData", () => {
    let collection = db.getCollection("datalist");
    collection.insert({ name: "any", version: "18.5", code: 10 });
    collection.insert({ name: "Google", version: "56.0", code: 2 });
    collection.insert({ name: "Bing", version: "13.0", code: 7 });
    collection.insert({ name: "Yahoo", version: "7.13.1", code: 1 });

    it("Should find an specific element and update its information", () => {
      let element = collection.find({
        where: {
          code: 10
        }
      });

      element.name = "Safari";
      collection.update(element);
    });
  });

  describe("testFlushingData", () => {
    let collection = db.getCollection("datalist");
    collection.insert({ name: "Safari", version: "18.5", code: 10 });
    collection.insert({ name: "Google", version: "56.0", code: 2 });
    collection.insert({ name: "Bing", version: "13.0", code: 7 });
    collection.insert({ name: "Yahoo", version: "7.13.1", code: 1 });

    it("Should flush data and save back into database", () => {
      assert.isTrue(collection.flush());
    });
  });

  describe("testDeletingData", () => {
    it("Should delete data based on filters", () => {
      let collection = db.getCollection("datalist");

      assert.isTrue(
        collection.delete(
          {
            where: {
              code: { gt: 1 }
            }
          },
          true
        )
      );

      assert.equal(1, collection.count());
    });
  });

  describe("testDroppingCollection", () => {
    it("Should drop the collection", () => {
      assert.isTrue(db.dropCollection("datalist"));
      assert.throws(
        () => {
          return db.getCollection("datalist");
        },
        Error
      );
    });
  });
});
