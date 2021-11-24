// Get the mongoose object
import mongoose from 'mongoose';

// Prepare to the database exercies_db in the MongoDB server running locally on port 27017
mongoose.connect(
    "mongodb://localhost:27017/Garden_Partner",
    { useNewUrlParser: true, useUnifiedTopology: true }
);

// Connect to to the database
const db = mongoose.connection;
// The open event is called when the database connection successfully opens
db.once("open", () => {
    console.log("Successfully connected to MongoDB using Mongoose!");
});

// Tell mongoose to create indexes, which help with faster querying
mongoose.set("useCreateIndex", true);

/**
 * Define the schema
 */
const plantSchema = mongoose.Schema({
    name: { type: String, required: true },
    details: { type: Number, required: true },
    planting: { type: String, required: true },
    harvesting: { type: String, required: true }

});

/**
 * Compile the model from the schema. This must be done after defining the schema.
 */
const Plant = mongoose.model("Plant", plantSchema);

/**
 * Create a plant
 * @param {String} name
 * @param {String} details
 * @param {String} planting
 * @param {String} harvesting
 * @returns A promise. Resolves to the JSON object for the document created by calling save
 */

/**
 * Retrive plant based on the filter, projection and limit parameters
 * @param {Object} filter
 * @param {String} projection
 * @param {Number} limit
 * @returns
 */
const findPlant = async (filter, projection, limit) => {
    const query = Plant.find(filter)
        .select(projection)
        .limit(limit);
    return query.exec();
}

/**
 * Find the plant with the given ID value
 * @param {String} _id
 * @returns
 */
const findPlantById = async (name) => {
    const query = Plant.findById(name);
    return query.exec();
}

/**
 * Replace the name, reps, weight, unit, and date properties of the plant with the id value provided
 * @param {String} _id
 * @param {String} name
 * @param {String} details
 * @param {String} planting
 * @param {String} harvesting
 * @returns A promise. Resolves to the number of documents modified
 */
const replacePlant = async (_id, name, details, planting, harvesting) => {
    const result = await Plant.replaceOne({ _id: _id }, { name: name, details: details, planting: planting, harvesting:harvesting});
    return result.nModified;
}


/**
 * Delete the plant with provided id value
 * @param {String} _id
 * @returns A promise. Resolves to the count of deleted documents
 */
const deleteById = async (_id) => {
    const result = await Plant.deleteOne({ _id: _id });
    // Return the count of deleted document. Since we called deleteOne, this will be either 0 or 1.
    return result.deletedCount;
}

export { deleteById, replacePlant, findPlantById, findPlant };
