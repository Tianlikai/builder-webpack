const path = require("path");
const { rimraf } = require("rimraf");
const webpack = require("webpack");
const Mocha = require("mocha");

const mocha = new Mocha({
  timeout: "10000ms",
});

process.chdir(path.join(__dirname, "template"));

rimraf("./dist").then(() => {
  const prodConfig = require("../../lib/webpack.prod");
  webpack(prodConfig, (err, status) => {
    if (err) {
      console.log(err);
      process.exit(2);
    }

    console.log(
      status.toString({
        colors: true,
        modules: false,
        children: false,
      })
    );

    mocha.addFile(path.join(__dirname, "html-test.js"));
    mocha.addFile(path.join(__dirname, "css-js-test.js"));
    mocha.run();
  });
});
