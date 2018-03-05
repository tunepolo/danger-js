import { GitDSL } from "../dsl/GitDSL";
import { Platform } from "./platform";
export interface LocalGitOptions {
    base?: string;
    staged?: boolean;
}
export declare class LocalGit implements Platform {
    readonly options: LocalGitOptions;
    readonly name: string;
    private gitDiff;
    constructor(options: LocalGitOptions);
    getGitDiff(): Promise<string>;
    validateThereAreChanges(): Promise<boolean>;
    getPlatformDSLRepresentation(): Promise<any>;
    getPlatformGitRepresentation(): Promise<GitDSL>;
    supportsCommenting(): boolean;
    updateOrCreateComment(_newComment: string): Promise<boolean>;
    createComment(_comment: string): Promise<any>;
    deleteMainComment(): Promise<boolean>;
    editMainComment(_comment: string): Promise<boolean>;
    updateStatus(_success: boolean, _message: string): Promise<boolean>;
    getFileContents: (path: string) => Promise<string>;
}
