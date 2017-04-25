const fs = require("fs");

class DataCompiler {
  static checkDatabaseExists(database) {
    return fs.existsSync(database);
  }

  static createDatabase(database) {
    return fs.writeFileSync(
      database,
      JSON.stringify({
        database: database,
        collections: {}
      })
    );
  }

  static getDatabase(database) {
    return JSON.parse(fs.readFileSync(database));
  }

  static getDatabaseAsync(database) {
    return new Promise((resolve, reject) => {
      fs.readFile(database, "utf-8", (err, data) => {
        if (err) reject(err);

        return resolve(JSON.parse(data));
      });
    });
  }

  static getDatabaseInfo(database) {
    return fs.statSync(database);
  }

  static dropDatabase(database) {
    fs.unlinkSync(database);

    return true;
  }

  static dropDatabaseAsync(database) {
    return new Promise((resolve, reject) => {
      fs.unlink(database, err => {
        if (err) resolve(false);

        resolve(true);
      });
    });
  }

  static checkCollectionExists(database, collection) {
    let data = this.getDatabase(database);

    return typeof data.collections[collection] !== "undefined";
  }

  static createCollection(database, collection) {
    let data = this.getDatabase(database);
    data.collections[collection] = {
      name: collection,
      data: []
    };

    return fs.writeFileSync(database, JSON.stringify(data));
  }

  static createCollectionAsync(database, collection) {
    let _this = this;

    return this.getDatabaseAsync(database).then(data => {
      data.collections[collection] = {
        name: collection,
        data: []
      };

      return new Promise((resolve, reject) => {
        fs.writeFile(database, JSON.stringify(data), err => {
          if (err) reject(err);

          resolve(true);
        });
      });
    });
  }

  static saveCollectionData(database, collection, collectionData, overWrite) {
    let data = this.getDatabase(database);

    if (overWrite || true) data.collections[collection].data = collectionData;
    else data.collections[collection].data = data.collections[collection].data
        .concat(collectionData)
        .filter((element, index, allElements) => {
          return allElements.indexOf(element) < 0;
        });

    fs.writeFileSync(database, JSON.stringify(data));

    return true;
  }

  static saveCollectionDataAsync(
    database,
    collection,
    collectionData,
    overWrite
  ) {
    console.log(overWrite);
    return this.getDatabaseAsync(database).then(data => {
      if (overWrite || true) data.collections[collection].data = collectionData;
      else data.collections[collection].data = data.collections[collection].data
          .concat(collectionData)
          .filter((element, index, allElements) => {
            return allElements.indexOf(element) < 0;
          });

      return new Promise((resolve, reject) => {
        fs.writeFile(database, JSON.stringify(data), err => {
          if (err) resolve(false);

          resolve(true);
        });
      });
    });
  }

  static dropCollection(database, collection) {
    let data = this.getDatabase(database);
    delete data.collections[collection];

    fs.writeFileSync(database, JSON.stringify(data));

    return true;
  }

  static dropCollectionAsync(database, collection) {
    return this.getDatabaseAsync(database).then(data => {
      delete data.collections[collection];

      return new Promise((resolve, reject) => {
        fs.writeFile(database, JSON.stringify(data), err => {
          if (err) resolve(false);

          resolve(true);
        });
      });
    });
  }

  static getCollection(database, collection) {
    let data = this.getDatabase(database);

    return data.collections[collection];
  }

  static getCollectionAsync(database, collection) {
    return this.getDatabaseAsync(database).then(data => {
      if (typeof data.collections[collection] !== "undefined")
        return data.collections[collection];

      throw new Error("Collection " + collection + " was not found");
    });
  }
}

module.exports = DataCompiler;
