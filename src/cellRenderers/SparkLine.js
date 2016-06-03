'use strict';

var CellRenderer = require('./CellRenderer');

/**
 * @constructor
 */
var SparkLine = CellRenderer.extend('SparkLine', {

    /**
     * @desc A simple implementation of a sparkline.  see [Edward Tufte sparkline](http://www.edwardtufte.com/bboard/q-and-a-fetch-msg?msg_id=0001OR)
     * @param {CanvasGraphicsContext} gc
     * @param {object} config
     * @param {Rectangle} config.bounds - The bounding rect of the cell to be rendered.
     * @param config.x - The cell column position
     * @param config.y - The cell row position
     * @memberOf SparkLine.prototype
     */
    paint: function(gc, config) {
        var x = config.bounds.x,
            y = config.bounds.y,
            width = config.bounds.width,
            height = config.bounds.height;

        gc.beginPath();
        var val = this.config.value;
        if (!val || !val.length) {
            return;
        }
        var count = val.length;
        var eWidth = width / count;

        //var selColor = this.grid.resolveProperty('selectionRegionOverlayColor')

        var fgColor = this.config.isSelected ? 'blue' : 'red';
        if (this.config.backgroundColor || this.config.isSelected) {
            gc.fillStyle = this.config.isSelected ? 'blue' : this.config.backgroundColor;
            gc.fillRect(x, y, width, height);
        }
        gc.strokeStyle = fgColor;
        gc.fillStyle = fgColor;
        gc.beginPath();
        var prev;
        for (var i = 0; i < val.length; i++) {
            var barheight = val[i] / 110 * height;
            if (!prev) {
                prev = barheight;
            }
            gc.lineTo(x + 5, y + height - barheight);
            gc.arc(x + 5, y + height - barheight, 1, 0, 2 * Math.PI, false);
            x = x + eWidth;
        }
        this.config.minWidth = count * 10;
        gc.stroke();
        gc.closePath();
    }
});

module.exports = SparkLine;
