import { PlatformCommunicator } from "../../platform";
import { GitHubAPI } from "../GitHubAPI";
export declare const getAuthWhenUsingDangerJSApp: () => {
    appID: string;
    key: string;
    installID: string | undefined;
};
export declare const getCustomAppAuthFromEnv: () => {
    appID: string | undefined;
    key: string | undefined;
    installID: string | undefined;
};
/**
 * An object whose responsibility is to handle commenting on an issue
 * @param api
 */
export declare const GitHubChecksCommenter: (api: GitHubAPI) => PlatformCommunicator | undefined;
