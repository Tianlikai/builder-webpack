module.exports = function (api) {
  api.cache(true);

  const presets = [
    [
      "@babel/preset-env",
      {
        include: ["@babel/plugin-transform-class-properties", { loose: true }],
      },
    ],
    "@babel/preset-react",
    "@babel/preset-typescript",
  ];

  const plugins = [
    ["@babel/plugin-proposal-decorators", { version: "legacy" }],
  ];

  return {
    presets,
    plugins,
  };
};
