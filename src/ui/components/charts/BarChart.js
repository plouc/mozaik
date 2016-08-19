import React, { Component, PropTypes } from 'react'
import { findDOMNode }                 from 'react-dom'
import BarChart                        from './BarChartHelper'


class BarChartComponent extends Component {
    componentDidMount() {
        let { options } = this.props

        this.barChart = new BarChart(findDOMNode(this.refs.svg), options)
    }

    shouldComponentUpdate(data) {
        if (!data.data) {
            return false
        }

        const wrapper = findDOMNode(this)

        this.barChart
            .size(wrapper.offsetWidth, wrapper.offsetHeight)
            .data(data.data)
            .draw()
        

        return false
    }

    render() {
        return (
            <div className="bar-chart_wrapper">
                <svg ref="svg"/>
            </div>
        )
    }
}

BarChartComponent.propTypes = {
    options: PropTypes.object.isRequired,
    data:    PropTypes.arrayOf(PropTypes.shape({
        abscissValue:  PropTypes.number,
        ordinateValue: PropTypes.string
    })).isRequired
}

BarChartComponent.defaultProps = {
    data: []
}


export default BarChartComponent
