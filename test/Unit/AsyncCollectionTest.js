const assert = require("chai").assert;

const FileBaser = require("./../../src/FileBaser"),
  Collection = require("./../../src/Collection/Collection");

describe("AsyncCollectionTest", () => {
  let db = new FileBaser("file-baser-async.json");

  before(() => {
    let collection = db.addCollection("datalist");
    collection.insert({ name: "Google Chrome", rate: 4.8 });
    collection.insert({ name: "Mozilla Firefox", rate: 4.9 });
    collection.insert({ name: "Opera", rate: 3.9 });
    collection.insert({ name: "Internet Explorer", rate: 2.1 });
    collection.flush();
  });

  describe("Getting a collection the async way", () => {
    it("Should get a collection without major problems", done => {
      db.getCollectionAsync("datalist").then(collection => {
        assert.instanceOf(collection, Collection);

        done();
      });
    });

    it("Should throw an exception cause collection don't exists yet", done => {
      db.getCollectionAsync("nonexistentcollection").catch(err => {
        assert.throw(() => {
          err();
        });

        done();
      });
    });
  });

  describe("Creating a collection the async way", () => {
    it("Should create a collection that doen't exist already", done => {
      db.addCollectionAsync("nonexistentcollection").then(collection => {
        assert.instanceOf(collection, Collection);
        assert.equal(0, collection.find().limit(10).fetchAll());

        done();
      });
    });

    it("Should try to create a collection that already exists", done => {
      db.addCollectionAsync("nonexistentcollection").then(collection => {
        assert.instanceOf(collection, Collection);
        assert.equal(0, collection.find().limit(20).fetchAll());

        done();
      });
    });
  });

  describe("Flushing data async way", () => {
    it("Should flush data and save the database file(s)", done => {
      db.getCollectionAsync("datalist").then(collection => {
        collection.insert({ name: "Safari", code: 3.2 });

        collection.flushAsync().then(response => {
          assert.isTrue(response);

          done();
        });
      });
    });
  });

  describe("Finding data the async way", () => {
    it("Should find data asynchronously", done => {
      db.getCollectionAsync("datalist").then(collection => {
        assert.instanceOf(collection, Collection);

        assert.equal(5, collection.find().count());

        done();
      });
    });
  });
});
