// Use CommonJS require below so we can dynamically import during build-time.
//Check the environment and use the appropriate store
if (process.env.NODE_ENV === "production") {
  module.exports = require("./configureStore.prod")
} else {
  module.exports = require("./configureStore.dev")
}
