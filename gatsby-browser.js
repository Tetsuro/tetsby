require('./src/stylesheets/wp-modifiers.scss');
require('./src/vendors/prism/prism.css');
require('./src/vendors/prism/prism-dark.css');
require('./src/vendors/prism/prism');

exports.onRouteUpdate = () => {
  Prism.highlightAll();
};
