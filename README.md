# Filebaser
Filebaser is an engine for managing database documents like MongoDB.

### Declaration
How to declare:
```javascript
    const FileBaser = require('filebase');

    fb = new FileBaser();
```

### Querying
You can apply any filter like in MongoDB
```
    let collection = fb.getColletion('users');

    let users = collection.find({
        limit: 10,
        where: {
            age: { gte: 18 }
            active: true
        }
    });
```