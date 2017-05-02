class FindAdapter {
  constructor(data, type) {
    this.data = data;
    this.type = typeof type === "undefined" ? "list" : type;
  }

  where() {
    if (arguments.length === 1 && typeof arguments[0] === "function")
      this.data = this.data.filter(arguments[0]);

    if (arguments.length >= 2) {
      let key = arguments[0],
        comparision = arguments.length === 2 ? "eq" : arguments[1],
        value = arguments.length > 2 ? arguments[2] : arguments[1];

      let _this = this;
      this.data = this.data.filter(element => {
        if (comparision === "eq" || comparision === "=")
          return _this._getElementValue(element, key) === value;

        if (comparision === "like")
          return _this._getElementValue(element, key).indexOf(value) >= 0;

        if (comparision === "neq" || comparision === "!=")
          return _this._getElementValue(element, key) !== value;

        if (comparision === "gt" || comparision === ">")
          return _this._getElementValue(element, key) > value;

        if (comparision === "gte" || comparision === ">=")
          return _this._getElementValue(element, key) >= value;

        if (comparision === "lt" || comparision === "<")
          return _this._getElementValue(element, key) < value;

        if (comparision === "lte" || comparision === "<=")
          return _this._getElementValue(element, key) <= value;
      });
    }

    return this;
  }

  limit(limit) {
    this.limit = limit;

    return this;
  }

  offset(offset) {
    this.offset = offset;

    return this;
  }

  fetchAll() {
    let limit = this.limit || null;
    let offset = this.offset || null;

    return this.data.filter((element, index) => {
      if (offset !== null) {
        if (index + 1 <= offset) return false;
      }

      if (limit !== null) {
        if (limit <= 0) return false;

        limit--;
      }

      return true;
    });
  }

  fetch() {
    let elements = this.limit(1).fetchAll();
    if (elements.length < 1 || typeof elements === "undefined") return null;

    return elements[0];
  }

  count() {
    return this.data.length;
  }

  _getElementValue(element, key) {
    if (key.indexOf(".") >= 0) {
      let value = element;

      key = key.split(".");
      for (let k of key) {
        if (typeof value[k] === "undefined") return null;

        value = value[k];
      }

      return value;
    }

    return element[key];
  }
}

module.exports = FindAdapter;
