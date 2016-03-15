import React, { Component, PropTypes } from 'react';
import ReactDOM                        from 'react-dom';
import BarChart                        from './BarChart';


class BarChartComponent extends Component {
    static displayName = 'BarChartComponent';

    static propTypes = {
        data:    PropTypes.arrayOf(PropTypes.shape({
            abscissValue:  PropTypes.number,
            ordinateValue: PropTypes.string
        })).isRequired,
        options: PropTypes.object.isRequired
    };

    static defaultProps = {
        data: []
    };

    componentDidMount() {
        let { options } = this.props;

        this.barChart = new BarChart(ReactDOM.findDOMNode(this.refs.svg), options);
    }

    shouldComponentUpdate(data) {
        if (!data.data) {
            return false;
        }

        let wrapper = ReactDOM.findDOMNode(this);

        this.barChart
            .size(wrapper.offsetWidth, wrapper.offsetHeight)
            .data(data.data)
            .draw()
        ;

        return false;
    }

    render() {
        return (
            <div className="bar-chart_wrapper">
                <svg ref="svg"/>
            </div>
        );
    }
}


export default BarChartComponent;
