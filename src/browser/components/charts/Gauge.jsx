import React, { Component, PropTypes } from 'react';
import Pie                             from './Pie';


class Gauge extends Component {
    componentDidMount() {
        let { spacing, donutRatio, handAnchorRatio, handLengthRatio, transitionDuration } = this.props;

        this.pie = new Pie(React.findDOMNode(this.refs.svg), {
            spacing:            spacing,
            donutRatio:         donutRatio,
            handAnchorRatio:    handAnchorRatio,
            handLengthRatio:    handLengthRatio,
            transitionDuration: transitionDuration,
            gauge:              true,
            startAngle:         -120,
            endAngle:           120
        });
    }

    shouldComponentUpdate(data) {
        let { ranges, value } = data;

        let wrapper = React.findDOMNode(this);

        this.pie
            .size(wrapper.offsetWidth, wrapper.offsetHeight)
            .draw(ranges.map((range, i) => {
                return {
                    id:    i,
                    color: range.color,
                    count: i === 0 ? range.upperBound : (range.upperBound - ranges[i -1].upperBound)
                };
            }), value)
        ;

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

Gauge.propTypes = {
    spacing:            PropTypes.number.isRequired,
    donutRatio:         PropTypes.number.isRequired,
    handAnchorRatio:    PropTypes.number.isRequired,
    handLengthRatio:    PropTypes.number.isRequired,
    transitionDuration: PropTypes.number.isRequired,
    value:              PropTypes.number.isRequired,
    ranges:             PropTypes.arrayOf(PropTypes.shape({
        upperBound: PropTypes.number.isRequired,
        color:      PropTypes.string.isRequired
    })).isRequired
};

Gauge.defaultProps = {
    spacing:            0.1,
    donutRatio:         0.7,
    handAnchorRatio:    0.05,
    handLengthRatio:    0.85,
    transitionDuration: 600
};

export { Gauge as default };
