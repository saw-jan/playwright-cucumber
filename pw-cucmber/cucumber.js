module.exports = {
  default: {
    // path to feature files
    paths: ["tests/**/*.feature"],
    // path to setup and step definitions
    require: ["tests/stepDefs/*.js", "tests/setup.js"],
    // retry times of failing tests
    retry: 0,
    // number of parallel test run
    parallel: 0,
    // test reports
    format: [
      "@cucumber/pretty-formatter",
      "html:tests/reports/report.html",
      "json:tests/reports/report.json",
    ],
  },
};
