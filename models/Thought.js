const {model, Schema} = require('mongoose');
const dateFormat = require('../utils/dateFormat');
const reactionSchema = require('./Reaction');

// below is the same as the above 


const ThoughtSchema = new Schema( {
    thoughtText: { 
        type: String,
        required: true,
        minlength:1,
        maxlength:280,
    },
    createdAt: {
        type: Date, 
        default: Date.now,
        get: (timestamp) => dateFormat(timestamp)
    },
    username: {
        type : String,
        required: true,
    
    },
    reactions: [reactionSchema]
},
{
    toJSON: {
        getters: true,
    },

    id: false
},
);
ThoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
},

);
const Thought = model('Thought', ThoughtSchema);
module.exports = Thought;
//