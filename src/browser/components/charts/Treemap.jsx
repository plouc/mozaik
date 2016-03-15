import React, { Component, PropTypes } from 'react';
import ReactDOM                        from 'react-dom';
import d3                              from 'd3';


function position() {
    this.style('left',   d => `${d.x}px`                   )
        .style('top',    d => `${d.y}px`                   )
        .style('width',  d => `${Math.max(0, d.dx - 1)}px` )
        .style('height', d => `${Math.max(0, d.dy - 1)}px` )
    ;
}


class Treemap extends Component {
    static displayName = 'Treemap';

    static propTypes = {
        transitionDuration: PropTypes.number.isRequired,
        showCount:          PropTypes.bool.isRequired
    };

    static defaultProps = {
        transitionDuration: 800,
        showCount:          false
    };

    d3Render(data) {
        if (!data) {
            return;
        }

        var el = ReactDOM.findDOMNode(this);

        var width  = el.offsetWidth;
        var height = el.offsetHeight;

        var treemap = d3.layout.treemap()
            .size([width, height])
            .sticky(true)
            .value(d => d.count)
        ;

        var container = d3.select(el);

        var chunks = container.selectAll('.treemap__chunk')
            .data(treemap.nodes(data))
        ;

        var newChunks = chunks.enter().append('div')
            .attr('class', 'treemap__chunk')
            .call(position)
            .style('background', d => d.color)
            .append('span')
            .text(d => d.label)
        ;

        let { showCount, transitionDuration } = this.props;

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
        var style = {
            width:  '100%',
            height: '100%'
        };

        return (
            <div ref="container" className="treemap" style={style} />
        );
    }
}


export default Treemap;
