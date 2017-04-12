# Filebaser
Filebaser is an engine for managing database documents like MongoDB.

### Installation
All dependencies of Filebaser are easily installed by npm.
```bash
    npm install
```

### Declaration
How to declare:
```javascript
    const FileBaser = require('filebase');

    fb = new FileBaser('databasefile.db');
```

### Querying
You can apply any filter like in MongoDB
```javascript
    let collection = fb.getColletion('users');

    let users = collection.find({
        limit: 10,
        where: {
            age: { gte: 18 }
            active: true
        }
    });
```

### Testing
For automated tests we're using Mocha. And, integrated with npm custom scripts, you can run that easily using
the following command.
```bash
    npm run test
```