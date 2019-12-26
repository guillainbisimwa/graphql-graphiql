import bcrypt from 'bcrypt';
import mongoose from 'mongoose';

const clientSchema = new mongoose.Schema({
  nom: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  sexe: {
    type: String,
    required: true,
  },
  adresse: {
    type: String,
    required: true,
  },
  id_group: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'group',
  },
});

clientSchema.pre('save', function() {
    const hashedPassword = bcrypt.hashSync(this.password, 12);
    this.password = hashedPassword;
  });

const client = mongoose.model('client', clientSchema);

export default client;