import mongoose from 'mongoose';

import sendEmailRequest from '../common/functions/email';

const RequestSchema = mongoose.Schema({
    email: {
        type: String
    },
    message: {
        type: String
    }
}, { timestamps: true});

RequestSchema.post('save', function(doc) {
    sendEmailRequest(doc)
});

export default mongoose.model('request', RequestSchema);