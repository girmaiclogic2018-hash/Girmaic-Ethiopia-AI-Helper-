// babel.config.js for Expo + Nativewind configuration
module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      // Nativewind CSS compiler babel plugin hook
      "nativewind/babel"
    ]
  };
};
