var codes = {
    500: 'light-rain',
    501: 'moderate-rain',
    502: 'heavy-intensity-rain',
    503: 'very-heavy-rain',
    504: 'extreme-rain',
    511: 'freezing-rain',
    520: 'light-intensity-shower-rain',
    521: 'shower-rain',
    522: 'heavy-intensity-shower-rain',
    531: 'ragged-shower-rain',

    800: 'clear-sky',
    801: 'few-clouds',
    802: 'scattered-clouds',
    803: 'broken-clouds',
    804: 'overcast-clouds'
};

module.exports = {
    icon: function (code) {
        if (!codes[code]) {
            throw new Error('No icon defined for code "' + code + '"');
        }

        return codes[code];
    }
};