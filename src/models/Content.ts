import mongoose from 'mongoose'

const contentSchema = new mongoose.Schema({
    Name:{
        type: String,
        required: true
    },
    Size:{
        type: String,
        required: true
    },
    Local:{
        type: String,
        required: true
    },
    Date:{
        type: String,
        required: true,
        default: Date.now
    }
},{versionKey:false})

const Content = mongoose.model('content', contentSchema)

export default Content