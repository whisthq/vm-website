export async function apiPost(endpoint, body, token) {
    try {
        const response = await fetch(endpoint, {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + token,
            },
            body: JSON.stringify(body),
        });
        const json = await response.json();
        return { json, response };
    } catch (err) {
        console.log(err);
        return err;
    }
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
