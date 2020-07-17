/* eslint-disable no-unused-vars */
const production = {
    url: {
        PRIMARY_SERVER: "https://cube-celery-vm.herokuapp.com",
    },
    stripe: {
        PUBLIC_KEY: "pk_live_XLjiiZB93KN0EjY8hwCxvKmB00whKEIj3U",
    },
    azure: {
        RESOURCE_GROUP: "Fractal",
    },
    new_server: false,
    features: {
        linux: false,
    },
};

const staging = {
    url: {
        PRIMARY_SERVER: "https://cube-celery-staging.herokuapp.com",
    },
    stripe: {
        PUBLIC_KEY: "pk_test_7y07LrJWC5LzNu17sybyn9ce004CLPaOXb",
    },
    azure: {
        RESOURCE_GROUP: "FractalStaging",
    },
    new_server: false,
    features: {
        linux: false,
    },
};

const staging4 = {
    url: {
        PRIMARY_SERVER: "https://cube-celery-staging4.herokuapp.com",
    },
    stripe: {
        PUBLIC_KEY: "pk_test_7y07LrJWC5LzNu17sybyn9ce004CLPaOXb",
    },
    azure: {
        RESOURCE_GROUP: "FractalStaging",
    },
    new_server: true,
    features: {
        linux: true,
    },
};

const development = {
    url: {
        PRIMARY_SERVER: "http://localhost:7730",
    },
    stripe: {
        PUBLIC_KEY: "pk_test_7y07LrJWC5LzNu17sybyn9ce004CLPaOXb",
    },
    azure: {
        RESOURCE_GROUP: "FractalStaging",
    },
    new_server: true,
    features: {
        linux: true,
    },
};

export const config =
    process.env.NODE_ENV === "development" ? development : staging;

export const GOOGLE_CLIENT_ID =
    "581514545734-7k820154jdfp0ov2ifk4ju3vodg0oec2.apps.googleusercontent.com";
