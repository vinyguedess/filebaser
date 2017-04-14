class Filter {
  constructor(data) {
    this.data = data;
  }

  apply(filter) {
    this.filters = filter;
  }

  get() {
    let filters = this.filters;

    return this.data
      .filter((element, index) => {
        for (let i in filters.where) {
          let filter = filters.where[i];
          if (typeof filter === "string") {
            if (element[i] !== filter) return false;

            continue;
          }

          if (typeof filter === "object") {
            for (let j in filter) {
              let value = filter[j];

              if (j === "eq" && element[i] !== value) return false;

              if (j === "neq" && element[i] === value) return false;

              if (j === "like" && element[i].indexOf(value) < 0) return false;

              if (j === "gt" && element[i] <= value) return false;

              if (j === "gte" && element[i] < value) return false;

              if (j === "lt" && element[i] >= value) return false;

              if (j === "lte" && element[i] > value) return false;
            }

            continue;
          }
        }

        return true;
      })
      .filter((element, index) => {
        if (filters.offset !== null) {
          if (index + 1 <= filters.offset) return false;
        }

        if (filters.limit !== null) {
          if (filters.limit <= 0) return false;

          filters.limit--;
        }

        return true;
      });
  }
}

module.exports = Filter;
