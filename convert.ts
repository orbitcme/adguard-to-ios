import yargs from "yargs";
import fs from "fs";
import { parseRules, Rule } from "./parser";
import { encodeRules } from "./encoder";

const main = function () {
  const options: { input: string; output?: string; verbose?: boolean } = yargs
    .usage("Usage: -i <input-file> -o <output-file>")
    .option("v", {
      alias: "verbose",
      describe: "Whether to output verbose logs",
      type: "boolean",
      demandOption: false
    })
    .option("i", {
      alias: "input",
      describe: "Your input file in the AdGuard format",
      type: "string",
      demandOption: true
    })
    .option("o", {
      alias: "output",
      describe: "Your output location for the written JSON",
      type: "string",
      demandOption: false
    }).argv;

  console.log("Reading in input rules...");
  const inputBuffer = fs.readFileSync(options.input);
  const rules = parseRules(inputBuffer, options.verbose);
  console.log("Transforming to JSON...");
  const encoded = JSON.stringify(encodeRules(rules, options.verbose));
  console.log("Writing to disk...");
  fs.writeFileSync(options.output ?? "./output-rules.json", encoded);
  console.log("DONE!");
};

main();
