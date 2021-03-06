var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var taskSchema = new Schema({
    ID: Number,
    TKName: {type: String, required: '{PATH} is required!'},
    TKTarg: {type: Date, required: '{PATH} is required!'},
    TKComp: {type: Date},
    TKChamp: {type: String, required: '{PATH} is required!'},
    TKStat: {type: Number, required: '{PATH} is required!'},
    TKCapa: {type: Number, required: '{PATH} is required!'},
    DevId: {type: String, required: '{PATH} is required!'},
    TKComment: String,
    TKChampNew: {type: Boolean, default: false}
});

var Task = mongoose.model('Task', taskSchema);/**
 * Created by dpoulson on 2/05/2014.
 */
