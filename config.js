var config = {
    host: 'localhost',
    port: process.env.PORT || 5000,

    // Available themes:
    // + night-blue
    // + light-grey
    // + yellow
    // + light-yellow
    // + bordeau
    theme: 'bordeau',

    // clients configs
    api: {
        aws: {
            region: 'eu-west-1'
        },
        jenkins: {
            baseUrl: 'https://my-jenkins.com',
            auth: {
                user:     'me',
                password: 'me'
            }
        },
        github: {
            //token: 'my-github-token'
        },
        heroku: {
            apiToken: process.env.HEROKU_API_TOKEN
        }
    },

    // define duration beetwen each dashboard rotation (ms)
    rotationDuration: 8000,

    dashboards: [

        // first dashboard
        {
            // 4 x 3 dashboard
            columns: 4,
            rows:    3,
            widgets: [
                {
                    type: 'github.user_badge',
                    user: 'plouc',
                    columns: 1, rows: 2,
                    x: 0, y: 0
                },
                {
                    type: 'heroku.app_info',
                    app: 'mozaik',
                    columns: 1, rows: 1,
                    x: 2, y: 0
                },
                {
                    type: 'travis.repository',
                    owner: 'plouc',
                    repository: 'mozaik',
                    columns: 1, rows: 1,
                    x: 1, y: 0
                },
                {
                    type: 'travis.build_histogram',
                    owner: 'plouc',
                    repository: 'mozaik',
                    columns: 2, rows: 1,
                    x: 1, y: 1
                },
                {
                    type: 'time.clock',
                    columns: 1, rows: 1,
                    x: 3, y: 0
                },
                {
                    type: 'travis.build_history',
                    owner: 'plouc',
                    repository: 'mozaik',
                    columns: 1, rows: 2,
                    x: 3, y: 1
                },
                {
                    type: 'travis.build_histogram',
                    owner: 'plouc',
                    repository: 'go-gitlab-client',
                    columns: 2, rows: 1,
                    x: 0, y: 2
                },
                {
                    type: 'heroku.app_info',
                    app: 'protofight',
                    columns: 1, rows: 1,
                    x: 2, y: 2
                }
            ]
        },

        // second dashboard
        {
            // 3 x 2 dashboard
            columns: 3,
            rows:    2,
            widgets: [
                {
                    type: 'travis.build_history',
                    owner: 'plouc',
                    repository: 'mozaik',
                    columns: 1, rows: 2,
                    x: 0, y: 0
                },
                {
                    type: 'github.user_badge',
                    user: 'plouc',
                    columns: 1, rows: 1,
                    x: 2, y: 0
                },
                {
                    type: 'travis.repository',
                    owner: 'plouc',
                    repository: 'mozaik',
                    columns: 1, rows: 1,
                    x: 1, y: 0
                },
                {
                    type: 'travis.build_histogram',
                    owner: 'plouc',
                    repository: 'mozaik',
                    columns: 2, rows: 1,
                    x: 1, y: 1
                }
            ]
        }
    ]
};

module.exports = config;