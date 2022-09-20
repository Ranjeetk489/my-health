import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import MyCalendar from "../components/Calendar";
import Sidebar from "../components/Sidebar";
import { trpc } from "../utils/trpc";
import {sendToken, provideEvents, getEvents} from "../utils/client/prescrption.utils";
import { fetchEvents } from "../utils/googleApis.utils";
import { useOauthContext } from "../hooks/useOauth";
import { getEventListeners } from "events";



const Prescription = (props) => {

    // refactor this to custom hooks
    const router = useRouter();
    const [authCode, setAuthCode] = useState("");
    const [token , setToken] = useState();
    const getConsentUrl = trpc.useQuery(["googleApi.consent"],  {enabled:false, refetchOnWindowFocus:false})
    const getTokens= trpc.useQuery(["googleApi.getTokens", {authCode}],  {enabled:false, refetchOnWindowFocus:false})
    const calEvents= trpc.useQuery(["googleApi.getEvents"],  {enabled:false, refetchOnWindowFocus:false, })
    const isAuthorized = trpc.useQuery(["googleApi.isAuthorized"],  {enabled:true, refetchOnWindowFocus:true, })
    const [events, setEvents] = useState();


    const isAuthCode = router.asPath.match(/code=/);
    console.log(isAuthCode)
    
    useEffect(()=> {
        //* function to get the auth code from the url 
        //* to setRouterPath and generate tokens and fetch calendar events 
        getEvents(isAuthCode, setAuthCode, router,getTokens,calEvents,setEvents);

    },[isAuthCode])

    if(getConsentUrl.data) {
        router.push(getConsentUrl.data);
        
    }
    return (
        <div className= "flex gap-4">
            <Sidebar />
            <span className="p-8 ">
            <MyCalendar events={events} getConsentUrl={getConsentUrl}/>
            </span>
        </div>
    )
}

export default Prescription