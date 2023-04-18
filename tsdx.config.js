module.exports = {
  // This function will run for each entry/format/env combination
  rollup(config, options) {
    options.minify = false;    
    return config
  }
}