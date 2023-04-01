// defind a URL that points to a local development server running on the same machine as the web application
// the server listens for incoming HTTP requests on port 8080
// this URL acts as the base URL for making API calls to the server
const domain = "http://localhost:8080";

interface Credentials {
    [key: string]: any;
}

interface Query {
    guest_number: number;
    // TODO: Replace 'any' with a more specific type if possible, e.g., Moment or Date
    checkin_date: any;
    checkout_date: any;
}

/**
 * 1. Login feature
 * 
 * @param credential 
 * @param asHost 
 * @returns Promise<any>
 */
export const login = (credential: Credentials, asHost: boolean): Promise<any> => {
    // creation of loginUrl
    const loginUrl = `${domain}/authenticate/${asHost ? "host" : "guest"}`;

    // make a request to the URL with additional options
    return fetch(loginUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },

        // converts a JavaScript object or value into a JSON-formatted string
        body: JSON.stringify(credential)
    }).then((response) => {
        if (response.status !== 200) {
            throw Error("Fail to log in!");
        }

        // returns a `Promise` that resolves to the `Response` object representing the response to the request
        // asking the `Response` object to parse the body text as JSON and return the resulting JavaScript object
        return response.json();
    });
};

export const register = (credential: Credentials, asHost: boolean) => {
    const registerUrl = 
}