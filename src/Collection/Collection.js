const uniqid = require("uniqid");

const DataCompiler = require("./../DataCompiler"),
  FindFilter = require("./Filters/FindAdapter");

class Collection {
  constructor(collectionData) {
    this.dbName = collectionData.database;
    this.name = collectionData.name;
    this.data = collectionData.data;
  }

  save(element) {
    if (typeof element.id === "undefined") return this.insert(element);

    return this.update(element);
  }

  insert(element) {
    element.id = uniqid(uniqid.time() + ".");

    let response = this.data.push(element);

    return response >= 0;
  }

  update(element) {
    return true;
  }

  find(filters) {
    let findFilter = new FindFilter(this.data);
    if (typeof filters !== "undefined") {
      for (let key in filters.where || {}) {
        let value = filters.where[key];
        if (typeof value === "object") {
          for (let valueKey in value)
            findFilter.where(key, valueKey, value[valueKey]);

          continue;
        }

        findFilter.where(key, "=", value);
      }

      return findFilter.fetchAll();
    }

    return findFilter;
  }

  delete(filters, flush) {
    let _this = this;

    this.find(filters).map(function(element) {
      let index = _this.data.indexOf(element);
      _this.data.splice(index, 1);
    });

    if (flush) this.flush();

    return true;
  }

  getName() {
    return this.name;
  }

  flush(overWrite) {
    if (typeof overWrite === "undefined") overWrite = true;

    return DataCompiler.saveCollectionData(
      this.dbName,
      this.name,
      this.data,
      overWrite
    );
  }

  flushAsync(overWrite) {
    if (typeof overWrite === "undefined") overWrite = true;

    return DataCompiler.saveCollectionDataAsync(
      this.dbName,
      this.name,
      this.data,
      overWrite
    );
  }
}

module.exports = Collection;
