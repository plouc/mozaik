import React, { Component, PropTypes } from 'react'
import { findDOMNode }                 from 'react-dom'
import Pie                             from './PieHelper'


class PieChart extends Component {
    componentDidMount() {
        let { innerRadius, spacing, transitionDuration } = this.props

        this.pie = new Pie(findDOMNode(this.refs.svg), {
            donutRatio:         innerRadius,
            spacing:            spacing,
            transitionDuration: transitionDuration
        })
    }

    shouldComponentUpdate(data) {
        if (!data.data) {
            return false
        }

        let wrapper = findDOMNode(this)

        this.pie
            .size(wrapper.offsetWidth, wrapper.offsetHeight)
            .draw(data.data)
        

        return false
    }

    render() {
        return (
            <div className="pie_chart_wrapper">
                <svg ref="svg"/>
            </div>
        )
    }
}

PieChart.propTypes = {
    spacing:            PropTypes.object.isRequired,
    innerRadius:        PropTypes.number.isRequired,
    transitionDuration: PropTypes.number.isRequired,
    data:               PropTypes.arrayOf(PropTypes.shape({
        id:    PropTypes.isRequired,
        count: PropTypes.number,
        color: PropTypes.string
    })).isRequired
}

PieChart.defaultProps = {
    spacing:            {},
    innerRadius:        0,
    transitionDuration: 600,
    data:               []
}

export { PieChart as default }
