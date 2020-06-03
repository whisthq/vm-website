export const INSTALL_APPS = "INSTALL_APPS";
export const FETCH_APP_INSTALL_STATUS = "FETCH_APP_INSTALL_STATUS";
export const CHANGE_APP_INSTALL_STATUS_MESSAGE = "FETCH_APP_INSTALL_STATUS";
export const APPS_INSTALLING = "APPS_INSTALLING";

export function installApps(apps) {
    return {
        type: INSTALL_APPS,
        apps,
    };
}

export function fetchAppInstallStatus(app_install_status_id) {
    return {
        type: FETCH_APP_INSTALL_STATUS,
        app_install_status_id,
    };
}

export function changeAppInstallStatusMessage(app_install_message) {
    return {
        type: CHANGE_APP_INSTALL_STATUS_MESSAGE,
        app_install_message,
    };
}

export function appsInstalling(apps_are_installing) {
    return {
        type: APPS_INSTALLING,
        apps_are_installing,
    };
}
