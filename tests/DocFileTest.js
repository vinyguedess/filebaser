const assert = require('chai').assert;

const DocFile = require('./../src/DocFile'),
    Collection = require('./../src/Collection');

describe('DocFileTest', () => {

    describe('testAddingCollection', () => {
        let db = new DocFile('doc-file.json');
        let collection = db.addCollection('datalist');

        it ('Should confirm collection is instance of Collection', () => {
            assert.instanceOf(collection, Collection);
        });

        it('Should confirm collection\'s name', () => {
            assert.equal('datalist', collection.getName());
        });
    });

    describe('testGettingCollection', () => {
        let db = new DocFile('doc-file.json'),
            collection = db.addCollection('datalist');

        it ('Should confirm collection is instance of Collection', () => {
            assert.instanceOf(collection, Collection);
        });

        it('Should confirm collection\'s name', () => {
            assert.equal('datalist', collection.getName());
        });

        it('Should throws Exception on unknown collection request', () => {
            assert.throws(() => {
                return db.getCollection('testing');
            }, Error);
        });
    });

});