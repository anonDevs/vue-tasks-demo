const {model, Schema} = require('mongoose')

const taskSchema = new Schema({
    name: {
        type: String,
        required: true
    }
})

const Task = model('Task', taskSchema)

module.exports = Task