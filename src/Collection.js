const uniqid = require('uniqid');

const DataCompiler = require('./DataCompiler');

class ArrayFilter {
        constructor(data) {
          this.data = data;
        };

  apply(filter) {
    this.filters = filter;
  };

    get() {
        let filters = this.filters;

        return this.data
            .filter((element, index) => {
                for (let i in filters.where) {
                    let filter = filters.where[i];
                    if (typeof filter === 'string') {
                        if (element[i] !== filter)
                            return false;

                        continue;
                    }

                    if (typeof filter === 'object') {
                        for (let j in filter) {
                            let value = filter[j];

                            if (j === 'eq' && element[i] !== value)
                                return false;

                            if (j === 'neq' && element[i] === value)
                                return false;

                            if (j === 'like' && element[i].indexOf(value) < 0)
                                return false;

                            if (j === 'gt' && element[i] <= value)
                                return false;

                            if (j === 'gte' && element[i] < value)
                                return false;

                            if (j === 'lt' && element[i] >= value)
                                return false;

                            if (j === 'lte' && element[i] > value)
                                return false;
                        }

                        continue;
                    }
                }

                return true;
            })
            .filter((element, index) => {
                if (filters.offset !== null) {
                    if ((index + 1) <= filters.offset)
                        return false;
                }

                if (filters.limit !== null) {
                    if (filters.limit <= 0)
                        return false;

                    filters.limit--;
                }

                return true;
            });
    };

}


class Collection {

    constructor(collectionData) {
        this.dbName = collectionData.database;
        this.name = collectionData.name;
        this.data = collectionData.data;
    };

    save(element) {
        if (typeof element.id === 'undefined')
            return this.insert(element);

        return this.update(element);
    };

    insert(element) {
        element.id = uniqid(uniqid.time() + '.');

        let response = this.data.push(element);

        return response >= 0;
    };

    update(element) {
        return true;
    };

    count(filters) {
        filters = Object.assign({
            where: {},
            limit: null,
            offset: null
        }, filters || {});

        let arrayfilter = new ArrayFilter(this.data)
        arrayfilter.apply(filters);

        return arrayfilter.get().length;
    };

    findAll(filters) {
        filters = Object.assign({
            where: {},
            limit: null,
            offset: null
        }, filters || {});

        let arrayfilter = new ArrayFilter(this.data)
        arrayfilter.apply(filters);

        return arrayfilter.get();
    };

    find(filters) {
        filters = Object.assign({
            where: {},
            limit: 1,
            offset: 0
        }, filters || {});

        let element = this.findAll(filters);
        if (element.length <= 0)
            return null;

        return element[0];
    };

    delete(filters, flush) {
        let _this = this;

        this
            .findAll(filters)
            .map(function (element) {
                let index = _this.data.indexOf(element);
                _this.data.splice(index, 1);
            });

        if (flush)
            this.flush();

        return true;
    };

    getName() {
        return this.name;
    };

    flush() {
        return DataCompiler
            .saveCollectionData(this.dbName, this.name, this.data);
    };

}

module.exports = Collection;
