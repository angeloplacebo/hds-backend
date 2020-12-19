import mongoose from 'mongoose'

const HdSchema = new mongoose.Schema({
    Fabricante:{
        type: String,
        required: true
    },
    Modelo:{
        type: String,
        required: true
    },
    TAG:{
        type: String,
        required: true
    },
    PN:{
        type: String,
        required: true
    },
    SN:{
        type: String,
        required: true
    },
    Capacidade:{
        type: String,
        required: true
    },
    Local:{
        type: String,
        required: true
    }
},{ versionKey: false})

const Hd = mongoose.model('Hd', HdSchema)

export default Hd