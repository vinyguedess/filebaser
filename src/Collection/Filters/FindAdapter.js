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

      this.data = this.data.filter(element => {
        if (comparision === "eq" || comparision === "==")
          return element[key] === value;

        if (comparision === "like") return element[key].indexOf(value) >= 0;

        if (comparision === "neq" || comparision === "!=")
          return element[key] !== value;

        if (comparision === "gt" || comparision === ">")
          return element[key] > value;

        if (comparision === "gte" || comparision === ">=")
          return element[key] >= value;

        if (comparision === "lt" || comparision === "<")
          return element[key] < value;

        if (comparision === "lte" || comparision === "<=")
          return element[key] <= value;

        return true;
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
}

module.exports = FindAdapter;
