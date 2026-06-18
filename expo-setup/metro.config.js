// metro.config.js for Expo + Nativewind
const { getDefaultConfig } = require("expo/metro-config");
const { withMetroConfig } = require("nativewind/metro-config");

const config = getDefaultConfig(__dirname);

// Wrap Metro configuration with Nativewind CSS injection
module.exports = withMetroConfig(config, { 
  input: "./global.css" 
});
