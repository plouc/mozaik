module.exports = {
    src:  './src/',
    dest: './build/',
    isProduction: function(file) {
        return process.env.NODE_ENV === 'production';
    }
};