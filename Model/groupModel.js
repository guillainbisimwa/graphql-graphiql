import mongoose from 'mongoose';

const groupSchema = new mongoose.Schema({
  nom: {
    type: String,
    required: true,
  },
  adresse: {
    type: String,
    required: true,
  }
});

const group = mongoose.model('group', groupSchema);

export default group;