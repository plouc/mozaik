module.exports = {
    host: 'localhost',
    port: 4000,
    api: {
        aws: {
            region: 'eu-west-1'
        }
    },
    rotationDuration: 8000,
    dashboards: [
        {
            columns: 2,
            rows:    2,
            widgets: [
                {
                    type: 'travis.repository',
                    owner: 'plouc',
                    repository: 'mozaik',
                    columns: 1, rows: 1,
                    x: 0, y: 0
                }
            ]
        }
    ]
};