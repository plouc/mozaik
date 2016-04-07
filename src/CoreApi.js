import Promise from 'bluebird';


/**
 * @param {Mozaik} mozaik
 */
const CoreApi = mozaik => {
    const methods = {
        inspector() {
            return Promise.resolve({
                apis:        mozaik.bus.listApis(),
                clientCount: mozaik.bus.clientCount(),
                uptime:      process.uptime()
            });
        },
    };

    return methods;
};


export default CoreApi;
