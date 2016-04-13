import React, { Component, PropTypes } from 'react';
import Pie                             from './Pie';


class Gauge extends Component {
    componentDidMount() {
        const { spacing, donutRatio, handAnchorRatio, handLengthRatio, transitionDuration } = this.props;

        this.pie = new Pie(React.findDOMNode(this.refs.svg), {
            spacing,
            donutRatio,
            handAnchorRatio,
            handLengthRatio,
            transitionDuration,
            gauge:      true,
            startAngle: -120,
            endAngle:   120
        });
    }

    shouldComponentUpdate(data) {
        const { ranges, value } = data;
        const { enableLegends } = this.props;

        const wrapper = React.findDOMNode(this);
        let legends   = [];
        if (enableLegends) {
            legends = ranges.map((range, id) => ({
                id,
                label: range.upperBound,
                count: id === 0 ? range.upperBound : (range.upperBound - ranges[id -1].upperBound)
            }));
        }

        this.pie
            .size(wrapper.offsetWidth, wrapper.offsetHeight)
            .draw(
                ranges.map((range, id) => ({
                    id,
                    color: range.color,
                    count: id === 0 ? range.upperBound : (range.upperBound - ranges[id -1].upperBound)
                })),
                value,
                legends
            )
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
    spacing:            PropTypes.object.isRequired,
    donutRatio:         PropTypes.number.isRequired,
    handAnchorRatio:    PropTypes.number.isRequired,
    handLengthRatio:    PropTypes.number.isRequired,
    transitionDuration: PropTypes.number.isRequired,
    value:              PropTypes.number.isRequired,
    enableLegends:      PropTypes.bool.isRequired,
    ranges:             PropTypes.arrayOf(PropTypes.shape({
        upperBound: PropTypes.number.isRequired,
        color:      PropTypes.string.isRequired
    })).isRequired
};

Gauge.displayName = 'Gauge';

Gauge.defaultProps = {
    spacing:            {},
    donutRatio:         0.7,
    handAnchorRatio:    0.05,
    handLengthRatio:    0.85,
    transitionDuration: 600,
    enableLegends:      true
};


export default Gauge;
