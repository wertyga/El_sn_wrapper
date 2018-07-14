import path from 'path';

const env = process.env.NODE_ENV;
const dbName = 'crypto_signer';

export default {
    appHost: 'http://46.101.209.10:3006',
    thisHost: 'http://localhost:3005',
    PORT: env === 'test' ? 3001 : 3005,
    mongoose: {
        uri: `mongodb://localhost:27017/${env === 'test' ? dbName + '-test' : dbName}`,
        options: {
            server: {
                socketOptions: {
                    keepAlive: 1
                }
            }
        }
    },
    fieldToSaveSession: 'authUserId',
    session: {
        secret: "nodeJSForever",
        key: "sid",
        cookie: {
            secure: false,
            sameSite: true,
            httpOnly: true,
            maxAge: 3600000
        }
    },
    hash: {
        secret: 'boooom!',
        salt: 10
    },
    uploads: {
        directory: 'temp',
        destination: path.join(__dirname, '../', 'temp')
    },
    logFile: path.join(__dirname, '..', 'node.log')
}