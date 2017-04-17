const DataCompiler = require("./DataCompiler"),
  Collection = require("./Collection/Collection");

class DocFile {
  constructor(dbFileName, options) {
    this.dbName = dbFileName;
    this.options = Object.assign(
      {
        pool: 5000
      },
      options || {}
    );

    if (!DataCompiler.checkDatabaseExists(this.dbName))
      DataCompiler.createDatabase(this.dbName);
  }

  getInfo() {
    let stats = DataCompiler.getDatabaseInfo(this.dbName);

    return {
      getSize: () => stats.size,
      createdAt: () => new Date(stats.ctime),
      modifiedAt: () => new Date(stats.mtime)
    };
  }

  dropDatabase() {
    return DataCompiler.dropDatabase(this.dbName);
  }

  addCollection(collectionName) {
    if (!DataCompiler.checkCollectionExists(this.dbName, collectionName))
      DataCompiler.createCollection(this.dbName, collectionName);

    return this.getCollection(collectionName);
  }

  getCollection(collectionName) {
    let collection = DataCompiler.getCollection(this.dbName, collectionName);

    if (typeof collection === "undefined")
      throw new Error("Collection requested does not exist");

    collection.database = this.dbName;

    return new Collection(collection, this);
  }

  getCollections() {
    let database = DataCompiler.getDatabase(this.dbName);

    let collections = [];
    for (let key in database.collections) {
      collections.push({
        name: database.collections[key].name,
        size: database.collections[key].data.length
      });
    }

    return collections;
  }

  dropCollection(collectionName) {
    DataCompiler.dropCollection(this.dbName, collectionName);

    return true;
  }
}

module.exports = DocFile;
