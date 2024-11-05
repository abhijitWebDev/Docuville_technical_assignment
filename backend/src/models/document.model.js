import mongoose from 'mongoose';

const DocumentSchema = new mongoose.Schema({
    licenseNumber: {
        type: String,
        required: true,
        unique: true, // Assuming license numbers are unique
      },
      name: {
        type: String,
        required: true,
      },
      dateOfBirth: {
        type: Date,
        required: true,
      },
      issueDate: {
        type: Date,
        required: true,
      },
      expirationDate: {
        type: Date,
        required: true,
      },
      sex: {
        type: String,
        enum: ['M', 'F', 'Other'], // Assuming these are the possible values
        required: true,
      },
      class: {
        type: String,
        required: true,
      },
      donorStatus: {
        type: String,
        required: false, // Optional field
      },
      address: {
        type: String,
        required: false,
      },
      // Add other relevant fields as needed
});

const Document = mongoose.model('Document', DocumentSchema);

export default Document;
