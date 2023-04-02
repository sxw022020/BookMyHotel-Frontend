// format the `Date` object according to the specified format string
import { format } from 'date-fns';


// defind a URL that points to a local development server running on the same machine as the web application
// the server listens for incoming HTTP requests on port 8080
// this URL acts as the base URL for making API calls to the server
const domain = "http://localhost:8080";

interface Credentials {
    // represents a dictionary-like object (also called a map) that allows you to store and retrieve values using string keys. The type of the keys is string, and the type of the values is any, meaning that the values can be of any type.
    [key: string]: any;
}

interface Query {
    guest_number: number;
    // TODO: Replace 'any' with a more specific type if possible, e.g., Moment or Date
    checkin_date: Date;
    checkout_date: Date;
}

/**
 * 1. Login feature
 * 
 * @param credential 
 * @param asHost 
 * @returns Promise<any>
 */
export const login = async (credential: Credentials, asHost: boolean): Promise<any> => {
    // creation of loginUrl
    const loginUrl = `${domain}/authenticate/${asHost ? "host" : "guest"}`;

    // make a request to the URL with additional options
    const response = await fetch(loginUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },

        // converts a JavaScript object or value into a JSON-formatted string
        body: JSON.stringify(credential)
    });

    if (response.status !== 200) {
        throw Error("Fail to log in!");
    }
    return await response.json();
};

/**
 * 2. Registration feature
 * 
 * @param credential 
 * @param asHost 
 * @returns Promise<void>
 */
export const registeration = async (credential: Credentials, asHost: boolean): Promise<void> => {
    const registerationUrl = `${domain}/registration/${asHost ? "host" : "guest"}`;

    const response = await fetch(registerationUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(credential)
    });
    if (response.status !== 200) {
        throw Error("Fail to do registration!");
    }
};

/**
 * 3. "GetReservations" feature
 * @returns Promise<any> 
 */
export const getReservations = async (): Promise<any> => {
    // get token of the user
    const authToken = localStorage.getItem("authToken");
    // create url to get reservations
    const listReservationUrl = `${domain}/reservations`;

    const response = await fetch(listReservationUrl, {
        headers: {
            Authorization: `Bearer ${authToken}`,
        }
    });
    if (response.status !== 200) {
        throw Error("Fail to get reservation list!");
    }
    return await response.json();
};

/**
 * 4. "GetStaysByHost" feature 
 * @returns Promise<any>
 */
export const getStaysByHost = async (): Promise<any> => {
    const authToken = localStorage.getItem("authToken");
    const listStaysUrl = `${domain}/stays/`;
  
    const response = await fetch(listStaysUrl, {
        headers: {
            Authorization: `Bearer ${authToken}`,
        },
    });

    if (response.status !== 200) {
        throw Error("Fail to get stay list!");
    }
    return await response.json();
  };

export const searchStays = async (query: Query): Promise<any> => {
    const authToken = localStorage.getItem("authToken");
    // TODO: why there is "/" in the end?
    const searchStaysUrl = new URL(`${domain}/search/`);

    searchStaysUrl.searchParams.append("guest_number", query.guest_number.toString());
    searchStaysUrl.searchParams.append(
        "checkin_date",
        format(query.checkin_date, "YYYY-MM-DD")
    );
    searchStaysUrl.searchParams.append(
        "checkout_date",
        format(query.checkout_date, "YYYY-MM-DD")
    );
    searchStaysUrl.searchParams.append("lat", "37.65");
    searchStaysUrl.searchParams.append("lon", "-118.82");

    
}