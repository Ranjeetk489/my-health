"use strict";
exports.__esModule = true;
exports.getServerSideProps = void 0;
var react_big_calendar_1 = require("react-big-calendar");
var moment_1 = require("moment");
var dragAndDrop_1 = require("react-big-calendar/lib/addons/dragAndDrop");
require("react-big-calendar/lib/addons/dragAndDrop/styles.css");
require("react-big-calendar/lib/css/react-big-calendar.css");
var cookies_next_1 = require("cookies-next");
var fc_1 = require("react-icons/fc");
var localizer = react_big_calendar_1.momentLocalizer(moment_1["default"]);
var MyCalendar = function (_a) {
    //TODO: implement another side modal showing upcoming events && recurring events
    var events = _a.events, getConsentUrl = _a.getConsentUrl;
    if (!events) {
        return (React.createElement("div", { className: "flex flex-col items-center justify-center relative w-[80vw] top-[30vh] left:[40vw]" },
            React.createElement("span", { className: "text-xl" }, "To access Prescription tracker, kindly allow us to access your calendar by clicking the button below"),
            React.createElement("button", { className: "flex items-center w-fit border border-black px-4 py-1 mt-6 hover:text-white hover:bg-black transition delay-200", onClick: getConsentUrl.refetch },
                React.createElement(fc_1.FcGoogle, { className: "mr-4" }),
                " Authorize My Health")));
    }
    return (React.createElement("div", null,
        React.createElement(DnDCalendar, { localizer: localizer, events: events, style: { height: "80vh" }, className: "w-[75vw]" }),
        React.createElement("button", { onClick: function () { return getConsentUrl.refetch; } }, "Fetch Events")));
};
exports.getServerSideProps = function (context) {
    console.log("cookies", cookies_next_1.getCookies());
};
var DnDCalendar = dragAndDrop_1["default"](react_big_calendar_1.Calendar);
exports["default"] = MyCalendar;
