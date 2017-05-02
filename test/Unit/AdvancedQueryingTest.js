const assert = require("chai").assert;

const FileBaser = require("./../../src/FileBaser");

describe("AdvancedQueryingTest", () => {
  let db = new FileBaser("filebase-testing-advanced-querying.json");

  before(() => {
    let collection = db.addCollection("listing");

    collection.insert({
      name: "Clark Kent",
      address: {
        place: "Paulista Av.",
        city: "São Paulo",
        state: {
          name: "São Paulo",
          initial: "SP"
        }
      }
    });

    collection.insert({
      name: "Bruce Wayne",
      address: {
        place: "9 de Julho Av.",
        city: "São Paulo",
        state: {
          name: "São Paulo",
          initial: "SP"
        }
      }
    });

    collection.insert({
      name: "Diana Prince",
      address: {
        place: "Barbacena Av.",
        city: "Belo Horizonte",
        state: {
          name: "Minas Gerais",
          initial: "MG"
        }
      }
    });

    collection.flush();
  });

  describe("Applying advanced querying filters", () => {
    it("Should filter data from an object attribute", done => {
      db.getCollectionAsync("listing").then(collection => {
        assert.equal(
          1,
          collection.find().where("address.state.initial", "MG").count()
        );

        assert.equal(
          3,
          collection.find().where("address.place", "like", "Av").count()
        );

        assert.equal(
          2,
          collection.find().where("address.city", "eq", "São Paulo").count()
        );

        done();
      });
    });
  });

  after(() => db.dropDatabase());
});
