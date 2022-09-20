"use strict";
exports.__esModule = true;
var router_1 = require("next/router");
var react_1 = require("react");
var Calendar_1 = require("../components/Calendar");
var Sidebar_1 = require("../components/Sidebar");
var trpc_1 = require("../utils/trpc");
var prescrption_utils_1 = require("../utils/client/prescrption.utils");
var Prescription = function (props) {
    var router = router_1.useRouter();
    var _a = react_1.useState(""), authCode = _a[0], setAuthCode = _a[1];
    var _b = react_1.useState(), token = _b[0], setToken = _b[1];
    var getConsentUrl = trpc_1.trpc.useQuery(["googleApi.consent"], { enabled: false, refetchOnWindowFocus: false });
    var getTokens = trpc_1.trpc.useQuery(["googleApi.getTokens", { authCode: authCode }], { enabled: false, refetchOnWindowFocus: false });
    var calEvents = trpc_1.trpc.useQuery(["googleApi.getEvents"], { enabled: false, refetchOnWindowFocus: false });
    var _c = react_1.useState(), events = _c[0], setEvents = _c[1];
    var getHello = trpc_1.trpc.useQuery(['example.hello']);
    react_1.useEffect(function () {
        //* function to extract and send authCode 
        prescrption_utils_1.sendToken(getTokens, setAuthCode, router);
        // provideEvents(setEvents, calEvents);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [authCode]);
    // if(getTokens.isSuccess) {
    //     localStorage.setItem('tokens','true');
    // }
    if (getConsentUrl.data) {
        router.push(getConsentUrl.data);
    }
    return (React.createElement("div", { className: "flex gap-4" },
        React.createElement(Sidebar_1["default"], null),
        React.createElement("span", { className: "p-8 " },
            React.createElement(Calendar_1["default"], { events: events, getConsentUrl: getConsentUrl }))));
};
exports["default"] = Prescription;
