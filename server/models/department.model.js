import mongoose from "mongoose";

const DepartmentSchema = new mongoose.Schema([{
    name: {
        type: String,
        trim: true,
        required: 'Department is required'
    },
    created: {
        type: Date,
        default: Date.now
    },
    created: {
        type: Date,
        default: Date.now
    }
}]);

export default mongoose.model('Department', DepartmentSchema);