import React, { Component, PropTypes } from 'react';
import d3                              from 'd3';

// This component d3 code was heavily
// inspired from https://gist.github.com/mbostock/1346410

// This function can be shared across all instances
const pie = d3.layout.pie()
    .value(d => d.count)
    .sort(null)
;

// Return computed arc data key
function key(d) {
    return d.data.id;
}


// Try to get a neighbor arc, otherwise, returns null
function findNeighborArc(i, prevData, newData, key) {
    let d;
    return (d = findPreceding(i, prevData, newData, key)) ? { startAngle: d.endAngle,   endAngle: d.endAngle   }
         : (d = findFollowing(i, prevData, newData, key)) ? { startAngle: d.startAngle, endAngle: d.startAngle }
         : null;
}

// Find the element in prevData that joins the highest preceding element in newData.
function findPreceding(i, prevData, newData, key) {
    var m = prevData.length;
    while (--i >= 0) {
        var k = key(newData[i]);
        for (var j = 0; j < m; ++j) {
            if (key(prevData[j]) === k) {
                return prevData[j];
            }
        }
    }
}

// Find the element in prevData that joins the lowest following element in newData.
function findFollowing(i, prevData, newData, key) {
    var n = newData.length, m = prevData.length;
    while (++i < n) {
        var k = key(newData[i]);
        for (var j = 0; j < m; ++j) {
            if (key(prevData[j]) === k) return prevData[j];
        }
    }
}


class PieChart extends Component {
    componentDidMount() {
        console.log('PieChart.componentDidMount()');
        this.svg           = d3.select(React.findDOMNode(this.refs.svg));
        this.arcsContainer = this.svg.append('g').attr('class', 'arcs');
        this.paths         = this.arcsContainer.selectAll('path');
        this.shadow        = this.svg.append('g').attr('class', 'pie_shadow');
        this.shadowCircle  = this.shadow.append('circle');
    }

    d3Render(data) {
        if (!data) {
            return;
        }

        console.log('DATA', data);

        let { innerRadius, spacing, transitionDuration } = this.props;


        var prevData = this.paths.data();
        var newData  = pie(data);

        var wrapper = React.findDOMNode(this);
        var width   = wrapper.offsetWidth;
        var height  = wrapper.offsetHeight;

        this.svg.attr({
            width:  width,
            height: height
        });

        let minSize  = Math.min(width, height);
        let radius   = minSize / 2 - minSize * spacing;
        let radiusIn = radius * innerRadius;

        this.shadowCircle.attr('r', radiusIn + radius * (1 - innerRadius) / 4).attr('stroke-width', radius * (1 - innerRadius) / 2);
        this.arcsContainer.attr('transform', `translate(${ width / 2 },${ height / 2 })`);
        this.shadow.attr('transform', `translate(${ width / 2 },${ height / 2 })`);

        var arc = d3.svg.arc()
            .outerRadius(radius)
            .innerRadius(radiusIn)
        ;

        this.paths = this.paths.data(newData, key);

        this.paths.enter().append('path')
            .each(function (d, i) {
                this._current = findNeighborArc(i, prevData, newData, key) || d;
            })
            .attr('fill', d => d.data.color)
        ;

        // Store the displayed angles in _current.
        // Then, interpolate from _current to the new angles.
        // During the transition, _current is updated in-place by d3.interpolate.
        function arcTween(a) {
            var i = d3.interpolate(this._current, a);
            this._current = i(0);
            return function (t) {
                return arc(i(t));
            };
        }

        this.paths.exit()
            .datum(function (d, i) {
                return findNeighborArc(i, prevData, newData, key) || d;
            })
            .transition()
            .duration(transitionDuration)
            .attrTween('d', arcTween)
            .remove()
        ;

        this.paths.transition()
            .duration(transitionDuration)
            .attrTween('d', arcTween)
            .attr('fill', d => d.data.color)
        ;
    }

    shouldComponentUpdate(data) {
        this.d3Render(data.data);

        return false;
    }

    render() {
        return (
            <div className="pie_chart_wrapper">
                <svg ref="svg"/>
            </div>
        );
    }
}

PieChart.propTypes = {
    spacing:            PropTypes.number.isRequired,
    innerRadius:        PropTypes.number.isRequired,
    transitionDuration: PropTypes.number.isRequired,
    data:               PropTypes.arrayOf(PropTypes.shape({
        id:    PropTypes.isRequired,
        count: PropTypes.number,
        color: PropTypes.string
    })).isRequired
};

PieChart.defaultProps = {
    spacing:            0.1,
    innerRadius:        0,
    transitionDuration: 600,
    data:               []
};

export { PieChart as default };
