

declare class FileBaser
{

    public static getInstance():FileBaser;    
    
    public getInfo():IFileInfo;

    public dropDatabase():boolean;

    public dropDatabaseAsync():Promise<boolean>;

    public addCollection(collectionName:string):Collection;

    public addCollectionAsync(collectionName:string):Promise<Collection>;

    public getCollection(collectionName:string):Collection;

    public getCollectionAsync(collectionName:string):Promise<Collection>;

    public getCollections():Array<ICollection>;

    public getCollectionsAsync():Promise<Array<ICollection>>;

    public dropCollection(collectionName:string):boolean;

    public dropCollectionAsync(collectionName:string):Promise<boolean>;

}


export class Collection
{

    public save(element):boolean;

    public find(filters?:any):Array<any>|FindFilter;

    public delete():boolean;

    public getName():string;

    public flush():boolean;

    public flushAsync():Promise<boolean>

}


export class FindFilter
{

    public where(finder:Function|string, compare?:number|boolean|string, value?:number|boolean|string):FindFilter;

    public limit(limit:number):FindFilter;

    public offset(offset:number):FindFilter;

    public fetchAll():Array<any>;

    public fetch():any;

    public count():number;

}


interface IFileInfo
{

    getSize():number;

    createdAt():Date;

    modifiedAt():Date;

}


interface ICollection
{

    name:string;

    size:number;

}