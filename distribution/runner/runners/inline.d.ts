import { DangerResults } from "../../dsl/DangerResults";
import { DangerContext } from "../../runner/Dangerfile";
import { DangerRunner } from "./runner";
/**
 * Executes a Dangerfile at a specific path, with a context.
 * The values inside a Danger context are applied as globals to the Dangerfiles runtime.
 *
 * @param {DangerContext} dangerfileContext the global danger context
 */
export declare function createDangerfileRuntimeEnvironment(dangerfileContext: DangerContext): Promise<DangerContext>;
/**
 * Executes a Dangerfile at a specific path, with a context.
 * The values inside a Danger context are applied as globals to the Dangerfiles runtime.
 *
 * @param {string} filename the file path for the dangerfile
 * @param {string} originalContents optional, the JS pre-compiled
 * @param {DangerContext} environment the results of createDangerfileRuntimeEnvironment
 * @param {any | undefined} injectedObjectToExport an optional object for passing into default exports
 * @returns {DangerResults} the results of the run
 */
export declare const runDangerfileEnvironment: (filenames: string[], originalContents: (string | undefined)[], environment: DangerContext, injectedObjectToExport?: any) => Promise<DangerResults>;
declare const defaultExport: DangerRunner;
export default defaultExport;
