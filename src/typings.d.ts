/* A custom typings file is used to declare types that are created outside of angular application,
 * so the TypeScript compiler is aware of them and doesn't give you errors about unknown types.
 */

 // so the typescript compiler doesn't complain about the global config object
declare var config: any;
declare module "*.json" {
    const value: any;
    export default value;
}