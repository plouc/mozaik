module.exports = {
    api: {
        github: {
            token: 'my-github-token'
        },
        jenkins: {
            baseUrl: 'https://my-jenkins.com',
            auth: {
                user:     'me',
                password: 'me'
            }
        },
        aws: {
            region: 'eu-west-1'
        }
    },
    rotationDuration: 10000,
    dashboards: [
        {
            columns: 3,
            rows:    2,
            widgets: [
                {
                    type: 'jenkins.job_build_durations',
                    job: 'my-job',
                    columns: 1, rows: 1,
                    x: 0, y: 0
                },
                {
                    type: 'jenkins.job_build_durations',
                    job: 'my-job',
                    columns: 1, rows: 1,
                    x: 0, y: 1
                },
                {
                    type: 'jenkins.jobs',
                    columns: 1, rows: 2,
                    x: 1, y: 0
                },
                {
                    type: 'jenkins.job_build_durations',
                    job: 'my-job',
                    columns: 1, rows: 1,
                    x: 2, y: 0
                },
                {
                    type: 'jenkins.job_build_durations',
                    job: 'my-job',
                    columns: 1, rows: 1,
                    x: 2, y: 1
                }
            ]
        },
        {
            columns: 3,
            rows:    2,
            widgets: [
                {
                    type: 'jenkins.jobs',
                    columns: 2, rows: 1,
                    x: 0, y: 0
                },
                {
                    type: 'jenkins.job_builds',
                    columns: 2, rows: 1,
                    x: 0, y: 1
                },
                {
                    type: 'aws.stacks',
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
                    type: 'jenkins.job_build_durations',
                    job: 'my-job',
                    columns: 1, rows: 1,
                    x: 0, y: 0
                },
                {
                    type: 'aws.stacks',
                    columns: 1, rows: 1,
                    x: 0, y: 1
                },
                {
                    type: 'github.pull_requests',
                    repository: 'plouc/mozaik',
                    columns: 1, rows: 1,
                    x: 1, y: 0
                },
                {
                    type: 'github.pull_requests',
                    repository: 'plouc/thumbor-toy',
                    columns: 1, rows: 1,
                    x: 1, y: 1
                },
                {
                    type: 'jenkins.jobs',
                    columns: 1, rows: 1,
                    x: 2, y: 0
                },
                {
                    type: 'aws.instances',
                    columns: 1, rows: 1,
                    x: 2, y: 1
                }
            ]
        }
    ]
};