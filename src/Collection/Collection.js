const uniqid = require("uniqid");

const DataCompiler = require("./../DataCompiler"), Filter = require("./Filter");

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

  count(filters) {
    filters = Object.assign(
      {
        where: {},
        limit: null,
        offset: null
      },
      filters || {}
    );

    let arrayfilter = new Filter(this.data);
    arrayfilter.apply(filters);

    return arrayfilter.get().length;
  }

  findAll(filters) {
    filters = Object.assign(
      {
        where: {},
        limit: null,
        offset: null
      },
      filters || {}
    );

    let arrayfilter = new Filter(this.data);
    arrayfilter.apply(filters);

    return arrayfilter.get();
  }

  find(filters) {
    filters = Object.assign(
      {
        where: {},
        limit: 1,
        offset: 0
      },
      filters || {}
    );

    let element = this.findAll(filters);
    if (element.length <= 0) return null;

    return element[0];
  }

  delete(filters, flush) {
    let _this = this;

    this.findAll(filters).map(function(element) {
      let index = _this.data.indexOf(element);
      _this.data.splice(index, 1);
    });

    if (flush) this.flush();

    return true;
  }

  getName() {
    return this.name;
  }

  flush() {
    return DataCompiler.saveCollectionData(this.dbName, this.name, this.data);
  }
}

module.exports = Collection;
