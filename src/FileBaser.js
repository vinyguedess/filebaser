const DataCompiler = require("./DataCompiler"),
  Collection = require("./Collection/Collection");

var dbName = null;

class FileBaser {
  constructor(dbFileName) {
    this.dbName = (dbName = dbFileName);

    if (!DataCompiler.checkDatabaseExists(this.dbName))
      DataCompiler.createDatabase(this.dbName);
  }

  static getInstance() {
    return new FileBaser(dbName);
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

  getCollectionAsync(collectionName) {
    let _this = this;

    return DataCompiler.getCollectionAsync(
      this.dbName,
      collectionName
    ).then(collection => {
      collection.database = _this.dbName;
      return new Collection(collection, _this);
    });
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

module.exports = FileBaser;
