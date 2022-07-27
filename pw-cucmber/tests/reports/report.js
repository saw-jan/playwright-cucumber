const reporter = require("cucumber-html-reporter");

const outputHtml = __dirname + "/report2.html";
const jsonFile = process.argv[2] || __dirname + "/report.json";

reporter.generate({
  theme: "hierarchy",
  jsonFile,
  output: outputHtml,
  reportSuiteAsScenarios: true,
  scenarioTimestamp: true,
  launchReport: true,
});
