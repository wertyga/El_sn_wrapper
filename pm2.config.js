module.exports = {
    /**
     * Application configuration section
     * http://pm2.keymetrics.io/docs/usage/application-declaration/
     */
    apps : [
        {
            name      : 'foto',
            script    : './foto/server/index.js',
            env: {
                NODE_ENV: 'production'
            },
            env_production : {
                NODE_ENV: 'production'
            },
            node_args: ['--nouse-idle-notification', '--expose-gc']
        },
        {
            name      : 'crypto_signer_server',
            script    : './signer-server/server/index.js',
            env: {
                NODE_ENV: 'production'
            },
            env_production : {
                NODE_ENV: 'production'
            },
            node_args: ['--nouse-idle-notification', '--expose-gc']
        },
        {
            name      : 'crypto_signer-rabbitMQEmail',
            script    : './signer-server/server/rabbitMQ/receiveMQ.js',
            env: {
                NODE_ENV: 'production'
            },
            env_production : {
                NODE_ENV: 'production'
            }
        },
        {
            name      : 'crypto_signer-site',
            script    : './signer-site/server/index.js',
            env: {
                NODE_ENV: 'production'
            },
            env_production : {
                NODE_ENV: 'production'
            }
        }
    ]
};