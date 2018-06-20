import mongoose from 'mongoose';

const RequestSchema = mongoose.Schema({
    email: {
        type: String
    },
    message: {
        type: String
    }
}, { timestamps: true});

export default mongoose.model('request', RequestSchema);