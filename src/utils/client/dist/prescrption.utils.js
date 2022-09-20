"use strict";
exports.__esModule = true;
exports.provideEvents = exports.sendToken = void 0;
function sendToken(getTokens, setAuthCode, router) {
    var isAuthCode = router.asPath.match(/code=/);
    if ((isAuthCode === null || isAuthCode === void 0 ? void 0 : isAuthCode.input) && (isAuthCode === null || isAuthCode === void 0 ? void 0 : isAuthCode.index)) {
        var authCodeStart = isAuthCode === null || isAuthCode === void 0 ? void 0 : isAuthCode.input.slice((isAuthCode === null || isAuthCode === void 0 ? void 0 : isAuthCode.index) + 5);
        var authCodeEnd = authCodeStart.match(/&scope/);
        var tempAuthCode = authCodeStart.slice(0, authCodeEnd === null || authCodeEnd === void 0 ? void 0 : authCodeEnd.index);
        console.log(tempAuthCode);
        setAuthCode(tempAuthCode);
        getTokens.refetch();
    }
}
exports.sendToken = sendToken;
function provideEvents(setEvents, calEvents) {
    var cal = calEvents.data.map(function (event) {
        var _a, _b, _c, _d;
        //TODO: fix where event time is not provided
        return {
            title: (event === null || event === void 0 ? void 0 : event.summary) || "name not available",
            start: ((_a = event === null || event === void 0 ? void 0 : event.start) === null || _a === void 0 ? void 0 : _a.dateTime) ? new Date((_b = event === null || event === void 0 ? void 0 : event.start) === null || _b === void 0 ? void 0 : _b.dateTime) : new Date(),
            end: ((_c = event === null || event === void 0 ? void 0 : event.end) === null || _c === void 0 ? void 0 : _c.dateTime) ? new Date((_d = event === null || event === void 0 ? void 0 : event.end) === null || _d === void 0 ? void 0 : _d.dateTime) : new Date()
        };
    });
    console.log(cal);
    setEvents(cal);
}
exports.provideEvents = provideEvents;
