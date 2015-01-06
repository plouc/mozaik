var React            = require('react');
var Reflux           = require('reflux');
var _                = require('lodash');
var moment           = require('moment');
var ApiConsumerMixin = require('./../../../core/mixins/ApiConsumerMixin');

var Repository = React.createClass({
    mixins: [
        Reflux.ListenerMixin,
        ApiConsumerMixin
    ],

    propTypes: {
        owner:      React.PropTypes.string.isRequired,
        repository: React.PropTypes.string.isRequired
    },

    getInitialState() {
        return {
            repository: null
        };
    },

    getApiRequest() {
        return {
            id: 'travis.repository.' + this.props.owner + '.' + this.props.repository,
            params: {
                owner:      this.props.owner,
                repository: this.props.repository
            }
        };
    },

    onApiData(repository) {
        this.setState({
            repository: repository
        });
    },

    render() {

        var cssClasses = '';
        var infoNode   = null;

        if (this.state.repository) {

            var statusClass = '';
            if (this.state.repository.last_build_state === 'passed') {
                statusClass = 'fa fa-check txt--success';
            } else if (this.state.repository.last_build_state === 'started') {
                statusClass = 'fa fa-play-circle-o';
            }

            infoNode = (
                <div>
                    <div className="travis__repository__description">{this.state.repository.description}</div>
                    <ul className="list list--compact">
                        <li className="list__item">
                            <i className={statusClass} /> last build&nbsp;
                            <span className="prop__value">{this.state.repository.last_build_state}</span>
                        </li>
                        <li className="list__item">
                            <i className="fa fa-clock-o" />&nbsp;
                            last build <span className="prop__value">{moment(this.state.repository.last_build_started_at).fromNow()}</span>&nbsp;
                            in <span className="count">{this.state.repository.last_build_duration}s</span>
                        </li>
                        <li className="list__item">
                            <i className="fa fa-code" /> language:&nbsp;
                            <span className="prop__value">{this.state.repository.github_language}</span>
                        </li>
                    </ul>
                </div>
            );

            cssClasses = 'travis__repository--' + this.state.repository.last_build_state;
        }

        return (
            <div className={cssClasses}>
                <div className="widget__header">
                    <span className="travis__repository__slug">
                        <span className="widget__header__subject">{this.state.repository ? this.state.repository.slug : ''}</span>
                    </span>
                    <span className="widget__header__count">
                        {this.state.repository ? '#' + this.state.repository.last_build_number : ''}
                    </span>
                    <i className="fa fa-bug" />
                </div>
                <div className="widget__body">
                    {infoNode}
                </div>
            </div>
        );
    }
});

module.exports = Repository;