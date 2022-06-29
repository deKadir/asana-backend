import mongoose from 'mongoose';
import { passwordToHash } from '../scripts/helpers/crypto.js';
const UserSchema = mongoose.Schema(
  {
    fullName: String,
    password: String,
    email: String,
    profileImage: String,
  },
  { timestamps: true, versionKey: false }
);
UserSchema.pre('save', function () {
  const hashedPassword = passwordToHash(this.password);
  this.password = hashedPassword;
});
export default mongoose.model('User', UserSchema);
