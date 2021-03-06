"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
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
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
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
Object.defineProperty(exports, "__esModule", { value: true });
var debug_1 = require("../../debug");
var v = require("voca");
var bitbucketServerTemplate_1 = require("../../runner/templates/bitbucketServerTemplate");
var fetch_1 = require("../../api/fetch");
function bitbucketServerRepoCredentialsFromEnv(env) {
    if (!env["DANGER_BITBUCKETSERVER_HOST"]) {
        throw new Error("DANGER_BITBUCKETSERVER_HOST is not set");
    }
    return {
        host: env["DANGER_BITBUCKETSERVER_HOST"],
        username: env["DANGER_BITBUCKETSERVER_USERNAME"],
        password: env["DANGER_BITBUCKETSERVER_PASSWORD"],
    };
}
exports.bitbucketServerRepoCredentialsFromEnv = bitbucketServerRepoCredentialsFromEnv;
/** This represent the BitBucketServer API */
var BitBucketServerAPI = /** @class */ (function () {
    function BitBucketServerAPI(repoMetadata, repoCredentials) {
        var _this = this;
        this.repoMetadata = repoMetadata;
        this.repoCredentials = repoCredentials;
        this.d = debug_1.debug("BitBucketServerAPI");
        this.getPullRequestsFromBranch = function (branch) { return __awaiter(_this, void 0, void 0, function () {
            var repoSlug, path, res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        repoSlug = this.repoMetadata.repoSlug;
                        path = "rest/api/1.0/" + repoSlug + "/pull-requests?at=refs/heads/" + branch + "&withProperties=false&withAttributes=false";
                        return [4 /*yield*/, this.get(path)];
                    case 1:
                        res = _a.sent();
                        throwIfNotOk(res);
                        return [4 /*yield*/, res.json()];
                    case 2: return [2 /*return*/, (_a.sent()).values];
                }
            });
        }); };
        this.getPullRequestInfo = function () { return __awaiter(_this, void 0, void 0, function () {
            var path, res, prDSL;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.pr) {
                            return [2 /*return*/, this.pr];
                        }
                        path = this.getPRBasePath();
                        return [4 /*yield*/, this.get(path)];
                    case 1:
                        res = _a.sent();
                        throwIfNotOk(res);
                        return [4 /*yield*/, res.json()];
                    case 2:
                        prDSL = (_a.sent());
                        this.pr = prDSL;
                        return [2 /*return*/, prDSL];
                }
            });
        }); };
        this.getPullRequestCommits = function () { return __awaiter(_this, void 0, void 0, function () {
            var path, res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        path = this.getPRBasePath() + "/commits";
                        return [4 /*yield*/, this.get(path)];
                    case 1:
                        res = _a.sent();
                        throwIfNotOk(res);
                        return [4 /*yield*/, res.json()];
                    case 2: return [2 /*return*/, (_a.sent()).values];
                }
            });
        }); };
        this.getStructuredDiff = function (base, head) { return __awaiter(_this, void 0, void 0, function () {
            var repoSlug, path, res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        repoSlug = this.repoMetadata.repoSlug;
                        path = "rest/api/1.0/" + repoSlug + "/compare/diff?withComments=false&from=" + base + "&to=" + head;
                        return [4 /*yield*/, this.get(path)];
                    case 1:
                        res = _a.sent();
                        throwIfNotOk(res);
                        return [4 /*yield*/, res.json()];
                    case 2: return [2 /*return*/, (_a.sent()).diffs];
                }
            });
        }); };
        this.getPullRequestDiff = function () { return __awaiter(_this, void 0, void 0, function () {
            var path, res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        path = this.getPRBasePath() + "/diff?withComments=false";
                        return [4 /*yield*/, this.get(path)];
                    case 1:
                        res = _a.sent();
                        throwIfNotOk(res);
                        return [4 /*yield*/, res.json()];
                    case 2: return [2 /*return*/, (_a.sent()).diffs];
                }
            });
        }); };
        this.getPullRequestComments = function () { return __awaiter(_this, void 0, void 0, function () {
            var path, res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        path = this.getPRBasePath() + "/activities?fromType=COMMENT";
                        return [4 /*yield*/, this.get(path)];
                    case 1:
                        res = _a.sent();
                        throwIfNotOk(res);
                        return [4 /*yield*/, res.json()];
                    case 2: return [2 /*return*/, (_a.sent()).values];
                }
            });
        }); };
        this.getPullRequestActivities = function () { return __awaiter(_this, void 0, void 0, function () {
            var path, res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        path = this.getPRBasePath() + "/activities?fromType=ACTIVITY";
                        return [4 /*yield*/, this.get(path)];
                    case 1:
                        res = _a.sent();
                        throwIfNotOk(res);
                        return [4 /*yield*/, res.json()];
                    case 2: return [2 /*return*/, (_a.sent()).values];
                }
            });
        }); };
        this.getIssues = function () { return __awaiter(_this, void 0, void 0, function () {
            var path, res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        path = this.getPRBasePath("jira") + "/issues";
                        return [4 /*yield*/, this.get(path)];
                    case 1:
                        res = _a.sent();
                        throwIfNotOk(res);
                        return [4 /*yield*/, res.json()];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        }); };
        this.getDangerComments = function (dangerID) { return __awaiter(_this, void 0, void 0, function () {
            var username, activities, dangerIDMessage, comments;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        username = this.repoCredentials.username;
                        return [4 /*yield*/, this.getPullRequestComments()];
                    case 1:
                        activities = _a.sent();
                        dangerIDMessage = bitbucketServerTemplate_1.dangerIDToString(dangerID);
                        comments = activities.map(function (activity) { return activity.comment; }).filter(Boolean);
                        return [2 /*return*/, comments
                                .filter(function (comment) { return v.includes(comment.text, dangerIDMessage); })
                                .filter(function (comment) { return username || comment.author.name === username; })
                                .filter(function (comment) { return v.includes(comment.text, bitbucketServerTemplate_1.dangerSignaturePostfix); })];
                }
            });
        }); };
        this.getDangerInlineComments = function (dangerID) { return __awaiter(_this, void 0, void 0, function () {
            var username, activities, dangerIDMessage, comments;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        username = this.repoCredentials.username;
                        return [4 /*yield*/, this.getPullRequestComments()];
                    case 1:
                        activities = _a.sent();
                        dangerIDMessage = bitbucketServerTemplate_1.dangerIDToString(dangerID);
                        comments = activities
                            .filter(function (activity) { return activity.commentAnchor; })
                            .map(function (activity) { return activity.comment; })
                            .filter(Boolean);
                        return [2 /*return*/, new Promise(function (resolve) {
                                resolve(comments
                                    .map(function (i) {
                                    return {
                                        id: i.id,
                                        ownedByDanger: i.author.name === username && i.text.includes(dangerIDMessage),
                                        body: i.text,
                                    };
                                })
                                    .filter(function (i) { return i.ownedByDanger; }));
                            })];
                }
            });
        }); };
        // The last two are "optional" in the protocol, but not really optional WRT the BBSAPI
        this.getFileContents = function (filePath, repoSlug, refspec) { return __awaiter(_this, void 0, void 0, function () {
            var path, res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        path = repoSlug + "/" + ("raw/" + filePath) + ("?at=" + refspec);
                        return [4 /*yield*/, this.get(path, undefined, true)];
                    case 1:
                        res = _a.sent();
                        if (res.status === 404) {
                            return [2 /*return*/, ""];
                        }
                        throwIfNotOk(res);
                        return [4 /*yield*/, res.text()];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        }); };
        this.postBuildStatus = function (commitId, payload) { return __awaiter(_this, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.post("rest/build-status/1.0/commits/" + commitId, {}, payload)];
                    case 1:
                        res = _a.sent();
                        throwIfNotOk(res);
                        return [4 /*yield*/, res.json()];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        }); };
        this.postPRComment = function (comment) { return __awaiter(_this, void 0, void 0, function () {
            var path, res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        path = this.getPRBasePath() + "/comments";
                        return [4 /*yield*/, this.post(path, {}, { text: comment })];
                    case 1:
                        res = _a.sent();
                        return [4 /*yield*/, res.json()];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        }); };
        this.postInlinePRComment = function (comment, line, type, filePath) { return __awaiter(_this, void 0, void 0, function () {
            var path, t, res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        path = this.getPRBasePath() + "/comments";
                        t = { add: "ADDED", normal: "CONTEXT", del: "REMOVED" }[type];
                        return [4 /*yield*/, this.post(path, {}, {
                                text: comment,
                                anchor: {
                                    line: line,
                                    lineType: t,
                                    fileType: "TO",
                                    path: filePath,
                                },
                            })];
                    case 1:
                        res = _a.sent();
                        if (!res.ok) return [3 /*break*/, 2];
                        return [2 /*return*/, res.json()];
                    case 2: return [4 /*yield*/, res.json()];
                    case 3: throw _a.sent();
                }
            });
        }); };
        this.deleteComment = function (_a) {
            var id = _a.id, version = _a.version;
            return __awaiter(_this, void 0, void 0, function () {
                var path, res;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            path = this.getPRBasePath() + "/comments/" + id + "?version=" + version;
                            return [4 /*yield*/, this.delete(path)];
                        case 1:
                            res = _b.sent();
                            if (!res.ok) {
                                throw new Error("Failed to delete comment \"" + id);
                            }
                            return [2 /*return*/];
                    }
                });
            });
        };
        this.updateComment = function (_a, comment) {
            var id = _a.id, version = _a.version;
            return __awaiter(_this, void 0, void 0, function () {
                var path, res;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            path = this.getPRBasePath() + "/comments/" + id;
                            return [4 /*yield*/, this.put(path, {}, {
                                    text: comment,
                                    version: version,
                                })];
                        case 1:
                            res = _b.sent();
                            if (!res.ok) return [3 /*break*/, 2];
                            return [2 /*return*/, res.json()];
                        case 2: return [4 /*yield*/, res.json()];
                        case 3: throw _b.sent();
                    }
                });
            });
        };
        // API implementation
        this.api = function (path, headers, body, method, suppressErrors) {
            if (headers === void 0) { headers = {}; }
            if (body === void 0) { body = {}; }
            if (_this.repoCredentials.username) {
                headers["Authorization"] = "Basic " + new Buffer(_this.repoCredentials.username + ":" + _this.repoCredentials.password).toString("base64");
            }
            var url = _this.repoCredentials.host + "/" + path;
            _this.d(method + " " + url);
            return _this.fetch(url, {
                method: method,
                body: body,
                headers: __assign({ "Content-Type": "application/json" }, headers),
            }, suppressErrors);
        };
        this.get = function (path, headers, suppressErrors) {
            if (headers === void 0) { headers = {}; }
            return _this.api(path, headers, null, "GET", suppressErrors);
        };
        this.post = function (path, headers, body, suppressErrors) {
            if (headers === void 0) { headers = {}; }
            if (body === void 0) { body = {}; }
            return _this.api(path, headers, JSON.stringify(body), "POST", suppressErrors);
        };
        this.put = function (path, headers, body) {
            if (headers === void 0) { headers = {}; }
            if (body === void 0) { body = {}; }
            return _this.api(path, headers, JSON.stringify(body), "PUT");
        };
        this.delete = function (path, headers, body) {
            if (headers === void 0) { headers = {}; }
            if (body === void 0) { body = {}; }
            return _this.api(path, headers, JSON.stringify(body), "DELETE");
        };
        // This allows Peril to DI in a new Fetch function
        // which can handle unique API edge-cases around integrations
        this.fetch = fetch_1.api;
    }
    BitBucketServerAPI.prototype.getPRBasePath = function (service) {
        if (service === void 0) { service = "api"; }
        var _a = this.repoMetadata, repoSlug = _a.repoSlug, pullRequestID = _a.pullRequestID;
        return "rest/" + service + "/1.0/" + repoSlug + "/pull-requests/" + pullRequestID;
    };
    return BitBucketServerAPI;
}());
exports.BitBucketServerAPI = BitBucketServerAPI;
function throwIfNotOk(res) {
    if (!res.ok) {
        var message = res.status + " - " + res.statusText;
        if (res.status >= 400 && res.status < 500) {
            message += " (Have you set DANGER_BITBUCKETSERVER_USERNAME and DANGER_BITBUCKETSERVER_PASSWORD?)";
        }
        throw new Error(message);
    }
}
//# sourceMappingURL=BitBucketServerAPI.js.map