import { GitHubPRDSL, GitHubUtilsDSL } from "./../../dsl/GitHubDSL";
import * as GitHub from "@octokit/rest";
declare const utils: (pr: GitHubPRDSL, api: GitHub) => GitHubUtilsDSL;
/** Generates the fileContents function, needed so that Peril can re-create this func for an event */
export declare const fileContentsGenerator: (api: GitHub, defaultRepoSlug: string, defaultRef: string) => (path: string, repoSlug?: string | undefined, ref?: string | undefined) => Promise<string>;
/** Generates the createUpdatedIssueWithID function, needed so that Peril can re-create this func for an event */
export declare const createUpdatedIssueWithIDGenerator: (api: GitHub) => (id: string, content: string, settings: {
    title: string;
    open: boolean;
    owner: string;
    repo: string;
}) => Promise<any>;
export default utils;
