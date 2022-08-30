export function sendToken(getTokens, setAuthCode, router) {
    const isAuthCode = router.asPath.match(/code=/);
    if (isAuthCode?.input && isAuthCode?.index) {
        const authCodeStart = isAuthCode?.input.slice(isAuthCode?.index + 5);
        const authCodeEnd = authCodeStart.match(/&scope/);
        const tempAuthCode: string = authCodeStart.slice(0, authCodeEnd?.index);
        setAuthCode(tempAuthCode);
        getTokens.refetch();
    }
}


export function provideEvents(setEvents, calEvents) {
    const cal = calEvents.data.map((event) => {
        //TODO: fix where event time is not provided
        return {
            title: event?.summary || "name not available",
            start: event?.start?.dateTime ? new Date(event?.start?.dateTime) : new Date(),
            end: event?.end?.dateTime ? new Date(event?.end?.dateTime) : new Date(),
        }
    })
    setEvents(cal)
}
