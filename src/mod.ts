/**
 * React renderer for whitebox.
 *
 * @example Basic
 * ```tsx
 * import { template } from "@whitebox/react";
 *
 * @template(({ handleClick }) => <button onClick={handleClick} />)
 * class MyButton extends HTMLElement {
 *   handleClick = (): void => {
 *     console.log("clicked");
 *   };
 * }
 * ```
 *
 * @module
 */

export { template } from "./decorator.ts";
