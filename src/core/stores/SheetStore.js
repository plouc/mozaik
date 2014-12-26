var Reflux          = require('reflux');
var _               = require('lodash');
var config          = require('./../../../config');
var HotBoardActions = require('./../actions/HotBoardActions');

var _sheets       = [];
var _currentIndex = 0;

var SheetStore = Reflux.createStore({
    init: function () {
        this.listenTo(HotBoardActions.setSheets,     this.setSheets);
        this.listenTo(HotBoardActions.previousSheet, this.previousSheet);
        this.listenTo(HotBoardActions.nextSheet,     this.nextSheet);
        this.listenTo(HotBoardActions.startRotation, this.startRotation);
    },

    startRotation: function () {
        setInterval(function () {
            this.nextSheet();
        }.bind(this), config.rotationDuration);
    },

    previousSheet: function () {
        _currentIndex--;
        this.trigger(_currentIndex);
    },

    nextSheet: function () {
        if (_currentIndex < _sheets.length - 1) {
            _currentIndex++;
        } else {
            _currentIndex = 0;
        }

        this.trigger(_currentIndex);
    },

    setSheets: function (sheets) {
        _.forEach(sheets, function (sheet, index) {
            sheet.index = index;
        });

        _sheets       = sheets;
        _currentIndex = 0;

        this.trigger(_currentIndex);
    },

    currentIndex: function () {
        return _currentIndex;
    }
});

module.exports = SheetStore;