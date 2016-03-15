import React, { Component, PropTypes } from 'react';
import ReactDOM                        from 'react-dom';
import Pie                             from './Pie';


class PieChart extends Component {
    componentDidMount() {
        let { innerRadius, spacing, transitionDuration } = this.props;

        this.pie = new Pie(ReactDOM.findDOMNode(this.refs.svg), {
            donutRatio:         innerRadius,
            spacing:            spacing,
            transitionDuration: transitionDuration
        });
    }

    shouldComponentUpdate(data) {
        if (!data.data) {
            return false;
        }

        let wrapper = ReactDOM.findDOMNode(this);

        this.pie
            .size(wrapper.offsetWidth, wrapper.offsetHeight)
            .draw(data.data)
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


export default PieChart;
