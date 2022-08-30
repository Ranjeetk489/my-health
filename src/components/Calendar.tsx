import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from 'moment';
import  { useEffect, useState } from "react";
import withDragAndDrop, { withDragAndDropProps } from 'react-big-calendar/lib/addons/dragAndDrop'
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { useRouter } from "next/router";
import { trpc } from "../utils/trpc";
import {getCookie, getCookies, hasCookie} from "cookies-next";
import { fetchEvents } from "../utils/googleApis.utils";
import { NextPage } from "next";
import { FcGoogle } from "react-icons/fc";


const localizer = momentLocalizer(moment);

const MyCalendar : NextPage<Props> = ({events,getConsentUrl}) => {
    const router = useRouter();
    const [authCode, setAuthCode] = useState("");
    const [token , setToken] = useState();
    const hello = trpc.useQuery(["example.hello", {text:"ranjeet"}])
    const {data, refetch ,isLoading, isFetching } = trpc.useQuery(["googleApi.consent"],  {enabled:false, refetchOnWindowFocus:false})
    const getTokens= trpc.useQuery(["googleApi.getTokens", {authCode}],  {enabled:false, refetchOnWindowFocus:false})
    const calEvents= trpc.useQuery(["googleApi.getEvents"],  {enabled:false, refetchOnWindowFocus:false, })
  


    //TODO: implement another side modal showing upcoming events && recurring events

    if(!events){
        return (
            <div className="flex flex-col items-center justify-center relative w-[80vw] top-[30vh] left:[40vw]">
                <span className="text-xl">To access Prescription tracker, kindly allow us to access your calendar by clicking the button below</span>
                <button className="flex items-center w-fit submit-btn mt-6" onClick = {getConsentUrl.refetch} ><FcGoogle className="mr-4"/> Authorize My Health</button>
            </div>
        )
    }

    return (
        <div>
            <DnDCalendar
                localizer={localizer}
                events={events}
                style={{ height: "80vh" }}
                className="w-[75vw]"

            />
            <button onClick= {() => getConsentUrl.refetch}>Fetch Events</button>
        </div>
    )
}


export const getServerSideProps = (context) => {
    console.log("cookies",getCookies())
}   



const DnDCalendar = withDragAndDrop(Calendar)

export default MyCalendar;