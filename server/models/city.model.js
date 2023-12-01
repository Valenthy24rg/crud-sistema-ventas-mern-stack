import mongoose from "mongoose";

const CitySchema = new mongoose.Schema([{
    name: {
        type: String,
        trim: true,
        required: 'City is required'
    },

    department: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Department' }],
}]);

export default mongoose.model('City', CitySchema);