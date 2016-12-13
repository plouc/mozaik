# Mozaïk v2

This release is a complete rewrite of Mozaïk.

It brings the following improvements:

- config is now yaml based and can be automatically reloaded on change
- You don't need to add a dependency to Mozaïk when developping extensions
- No more mixin for React components
- Replaced reflux by redux
- Upgraded React to v15
- Added ability to switch theme from the UI
- Moved to webpack
- Added ability to use hot reloading through webpack
- No more transpiler for server code (but require node 6+)
- Added cors support
- Moved to socket.io as the previous library were not really maintained
- Provides a way to display api errors
