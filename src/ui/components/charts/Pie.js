import React, { Component, PropTypes } from 'react'
import PieLegends                      from './PieLegends'
import PieCount                        from './PieCount'
import PieChart                        from './PieChart'


class Pie extends Component {
    render() {
        const { data, spacing, innerRadius, transitionDuration, count, countUnit, countLabel } = this.props

        let overlay = null
        if (count !== undefined) {
            overlay = (
                <div className="pie_overlay">
                    <PieCount
                        count={count}
                        unit={countUnit}
                        label={countLabel}
                    />
                </div>
            )
        }

        return (
            <div className="pie">
                <div className="pie_chart" ref="wrapper">
                    <PieChart
                        data={data}
                        spacing={spacing}
                        innerRadius={innerRadius}
                        transitionDuration={transitionDuration}
                    />
                    {overlay}
                </div>
                <PieLegends legends={data}/>
            </div>
        )
    }
}

Pie.propTypes = {
    count:              PropTypes.number,
    countUnit:          PropTypes.string,
    countLabel:         PropTypes.string,
    spacing:            PropTypes.object.isRequired,
    innerRadius:        PropTypes.number.isRequired,
    transitionDuration: PropTypes.number.isRequired,
    data:               PropTypes.arrayOf(PropTypes.shape({
        id:    PropTypes.isRequired,
        count: PropTypes.number,
        color: PropTypes.string
    })).isRequired
}

Pie.defaultProps = {
    innerRadius:        0,
    transitionDuration: 600,
    data:               [],
    spacing:            {
        top:    30,
        right:  30,
        bottom: 30,
        left:   30
    }
}


export default Pie
