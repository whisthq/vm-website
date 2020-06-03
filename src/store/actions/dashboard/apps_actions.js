export const INSTALL_APPS = "INSTALL_APPS";
export const FETCH_APP_INSTALL_STATUS = "FETCH_APP_INSTALL_STATUS";

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
