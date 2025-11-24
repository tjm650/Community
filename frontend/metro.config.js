const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

// Get the default Expo configuration
const config = getDefaultConfig(__dirname);

// --- CRITICAL GITHUB PAGES FIX ---
// This block forces the Metro bundler to generate index.html with asset links 
// prefixed by /Community/, resolving the 404 error for the JavaScript files.
config.server = {
  // Setting publicPath directly (may trigger the 'Unknown option' warning, but needed for coverage)
  publicPath: '/Community/', 
  
  // Setting publicPath within the transformer is often the key to bypassing the validator 
  // and ensuring the path is applied during 'expo export'.
  transformer: { 
    publicPath: '/Community/'
  }
};
// ---------------------------------

// Configure path aliases for Metro bundler (Your existing setup)
config.resolver = {
  ...config.resolver,
  alias: {
    '@': path.resolve(__dirname, '.'),
  },
};

module.exports = config;
