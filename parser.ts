export interface Rule {}

export function parseRules(input: Buffer, verbosely?: boolean): Rule[] {
  const log = function (...data: any[]) {
    if (verbosely ?? false) {
      console.log(...data);
    }
  };

  const lines = input.toString().split(/(?:\r\n|\r|\n)/g);

  const readLine = function (line: string): Rule | undefined {
    const trimmed = line.trim();

    // ! means comment
    if (trimmed.startsWith("!")) {
      return undefined;
    }

    // #%# rules are scripts that can't be run with the WKContentBlocker interface
    if (trimmed.indexOf("#%#") != -1) {
      log("- Discarded script rule:\n\t" + trimmed);
      return undefined;
    }

    const isNegation = trimmed.startsWith("@@");
    const ruleBody = isNegation ? trimmed.substring(2) : trimmed;

    const separatorPattern = /\|\||[^\w\d_\-\.%]/gi;
  };

  return [];
}
