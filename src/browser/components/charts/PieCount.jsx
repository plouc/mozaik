import React, { Component, PropTypes } from 'react';


class PieCount extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let { count, unit, label } = this.props;

        let unitNode = null;
        if (unit !== undefined) {
            unitNode = <span className="pie_count_unit">{unit}</span>
        }

        let labelNode = null;
        if (label !== undefined) {
            labelNode = <span className="pie_count_label">{label}</span>
        }

        return (
            <div className="pie_count">
                <span className="pie_count_value">{count}</span>
                {unitNode}
                {labelNode}
            </div>
        );

    }
}

PieCount.propTypes = {
    count: PropTypes.number.isRequired,
    unit:  PropTypes.string,
    label: PropTypes.string
};

export { PieCount as default };
