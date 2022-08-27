"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.sendToken = exports.getTokens = exports.generateAuthUrl = void 0;
var module_1 = require("module");
var require = module_1.createRequire(import.meta.url);
var google = require("@googleapis/calendar");
var server_mjs_1 = require("../env/server.mjs");
var oAuth2Client = new google.auth.OAuth2(server_mjs_1.env.GOOGLE_CONSENT_CLIENT_ID, server_mjs_1.env.GOOGLE_CONSENT_CLIENT_SECRET, "http://localhost:3000/prescription");
exports.generateAuthUrl = function () { return __awaiter(void 0, void 0, void 0, function () {
    var scopes, url;
    return __generator(this, function (_a) {
        scopes = [
            "https://www.googleapis.com/auth/calendar",
            "https://www.googleapis.com/auth/drive"
        ];
        url = oAuth2Client.generateAuthUrl({
            access_type: 'offline',
            scope: scopes
        });
        return [2 /*return*/, url];
    });
}); };
// export const getAuthenticateClient  = ()  => {
//     return new Promise((resolve, reject) => {
//         const oAuth2Client = new OAuth2Client(
//             keys.web.client_id,
//             keys.web.client_secret,
//             keys.web.redirect_uris[0]
//         );
//         const scopes = [
//             "https://www.googleapis.com/auth/calendar",
//             "https://www.googleapis.com/auth/drive"
//         ];
//         const authorizeUrl = oAuth2Client.generateAuthUrl({
//             access_type: 'offline',
//             scope: scopes
//         })
//     })
// }
exports.getTokens = function (token) {
    if (token === void 0) { token = undefined; }
    return __awaiter(void 0, void 0, void 0, function () {
        var tokens;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!token) return [3 /*break*/, 2];
                    return [4 /*yield*/, oAuth2Client.getToken(token)];
                case 1:
                    tokens = (_a.sent()).tokens;
                    oAuth2Client.setCredentials(tokens);
                    oAuth2Client.on('tokens', function (tokens) {
                        if (tokens.refresh_token) {
                            // store the refresh_token in my database!
                            console.log(tokens.refresh_token);
                        }
                        console.log(tokens.access_token);
                    });
                    _a.label = 2;
                case 2: return [2 /*return*/];
            }
        });
    });
};
exports.sendToken = function (token) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, fetch("api/getCredentials", {
                    method: "POST",
                    mode: "cors",
                    credentials: 'same-origin',
                    body: JSON.stringify(token)
                })];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
