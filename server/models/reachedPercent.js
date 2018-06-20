import mongoose from 'mongoose';

import getNeedFields from '../common/compileNeedFields';

import User from './user';

const ReachedPercent = new mongoose.Schema({
    symbol: {
        type: String
    },
    interval: {
        type: String
    },
    high: Number,
    close: Number,
    percent: {
        type: Number
    },
    prevUpdate: {
        type: Date,
        default: new Date()
    }
}, { timestamps: true });

export const percentFields = (instance) => {
    const percentNeedFields = ['symbol', 'interval', 'high', 'close', 'percent', 'updatedAt', '_id'];
    return getNeedFields(percentNeedFields, instance)
};

export default mongoose.model('percent', ReachedPercent);