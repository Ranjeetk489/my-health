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
exports.googleApi = void 0;
var googleApis_utils_1 = require("../../../utils/googleApis.utils");
var context_1 = require("../context");
var zod_1 = require("zod");
var module_1 = require("module");
var require = module_1.createRequire(import.meta.url);
var cookie = require('cookie');
var gapiTokens = null;
exports.googleApi = context_1.createRouter()
    .query("consent", {
    resolve: function (_a) {
        var ctx = _a.ctx;
        return __awaiter(this, void 0, void 0, function () {
            var url;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, googleApis_utils_1.generateAuthUrl()];
                    case 1:
                        url = _b.sent();
                        return [2 /*return*/, url];
                }
            });
        });
    }
})
    .query("getTokens", {
    input: zod_1.z
        .object({
        authCode: zod_1.z.string()
    })
        .nullish(),
    resolve: function (_a) {
        var _b;
        var input = _a.input, ctx = _a.ctx;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (!!gapiTokens) return [3 /*break*/, 2];
                        return [4 /*yield*/, googleApis_utils_1.getTokens(input === null || input === void 0 ? void 0 : input.authCode)];
                    case 1:
                        gapiTokens = _c.sent();
                        console.log(gapiTokens);
                        return [2 /*return*/, ({
                                result: (_b = ctx.res) === null || _b === void 0 ? void 0 : _b.setHeader("Set-Cookie", [
                                    cookie.serialize('gapi_access', gapiTokens === null || gapiTokens === void 0 ? void 0 : gapiTokens.access_token, {
                                        httpOnly: true,
                                        secure: true,
                                        maxAge: 60 * 60,
                                        sameSite: 'strict'
                                    }),
                                    cookie.serialize('gapi_refresh', gapiTokens === null || gapiTokens === void 0 ? void 0 : gapiTokens.refresh_token, {
                                        httpOnly: true,
                                        secure: true,
                                        maxAge: 60 * 60 * 24 * 7,
                                        sameSite: 'strict'
                                    }),
                                ])
                            })];
                    case 2: return [2 /*return*/];
                }
            });
        });
    }
})
    .query("getEvents", {
    resolve: function (_a) {
        var _b, _c, _d, _e;
        var ctx = _a.ctx;
        return __awaiter(this, void 0, void 0, function () {
            var events;
            return __generator(this, function (_f) {
                switch (_f.label) {
                    case 0:
                        if (!((_c = (_b = ctx.req) === null || _b === void 0 ? void 0 : _b.cookies) === null || _c === void 0 ? void 0 : _c.gapi_refresh)) return [3 /*break*/, 2];
                        return [4 /*yield*/, googleApis_utils_1.fetchEvents((_e = (_d = ctx.req) === null || _d === void 0 ? void 0 : _d.cookies) === null || _e === void 0 ? void 0 : _e.gapi_refresh)];
                    case 1:
                        events = _f.sent();
                        if (events) {
                            return [2 /*return*/, events];
                        }
                        _f.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    }
});
