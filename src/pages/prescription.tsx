import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import MyCalendar from "../components/Calendar";
import Sidebar from "../components/Sidebar";
import { trpc } from "../utils/trpc";
import {sendToken, provideEvents} from "../utils/client/prescrption.utils";



const Prescription = (props) => {
    const router = useRouter();
    const [authCode, setAuthCode] = useState("");
    const [token , setToken] = useState();
    const hello = trpc.useQuery(["example.hello", {text:"ranjeet"}])
    const getConsentUrl = trpc.useQuery(["googleApi.consent"],  {enabled:false, refetchOnWindowFocus:false})
    const getTokens= trpc.useQuery(["googleApi.getTokens", {authCode}],  {enabled:false, refetchOnWindowFocus:false})
    const calEvents= trpc.useQuery(["googleApi.getEvents"],  {enabled:false, refetchOnWindowFocus:false, })
    const [events, setEvents] = useState<Event[]>();


    useEffect(()=> {
        //* function to extract and send authCode 
        sendToken(getTokens,setAuthCode,router);
        if(calEvents.data) {
             //* To fetch events on behalf of the user and setEvent state
            provideEvents(setEvents, calEvents);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[authCode,calEvents.data])
    

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