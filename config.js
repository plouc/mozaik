module.exports = {
    host: 'localhost',
    port: process.env.PORT || 5000,
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
        }
    },
    rotationDuration: 4000,
    dashboards: [
        {
            columns: 3,
            rows:    2,
            widgets: [
                {
                    type: 'github.user_badge',
                    user: 'plouc',
                    columns: 1, rows: 1,
                    x: 0, y: 0
                },
                {
                    type: 'github.pull_requests',
                    repository: 'plouc/go-gitlab-client',
                    columns: 1, rows: 1,
                    x: 1, y: 1
                },
                {
                    type: 'travis.repository',
                    owner: 'plouc',
                    repository: 'mozaik',
                    columns: 1, rows: 1,
                    x: 0, y: 1
                },
                {
                    type: 'travis.build_histogram',
                    owner: 'plouc',
                    repository: 'mozaik',
                    columns: 1, rows: 1,
                    x: 1, y: 0
                },
                {
                    type: 'travis.build_history',
                    owner: 'plouc',
                    repository: 'mozaik',
                    columns: 1, rows: 2,
                    x: 2, y: 0
                }
            ]
        },
        {
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