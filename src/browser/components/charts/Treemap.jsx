import React, { Component, PropTypes } from 'react';
import d3                              from 'd3';


function position() {
    this.style('left',   d => `${d.x}px`                   )
        .style('top',    d => `${d.y}px`                   )
        .style('width',  d => `${Math.max(0, d.dx - 1)}px` )
        .style('height', d => `${Math.max(0, d.dy - 1)}px` )
    ;
}


class Treemap extends Component {
    d3Render(data) {
        if (!data) {
            return;
        }

        const el = React.findDOMNode(this);

        const width  = el.offsetWidth;
        const height = el.offsetHeight;

        const treemap = d3.layout.treemap()
            .size([width, height])
            .sticky(true)
            .value(d => d.count)
        ;

        const container = d3.select(el);

        const chunks = container.selectAll('.treemap__chunk')
            .data(treemap.nodes(data))
        ;

        const newChunks = chunks.enter().append('div')
            .attr('class', 'treemap__chunk')
            .call(position)
            .style('background', d => d.color)
            .append('span')
            .text(d => d.label)
        ;

        const { showCount, transitionDuration } = this.props;

        if (showCount === true) {
            newChunks.append('span')
                .attr('class', 'count')
                .text(d => d.count)
            ;
        }

        chunks
            .transition()
            .duration(transitionDuration)
            .call(position)
        ;
    }

    shouldComponentUpdate(data) {
        this.d3Render(data.data);

        return false;
    }

    render() {
        const style = {
            width:  '100%',
            height: '100%'
        };

        return (
            <div ref="container" className="treemap" style={style} />
        );
    }
}

Treemap.displayName = 'Treemap';

Treemap.propTypes = {
    transitionDuration: PropTypes.number.isRequired,
    showCount:          PropTypes.bool.isRequired
};

Treemap.defaultProps = {
    transitionDuration: 800,
    showCount:          false
};


export default Treemap;
