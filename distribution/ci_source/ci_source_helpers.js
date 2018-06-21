"use strict";
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
var GitHubAPI_1 = require("../platforms/github/GitHubAPI");
var find = require("lodash.find");
var BitBucketServerAPI_1 = require("../platforms/bitbucket_server/BitBucketServerAPI");
/**
 * Validates that all ENV keys exist and have a length
 * @param {Env} env The environment.
 * @param {[string]} keys Keys to ensure existence of
 * @returns {bool} true if they exist, false if not
 */
function ensureEnvKeysExist(env, keys) {
    /*const hasKeys = keys.map((key: string): boolean => {
      return env.hasOwnProperty(key) && env[key] != null && env[key].length > 0
    });
    return !includes(hasKeys, false);*/
    return (keys
        .map(function (key) { return env.hasOwnProperty(key) && env[key] != null && env[key].length > 0; })
        .filter(function (x) { return x === false; }).length === 0);
}
exports.ensureEnvKeysExist = ensureEnvKeysExist;
/**
 * Validates that all ENV keys exist and can be turned into ints
 * @param {Env} env The environment.
 * @param {[string]} keys Keys to ensure existence and number-ness of
 * @returns {bool} true if they are all good, false if not
 */
function ensureEnvKeysAreInt(env, keys) {
    /*const hasKeys = keys.map((key: string): boolean => {
      return env.hasOwnProperty(key) && !isNaN(parseInt(env[key]))
    })
    return !includes(hasKeys, false);*/
    return (keys.map(function (key) { return env.hasOwnProperty(key) && !isNaN(parseInt(env[key])); }).filter(function (x) { return x === false; }).length ===
        0);
}
exports.ensureEnvKeysAreInt = ensureEnvKeysAreInt;
/**
 * Retrieves the current pull request open for this branch from an API
 * @param {Env} env The environment
 * @param {string} branch The branch to find pull requests for
 * @returns {number} The pull request ID, if any.  Otherwise 0 (Github starts from #1).
 * If there are multiple pull requests open for a branch, returns the first.
 */
function getPullRequestIDForBranch(metadata, env, branch) {
    return __awaiter(this, void 0, void 0, function () {
        var api_1, prs_1, token, api, prs, prForBranch;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!process.env["DANGER_BITBUCKETSERVER_HOST"]) return [3 /*break*/, 2];
                    api_1 = new BitBucketServerAPI_1.BitBucketServerAPI(metadata, BitBucketServerAPI_1.bitbucketServerRepoCredentialsFromEnv(env));
                    return [4 /*yield*/, api_1.getPullRequestsFromBranch(branch)];
                case 1:
                    prs_1 = _a.sent();
                    if (prs_1.length) {
                        return [2 /*return*/, prs_1[0].id];
                    }
                    return [2 /*return*/, 0];
                case 2:
                    token = env["DANGER_GITHUB_API_TOKEN"];
                    if (!token) {
                        return [2 /*return*/, 0];
                    }
                    api = new GitHubAPI_1.GitHubAPI(metadata, token);
                    return [4 /*yield*/, api.getPullRequests()];
                case 3:
                    prs = (_a.sent());
                    prForBranch = find(prs, function (pr) { return pr.head.ref === branch; });
                    if (prForBranch) {
                        return [2 /*return*/, prForBranch.number];
                    }
                    return [2 /*return*/, 0];
            }
        });
    });
}
exports.getPullRequestIDForBranch = getPullRequestIDForBranch;
//# sourceMappingURL=ci_source_helpers.js.map