import request from 'superagent-bluebird-promise';
import Promise from 'bluebird';


/**
 * @param {Mozaik} mozaik
 */
const CoreApi = mozaik => {
    const methods = {
        inspector() {
            return new Promise((resolve, reject) => {
                resolve({
                    apis:        mozaik.bus.listApis(),
                    clientCount: mozaik.bus.clientCount(),
                    uptime:      process.uptime()
                });
            });
        },
    };

    return methods;
};


export default CoreApi;
