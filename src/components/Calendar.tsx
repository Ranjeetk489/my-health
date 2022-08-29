import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from 'moment';
import { useEffect, useState } from "react";
import withDragAndDrop, { withDragAndDropProps } from 'react-big-calendar/lib/addons/dragAndDrop'
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import useSWR from 'swr'
import { useRouter } from "next/router";
import { trpc } from "../utils/trpc";
import {getCookie, getCookies, hasCookie} from "cookies-next";



const localizer = momentLocalizer(moment);

const MyCalendar = (props) => {
    const router = useRouter();
    
    const [authCode, setAuthCode] = useState("");
    const [token , setToken] = useState();
    const hello = trpc.useQuery(["example.hello", {text:"ranjeet"}])
    const {data, refetch ,isLoading, isFetching } = trpc.useQuery(["googleApi.consent"],  {enabled:false, refetchOnWindowFocus:false})
    const getTokens= trpc.useQuery(["googleApi.getTokens", {authCode}],  {enabled:false, refetchOnWindowFocus:false})
    const calEvents= trpc.useQuery(["googleApi.getEvents"],  {enabled:false, refetchOnWindowFocus:false, })
    
    useEffect(()=> {
        sendToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[authCode])
    

    if(data && !isFetching && !isLoading) {
        router.push(data); 
    }
    
    function sendToken() {
        const isAuthCode = router.asPath.match(/code=/);
        if(isAuthCode?.input && isAuthCode?.index)  {
            const authCodeStart = isAuthCode?.input.slice(isAuthCode?.index+5)
            const authCodeEnd = authCodeStart.match(/&scope/);
            const tempAuthCode:string = authCodeStart.slice(0, authCodeEnd?.index);

            setAuthCode(tempAuthCode);
            getTokens.refetch();
        }
    }
    

    // console.log(calEvents.);
    const [events, setEvents] = useState<Event[]>([
        {
            title: 'Learn cool stuff',
            start: new Date(),
            end: new Date(),
        },
    ])

    // const onEventResize: withDragAndDropProps['onEventResize'] = data => {
    //     const { start, end } = data

    //     setEvents(currentEvents => {
    //         const firstEvent = {
    //             start: new Date(start),
    //             end: new Date(end),
    //         }
    //         return [...currentEvents, firstEvent]
    //     })
    // }

    // const onEventDrop: withDragAndDropProps['onEventDrop'] = data => {
    //     console.log(data)
    // }

    return (
        <div>
            <DnDCalendar
                localizer={localizer}
                events={events}
                style={{ height: "60vh" }}
                className="w-[60vw] h-[60vh]"

            />
            <button onClick={() => refetch()}>Authorize</button>
            <button onClick= {() => calEvents.refetch()}>Fetch Events</button>
        </div>
    )
}


export const getServerSideProps = (context) => {
    console.log("cookies",getCookies())
}   



const DnDCalendar = withDragAndDrop(Calendar)

export default MyCalendar;