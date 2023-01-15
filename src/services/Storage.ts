import localForage from 'localforage';
import * as CordovaSQLiteDriver from 'localforage-cordovasqlitedriver';

export const storage = {
    get: async (key: string): Promise<any> => {
        const db = await dbPromise;
        return await db.getItem(key);
    },
    set: async (key: string, value: any): Promise<any> => {
        const db = await dbPromise;
        return await db.setItem(key, value);
    },
    remove: async (key: string): Promise<any> => {
        const db = await dbPromise;
        return await db.removeItem(key);
    },
    clear: async (): Promise<any> => {
        const db = await dbPromise;
        return await db.clear();
    },
    keys: async (): Promise<string[]> => {
        const db = await dbPromise;
        return await db.keys();
    },
    ready: (): Promise<any> => {
        return dbPromise;
    },
}

const dbPromise: Promise<LocalForage> = new Promise((resolve, reject) => {
    let db: LocalForage;
    let config = {
        name: '_potionoptimizerstorage',
        storeName: '_potionoptimizerkv',
        driverOrder: ['sqlite', 'indexeddb', 'websql', 'localstorage']
    }

    localForage.defineDriver(CordovaSQLiteDriver)
        .then(() => {
            db = localForage.createInstance(config);
        })
        .then(() => db.setDriver(getDriverOrder(config.driverOrder)))
        .then(() => {
            resolve(db);
        })
        .catch(reason => {
            reject(reason)
        });
});

const getDriverOrder = (driverOrder: string[]) => {
    return driverOrder.map((driver) => {
        switch(driver){
            case 'sqlite':
                return CordovaSQLiteDriver._driver;
            case 'indexeddb':
                return localForage.INDEXEDDB;
            case 'websql':
                return localForage.WEBSQL;
            case 'localstorage':
            default: 
                return localForage.LOCALSTORAGE;
        }
    });
}