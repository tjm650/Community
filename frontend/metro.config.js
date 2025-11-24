const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

// Get the default configuration
const config = getDefaultConfig(__dirname);

// Inject the custom base URL into the server config
// This overrides any potential issues with app.json not being fully respected
config.server = {
  // CRITICAL FIX: Ensures assets load from the subfolder
  publicPath: '/Community/'
};

// Configure path aliases for Metro bundler
config.resolver = {
  ...config.resolver,
  alias: {
    '@': path.resolve(__dirname, '.'),
  },
};

module.exports = config;
