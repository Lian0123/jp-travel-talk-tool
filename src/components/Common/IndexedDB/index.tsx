/* React Config */
import * as React from "react";
import {useEffect, useState} from "react";

/* Compoent */
import ViewPage from '../../ViewPage';

/* Constants */
const INDEXD_DB_NAME = 'jp-travel-talk-tool_v_0_0_1';
const INDEXD_DB_VERSION = 3;

const IndexedDB = () => {
    const [ db, setDB ] = useState(null);
    const [ response, setResponse ] = useState(null);
    const [ isConnection, setConnection ] = useState(false);

    useEffect(() => {
        if (!window.indexedDB) {
            alert("Your browser doesn't support a stable version of IndexedDB. Such and such feature will not be available.");
            return;
        }
        connectIndexDB();
    },[]);

    useEffect(()=> {
        if (db) {
            setConnection(true);
        }
    }, [db]);

    const createCommand = (table: string, data: any | any[]) => {
        if (!db) {
            return;
        }
        if (!Array.isArray(data)) {
            data = [data];
        }
        const transaction = db.transaction([table], "readwrite");
        transaction.oncomplete = (event :any) => {
            setResponse(event);
        };
          
        transaction.onerror = (event: any) => {
            setResponse(event);
        };
        const objectStore = transaction.objectStore(table);
        for (const i in data) {
            const request = objectStore.add(data[i]);
            request.onsuccess = (event: any) => {
                setResponse(event);
            };
        }
    };

    const updateCommand = (table: string, data: any) => {
        if (!db) {
            return;
        }
        const transaction = db.transaction([table], "readwrite");
        transaction.oncomplete = (event :any) => {
            setResponse(event);
        };
          
        transaction.onerror = (event: any) => {
            setResponse(event);
        };
        const objectStore = transaction.objectStore(table);
        const request = objectStore.put(data);
        request.onsuccess = (event: any) => {
            setResponse(event);
        };
    };


    const readCommand = (table: string, key: string) => {

        return new Promise((resolve, reject) => {
            if (!db) {
                reject();
            }
            const transaction = db.transaction([table], "readwrite");
            const objectStore = transaction.objectStore(table).get(key);
            objectStore.onsuccess = () => {
                setResponse(objectStore);
                resolve(objectStore.result);
            };
            objectStore.onerror = () => {
                setResponse(objectStore);
                reject(objectStore.error);
            };
        });
    };

    const readAllCommand = (table: string) => {
        return new Promise((resolve, reject) => {
            const result :any[] = [];
            if (!db) {
                reject();
            }
            const transaction = db.transaction([table], "readwrite");
            const objectStore = transaction.objectStore(table).openCursor();
            objectStore.onsuccess = () => {
                if(!objectStore.result) {
                    setResponse(result);
                    return resolve(result);
                }

                result.push(objectStore.result.value);
                objectStore.result.continue();
            };
            objectStore.onerror = () => {
                setResponse(result);
                reject(objectStore.error);
            };
        });
    };

    const deleteCommand = (table: string, key: string) => {
        if (!db) {
            return;
        }
        const transaction = db.transaction([table], "readwrite");
        transaction.oncomplete = (event :any) => {
            setResponse(event);
        };
          
        transaction.onerror = (event: any) => {
            setResponse(event);
        };
        const objectStore = transaction.objectStore(table).delete(key);
        objectStore.onsuccess = (event: any) => {
            setResponse(event);
        };
        objectStore.onerror = (event: any) => {
            setResponse(event);
        };
    };

    const connectIndexDB = () => {
        const request = window.indexedDB.open(INDEXD_DB_NAME, INDEXD_DB_VERSION);
        
        request.onupgradeneeded = (event) => {
            initTableMeta(event);
        };
        request.onerror = (event :any) => {
            setResponse(event);
        };
        request.onsuccess = (event :any) => {
            setResponse(event);
            setDB(event.target?.result);
        };
    };

    const initTableMeta = (event: any) => {
        const initDB = event.target.result;

        const configDataStore = initDB.createObjectStore("configData", { keyPath: "key" });
        configDataStore.createIndex("value", "value", { unique: false });

        const textDataStore = initDB.createObjectStore("textData", { keyPath: "uuid" });
        textDataStore.createIndex("text", "text", { unique: false });
        textDataStore.createIndex("speakText", "speakText", { unique: false });
        textDataStore.createIndex("romaText", "romaText", { unique: false });
        textDataStore.createIndex("title", "title", { unique: false });
        textDataStore.createIndex("tag", "tag", { unique: false });
        textDataStore.createIndex("about", "about", { unique: false });
        textDataStore.createIndex("order", "order", { unique: false });

        const tagDataStore = initDB.createObjectStore("tagData", { keyPath: "uuid" });
        tagDataStore.createIndex("name", "name", { unique: false });
        tagDataStore.createIndex("order", "order", { unique: false });
    };

    return (
        <ViewPage
            createCommand={createCommand}
            readCommand={readCommand}
            readAllCommand={readAllCommand}
            deleteCommand={deleteCommand}
            updateCommand={updateCommand}
            response={response}
            isConnection={isConnection}
        />
    );
};

export default IndexedDB;