class Entity {
  setAttributes(attributes) {
    for (let key in attributes) {
      this[key] = attributes[key];
    }
  }

  getAttributes() {
    let attributes = {};
    for (let key in this) {
      if (typeof this[key] !== "function") attributes[key] = this[key];
    }

    return attributes;
  }
}

module.exports = Entity;
