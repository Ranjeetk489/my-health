import { createRequire } from "module";
const require = createRequire(import.meta.url);
const google = require("@googleapis/calendar");
const calendar = google.calendar('v3');
import { env } from "../env/server.mjs";

//generates client to be used for interacting with googlepis
const oAuth2Client = new google.auth.OAuth2(
    env.GOOGLE_CONSENT_CLIENT_ID,
    env.GOOGLE_CONSENT_CLIENT_SECRET,
    "https://3000-scottcoates-soloproject-yf30d7c0vrz.ws-us63.gitpod.io/prescription"
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
    if(authCode) {
        try{
            const {tokens} = await oAuth2Client.getToken(authCode);
            
            return tokens;
        }
        catch(error) {
            return error;
        }
    }
}

//! to fix calendar ID by fetching calendar list first 
//!and then searching for calendar name and updating calendarId
//Fetches all the events on behalf of user 
export const fetchEvents = async (token: string) =>  {
    //forms the client to intract with google server and perfroms authorization
    try {
    oAuth2Client.setCredentials({
        calendarId: 'oa8pgvt11je13mk6n7n0u969r8@group.calendar.google.com',
        refresh_token: token,
    });
    //accesses all the events from specified calendar in client above
    const response = await calendar.events.list({
        auth: oAuth2Client,
        calendarId: 'oa8pgvt11je13mk6n7n0u969r8@group.calendar.google.com',  
    })
    return response?.data.items;
}
    catch(error) {
        console.log(error);
    }
}   


