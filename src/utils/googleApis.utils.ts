import { createRequire } from "module";
const require = createRequire(import.meta.url);
const google = require("@googleapis/calendar");
const calendar = google.calendar('v3');
import { env } from "../env/server.mjs";

//generates client to be used for interacting with googlepis
const oAuth2Client = new google.auth.OAuth2(
    env.GOOGLE_CONSENT_CLIENT_ID,
    env.GOOGLE_CONSENT_CLIENT_SECRET,
    "http://localhost:3000/prescription"
)


//Generates authentication url for the user
export const generateAuthUrl = async () => {
    //scopes client requires access to 
    const scopes = [
        "https://www.googleapis.com/auth/calendar",
        "https://www.googleapis.com/auth/drive"
    ];

    const url = oAuth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: scopes
    })

    return url;
}

//Generates access and refresh token from authentication code only once
//further calls will throw error 400
export const getTokens = async (authCode:string|undefined = undefined) => {
    console.log(authCode + "authcode");
    if(authCode) {
        try{
           
            const {tokens} = await oAuth2Client.getToken(authCode);
            console.log(tokens);
            return tokens;
        }
        catch(error) {
            return error;
        }
    }
}

//! to fix calendar ID by fetching calendar list first 
//! then searching for calendar name and updating calendarId
//Fetches all the events on behalf of user 
export const fetchEvents = async (token: string) =>  {
    //forms the client to intract with google server and perfroms authorization
    try {
    oAuth2Client.setCredentials({
        calendarId: 'primary',
        refresh_token: token,
    });
    //accesses all the events from specified calendar in client above
    const response = await calendar.events.list({
        auth: oAuth2Client,
        calendarId: 'primary',  
    })
    console.log(response);
    return response?.data.items;
}
    catch(error) {
        console.log(error);
    }
}   


