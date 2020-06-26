export const DASHBOARD_LOADED = "DASHBOARD_LOADED";

export function dashboardLoaded(loaded) {
    return {
        type: DASHBOARD_LOADED,
        loaded,
    };
}
