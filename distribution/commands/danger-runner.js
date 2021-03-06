#! /usr/bin/env node
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
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var sharedDangerfileArgs_1 = require("./utils/sharedDangerfileArgs");
var nodeCleanup = require("node-cleanup");
var program = require("commander");
var debug_1 = require("../debug");
var getSTDIN = require("get-stdin");
var chalk_1 = require("chalk");
var inline_1 = require("../runner/runners/inline");
var file_utils_1 = require("./utils/file-utils");
var json_to_context_1 = require("../runner/json-to-context");
var d = debug_1.debug("runner");
// Given the nature of this command, it can be tricky to test, so I use a command like this:
//
// tslint:disable-next-line:max-line-length
//
// yarn build; cat source/_tests/fixtures/danger-js-pr-395.json | env DANGER_FAKE_CI="YEP" DANGER_TEST_REPO='danger/danger-js' DANGER_TEST_PR='395' node distribution/commands/danger-runner.js --text-only
//
// Which will build danger, then run just the dangerfile runner with a fixtured version of the JSON
program
    .usage("[options]")
    .description("Handles running the Dangerfile, expects a DSL from STDIN, which should be passed from `danger` or danger run`. You probably don't need to use this command.")
    // Because other calls will trigger this one,
    // and we don't want to keep a white/blacklist
    .allowUnknownOption(true);
var argvClone = process.argv.slice(0);
sharedDangerfileArgs_1.default(program).parse(argvClone);
d("Started Danger runner with " + program.args);
var foundDSL = false;
var runtimeEnv = {};
var run = function (jsonString) { return __awaiter(_this, void 0, void 0, function () {
    var dangerFile, context;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                d("Got STDIN for Danger Run");
                foundDSL = true;
                dangerFile = file_utils_1.dangerfilePath(program);
                return [4 /*yield*/, json_to_context_1.jsonToContext(jsonString, program)];
            case 1:
                context = _a.sent();
                return [4 /*yield*/, inline_1.default.createDangerfileRuntimeEnvironment(context)];
            case 2:
                runtimeEnv = _a.sent();
                d("Evaluating " + dangerFile);
                return [4 /*yield*/, inline_1.default.runDangerfileEnvironment([dangerFile], [undefined], runtimeEnv)];
            case 3:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
// Wait till the end of the process to print out the results. Will
// only post the results when the process has succeeded, leaving the
// host process to create a message from the logs.
nodeCleanup(function (exitCode, signal) {
    d("Process has finished with " + exitCode + " " + signal + ", sending the results back to the host process");
    if (foundDSL) {
        process.stdout.write(JSON.stringify(runtimeEnv.results, null, 2));
    }
});
// Add a timeout so that CI doesn't run forever if something has broken.
setTimeout(function () {
    if (!foundDSL) {
        console.error(chalk_1.default.red("Timeout: Failed to get the Danger DSL after 1 second"));
        process.exitCode = 1;
        process.exit(1);
    }
}, 1000);
// Start waiting on STDIN for the DSL
getSTDIN().then(run);
//# sourceMappingURL=danger-runner.js.map