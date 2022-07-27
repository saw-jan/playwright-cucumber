const {
  Before,
  BeforeAll,
  After,
  AfterAll,
  setDefaultTimeout,
} = require("@cucumber/cucumber");
const { chromium, firefox } = require("playwright");

// globals
global.browser = null;
global.context = null;
global.page = null;

setDefaultTimeout(60 * 1000);

const browserName = process.env.BROWSER || "chrome";
const enableTracing = process.env.ENABLE_TRACING === "true";
const enableVideo = process.env.ENABLE_VIDEO === "true";

let videoOption = {};
if (enableVideo) {
  videoOption = {
    recordVideo: {
      dir: "tests/reports/video",
    },
  };
}

const options = {
  // application base url
  baseURL: "https://google.com",
  // video recording options
  ...videoOption,
};

BeforeAll(async () => {
  const browserConfig = {
    slowMo: 0,
    headless: false,
  };

  global.browser = await {
    firefox: async () => await firefox.launch(browserConfig),
    chrome: async () =>
      await chromium.launch({ ...browserConfig, channel: "chrome" }),
  }[browserName]();
});

Before(async () => {
  global.context = await global.browser.newContext(options);
  global.page = await global.context.newPage();

  if (enableTracing) {
    // start tracing
    await global.context.tracing.start({
      screenshots: true,
      snapshots: true,
      sources: true,
    });
  }
});

After(async function ({ pickle }) {
  if (enableTracing) {
    // stop tracing
    await global.context?.tracing.stop({
      path: `tests/reports/tracing/tracing-${pickle.id}.zip`,
    });
  }

  await global.context.close();
});

AfterAll(() => global.browser && global.browser.close());
