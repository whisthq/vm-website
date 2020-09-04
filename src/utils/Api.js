import { config } from "utils/constants.js";

export function apiPost(endpoint, body, token) {
    // var base_url = 'https://cube-vm-server.herokuapp.com/form/store'
    // var full_url = `${base_url}${endpoint}`
    return fetch(endpoint, {
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
            "x-hasura-admin-secret": config.graphQL.SECRET,
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(body),
    }).then((response) => {
        return response.json().then((json) => ({ json, response }));
    });
}

export async function apiGet(endpoint, token) {
    try {
        const response = await fetch(endpoint, {
            method: "GET",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + token,
            },
        });
        const json = await response.json();
        return { json, response };
    } catch (err) {
        console.log(err);
        return err;
    }
}

export function format(fmt, ...args) {
    if (!fmt.match(/^(?:(?:(?:[^{}]|(?:\{\{)|(?:\}\}))+)|(?:\{[0-9]+\}))+$/)) {
        throw new Error("Invalid format string.");
    }
    return fmt.replace(
        /((?:[^{}]|(?:\{\{)|(?:\}\}))+)|(?:\{([0-9]+)\})/g,
        (m, str, index) => {
            if (str) {
                return str.replace(/(?:{{)|(?:}})/g, (m) => m[0]);
            } else {
                if (index >= args.length) {
                    throw new Error("Argument index is out of range in format");
                }
                return args[index];
            }
        }
    );
}
