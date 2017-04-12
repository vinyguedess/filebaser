const DataCompiler = require('./DataCompiler'),
    Collection = require('./Collection');


class DocFile
{

    constructor(dbFileName, options)
    {
        this.dbName = dbFileName;
        this.options = Object.assign({
            pool: 5000
        }, options || {});

        if (!DataCompiler.checkDatabaseExists(this.dbName))
            DataCompiler.createDatabase(this.dbName);
    };

    dropDatabase()
    {
        return DataCompiler.dropDatabase(this.dbName);
    };

    addCollection(collectionName)
    {
        if (!DataCompiler.checkCollectionExists(this.dbName, collectionName))
            DataCompiler.createCollection(this.dbName, collectionName);

        return this.getCollection(collectionName);
    };

    getCollection(collectionName)
    {
        let collection = DataCompiler.getCollection(this.dbName, collectionName);

        if (typeof collection === 'undefined')
            throw new Error('Collection requested does not exist');

        collection.database = this.dbName;

        return new Collection(collection, this);
    };

    dropCollection(collectionName)
    {
        DataCompiler.dropCollection(this.dbName, collectionName);

        return true;
    };

};

module.exports = DocFile;