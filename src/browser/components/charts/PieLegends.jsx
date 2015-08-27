import React, { Component, PropTypes } from 'react';


class PieLegends extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let { legends } = this.props;

        let legendNodes = legends.map(legend => {
            return (
                <span key={legend.id} className="pie_legends_item">
                    <span className="pie_legends_item_color" style={{ background: legend.color }}/>
                    <span className="pie_legends_item_count">{ legend.count }</span>
                    {legend.label}
                </span>
            );
        });

        return (
            <div className="pie_legends">
                {legendNodes}
            </div>
        );

    }
}

PieLegends.propTypes = {
    legends: PropTypes.array.isRequired
};

export { PieLegends as default };
