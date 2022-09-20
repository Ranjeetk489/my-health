import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from 'moment';
import  { useEffect, useState } from "react";
import withDragAndDrop, { withDragAndDropProps } from 'react-big-calendar/lib/addons/dragAndDrop'
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { useRouter } from "next/router";
import { trpc } from "../utils/trpc";
import {getCookie, getCookies, hasCookie} from "cookies-next";

import { NextPage } from "next";
import { FcGoogle } from "react-icons/fc";


const localizer = momentLocalizer(moment);

const MyCalendar : NextPage<Props> = ({events,getConsentUrl}) => {
    //TODO: implement another side modal showing upcoming events && recurring events

    if(!events){
        return (
            <div className="flex flex-col items-center justify-center relative w-[80vw] top-[30vh] left:[40vw]">
                <span className="text-xl">To access Prescription tracker, kindly allow us to access your calendar by clicking the button below</span>
                <button className="flex items-center w-fit border border-black px-4 py-1 mt-6 hover:text-white hover:bg-black transition delay-200" onClick = {getConsentUrl.refetch} ><FcGoogle className="mr-4"/> Authorize My Health</button>
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