const assert = require("assert");

describe("webpack common test case", () => {
  const commonConfig = require("../../lib/webpack.common");
  it("entry", () => {
    assert.equal(
      commonConfig.entry.main,
      "/Users/tianlikai/FE/builder-webpack-tlk/test/smoke/template/src/index.tsx"
    );
  });
});
