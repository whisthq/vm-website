export const CREATE_DISK = "CREATE_DISK";
export const FETCH_DISKS = "FETCH_DISKS";
export const STORE_DISKS = "STORE_DISKS";
export const DISK_CREATING = "DISK_CREATING";
export const FETCH_DISK_ATTACH_STATUS = "FETCH_DISK_ATTACH_STATUS";
export const STORE_CURRENT_DISK = "STORE_CURRENT_DISK";
export const CHANGE_DISK_STATUS_MESSAGE = "CHANGE_DISK_STATUS_MESSAGE";
export const STORE_DISK_ATTACH_ID = "STORE_DISK_ATTACH_ID";

export function createDisk(location, vm_size, apps) {
    return {
        type: CREATE_DISK,
        location,
        vm_size,
        apps,
    };
}

export function fetchDisks(user) {
    return {
        type: FETCH_DISKS,
        user,
    };
}

export function storeDisks(disks) {
    return {
        type: STORE_DISKS,
        disks,
    };
}

export function diskCreating(disk_is_creating) {
    return {
        type: DISK_CREATING,
        disk_is_creating,
    };
}

export function fetchDiskAttachStatus(disk_attach_status_id) {
    return {
        type: FETCH_DISK_ATTACH_STATUS,
        disk_attach_status_id,
    };
}

export function storeCurrentDisk(current_disk) {
    return {
        type: STORE_CURRENT_DISK,
        current_disk,
    };
}

export function changeDiskStatusMessage(disk_creation_message) {
    return {
        type: CHANGE_DISK_STATUS_MESSAGE,
        disk_creation_message,
    };
}

export function storeDiskAttachID(disk_attach_status_id) {
    return {
        type: STORE_DISK_ATTACH_ID,
        disk_attach_status_id,
    };
}
