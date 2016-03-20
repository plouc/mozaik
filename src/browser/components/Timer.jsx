import React, { Component, PropTypes } from 'react';
import reactMixin                      from 'react-mixin';
import { ListenerMixin }               from 'reflux';
import DashboardStore                  from './../stores/DashboardStore';


class Timer extends Component {
    constructor(props) {
        super(props);

        this.state = { completion: 0 };
    }

    componentWillMount() {
        this.listenTo(DashboardStore, this.onStoreUpdate);

        setInterval(() => {
            this.setState({
                completion: this.state.completion + 5
            });
        }, 5);
    }

    onStoreUpdate() {
        this.setState({ completion: 0 });
    }

    render() {
        const { completion } = this.state;
        const style = {
            width: `${completion / 200 * 100}%`
        };

        return (
            <div className="hotboard__timeline">
                <div className="hotboard__timeline__progress" style={style} />
            </div>
        );
    }
}

Timer.displayName = 'Timer';

reactMixin(Timer.prototype, ListenerMixin);


export default Timer;
