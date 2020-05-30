export const ADD_STORAGE = "ADD_STORAGE";
export const ADD_STORAGE_STATUS = "ADD_STORAGE_STATUS";


export function addStorage(storage) {
    return {
        type: ADD_STORAGE,
        storage
    }
}

export function addStorageStatus(status) {
    return {
        type: ADD_STORAGE_STATUS,
        status
    }
}