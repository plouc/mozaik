//
// MOZAÏK {{ version }} config
//

// Load environment variables from .env file if available
require('dotenv').load();

module.exports = {
    env:        process.env.ENV || 'production',

    host:       'localhost',
    port:       process.env.PORT || 5000,

    dashboards: [
    ]
};