import path from 'path';

const env = process.env.NODE_ENV;
const dbName = 'crypto_signer';
const PORT = 3006;

export default {
    appHost: 'http://46.101.209.10:3005',
    thisHost: `http://localhost:${PORT}`,
    PORT: env === 'test' ? 3001 : PORT,
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