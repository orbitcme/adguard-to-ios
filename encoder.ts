import { Rule } from "./parser";

export function encodeRules(rules: Rule[], verbosely?: boolean): Object {
  const log = function (...data: any[]) {
    if (verbosely ?? false) {
      console.log(...data);
    }
  };

  return {};
}
