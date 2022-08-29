import { generateAuthUrl, getTokens, fetchEvents } from './../../../utils/googleApis';
import { createRouter } from '../context';
import {z} from "zod";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const cookie = require('cookie');

type gapiTokens = {
    access_token: string,
    refresh_token: string,
}

let gapiTokens: gapiTokens | null = null;

export const googleApi = createRouter()
    .query("consent", {
        async resolve({ctx}) {
            const url:string =  await generateAuthUrl();
            return url
        }
    })
    .query("getTokens", {
        input: z
      .object({
        authCode: z.string(),
      })
      .nullish(),
        async resolve ({input,ctx}) {
            if(!gapiTokens){
            console.log(input)
            gapiTokens = await getTokens(input?.authCode);
                console.log(gapiTokens)
                return ctx.res?.setHeader(
                    "Set-Cookie",
                 [
                    cookie.serialize(
                        'gapi_access', gapiTokens?.access_token, {
                            httpOnly: true,
                            secure:true,
                            maxAge: 60 * 60,
                            sameSite: 'strict',
                        }
                    ),
                    cookie.serialize(
                        'gapi_refresh', gapiTokens?.refresh_token, {
                            httpOnly: true,
                            secure:true,
                            maxAge: 60 * 60 * 24 * 7,
                            sameSite: 'strict',
                        }
                    ),
                 ])
            }
        }
    })
    .query("getEvents", {
        async resolve({ctx}){
            if(ctx.req?.cookies?.gapi_refresh){
                const events = await fetchEvents(ctx.req?.cookies?.gapi_refresh);
                if(events) {
                    return events;
                }
            }

        }
    })
