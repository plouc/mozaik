import React, { Component, PropTypes } from 'react';


class InspectorItem extends Component {
    render() {
        const { label, icon, count } = this.props;

        return (
            <span className="label__group label__group--full">
                {count !== undefined && (
                    <span className="label__addon">
                        {count}
                    </span>
                )}
                <span className="label">
                    {label}
                </span>
                <span className="label__addon">
                    <i className={`fa fa-${icon}`} />
                </span>
            </span>
        );
    }
}

InspectorItem.displayName = 'InspectorItem';

InspectorItem.propTypes = {
    label: PropTypes.string.isRequired,
    icon:  PropTypes.string.isRequired,
    count: PropTypes.number
};


export default InspectorItem;
