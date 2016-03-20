import Reflux           from 'reflux';
import ConfigActions    from './../actions/ConfigActions';
import DashboardActions from './../actions/DashboardActions';
import request          from 'superagent';


const ConfigStore = Reflux.createStore({
    listenables: ConfigActions,

    loadConfig() {
        request.get('/config')
            .end((err, res) => {
                if (err) {
                    console.error(err);
                }

                const config = res.body;

                this.trigger(config);

                DashboardActions.setDashboards(config.dashboards);
            })
        ;
    }
});


export default ConfigStore;
