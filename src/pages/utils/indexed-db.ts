type IndexedDBConfig = {
    tableName: string;
}

type Option = {

}


class IndexedDB {
    
    constructor(config: IndexedDBConfig){
        const request = indexedDB.open(config.tableName);
        const db = request.result;

    }

    save(data: any){

    }

    findOne(op:{}){

    }

    findAll(){

    }

    exec() {
        
    }


}


type ColumnMeta = {
    name: string;
    type: string;
    validate?: {
        is: any
    }
    format: () => {};
    config:{
       isUnique: boolean = false
    }
}

class TableMeta {
    tableName: string 
    columns: ColumnMeta[]
    option: {
        keyPath: string;
        autoIncrement: boolean;
    }
    constructor(){
        this.tableName = '';
        this.columns = [];
        this.option = {
            keyPath: 'id',
            autoIncrement: true,
        }
    }
    
    getList() :string[] {
        return this.columns.map(column => column.name)
    }
}

export const createTableMeta = (db:any, tableMeta:TableMeta) => {
    db.createObjectStore(
        tableMeta.getList(),
        tableMeta.option,
    );
}


export default IndexedDB;