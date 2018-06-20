import mongoose from 'mongoose';
import hash from 'password-hash';

import fetchFields from '../common/compileNeedFields';

import Pair from './pair';


let UserSchema = new mongoose.Schema({ //User Schema
    username: {
        type: String,
        require: true,
        unique: true
    },
    email: {
        type: String,
        require: true
    },
    hashPassword: {
        type: String,
        require: true
    },
    tradePairs: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'pair'
        }],
        default: []
    },
    isAuth: {
        type: Boolean,
        default: false
    },
    isCool: {
        type: Boolean,
        default: true
    },
    percents: {
        type: [{
            percentId: { type: mongoose.Schema.Types.ObjectId, ref: 'percent' },
            isSeen: { type: Boolean, default: false }
        }],
        default: []
    }
});

UserSchema.static('populateAllFields', function(searchFieldObj) { // Get all user fields e.g. user.tradePairs.populate('titleId') and user.percents
    return this.findOne(searchFieldObj)
        .populate('percents.percentId')
        .then(user => {
            if(!user) {
                return false;
            };
            return Pair.populateByTitle(user.tradePairs)
                .then(pairs => {
                    const notNullableTradePairs = pairs.filter(item => !!item);
                    const notNullablePercents = user.percents.filter(item => !!item.percentId);
                    let isModify = false;
                    if(notNullableTradePairs.length !== user.tradePairs.length) {
                        user.tradePairs = notNullableTradePairs.map(item => item._id);
                        isModify = true;
                    };
                    if(notNullablePercents.length !== user.percents.length) {
                        user.percents = notNullablePercents.map(item => ({ percentId: item._id, isSeen: item.isSeen }));
                        isModify = true;
                    };
                    if(isModify) {
                        return user.save()
                            .then(() => ({
                                ...userFields(user),
                                tradePairs: notNullableTradePairs,
                                percents: notNullablePercents
                            }));
                    } else {
                        return {
                            ...user._doc,
                            tradePairs: pairs
                        };
                    };
                })
        })
});

const UserModel = mongoose.model('user', UserSchema);

// Instance methods for password
const encryptPassword = function(password){
    return hash.generate(password);
};

UserSchema.virtual('password')
    .set(function(password){
        this.hashPassword = encryptPassword(password);
    })
// *********************************

export const userFields = (instance) => {
    const UserNeedFields = ['username', '_id', 'email', 'isCool'];
    return fetchFields(UserNeedFields, instance)
};

export default UserModel;