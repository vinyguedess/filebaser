const fs = require('fs');


class DataCompiler
{

    static checkDatabaseExists(database)
    {
        return fs.existsSync(database);
    };

    static createDatabase(database)
    {
        return fs.writeFileSync(database, JSON.stringify({
            database: database,
            collections: {}
        }));
    };

    static getDatabase(database)
    {
        return JSON.parse(fs.readFileSync(database));
    };

    static checkCollectionExists(database, collection)
    {
        let data = this.getDatabase(database);

        return typeof data.collections[collection] !== 'undefined';
    };

    static createCollection(database, collection)
    {
        let data = this.getDatabase(database);
        data.collections[collection] = {
            name: collection,
            data: []
        };

        return fs.writeFileSync(database, JSON.stringify(data));
    };

    static saveCollectionData(database, collection, collectionData, overWrite)
    {
        let data = this.getDatabase(database);

        if (overWrite || true)
            data.collections[collection].data = collectionData;
        else
            data.collections[collection].data = data.collections[collection]
                .data
                .concat(collectionData)
                .filter((element, index, allElements) => {
                    return allElements.indexOf(element) < 0;
                });

        fs.writeFileSync(database, JSON.stringify(data));

        return true;
    };

    static dropCollection(database, collection)
    {
        let data = this.getDatabase(database);
        delete data.collections[collection];

        fs.writeFileSync(database, JSON.stringify(data));

        return true;
    };

    static getCollection(database, collection)
    {
        let data = this.getDatabase(database);

        return data.collections[collection];
    };

};

module.exports = DataCompiler;