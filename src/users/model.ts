import { model,Schema } from 'mongoose';

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
});

userSchema.set('toJSON', {
  transform: function(doc, user) {
    user.userId = user._id;
    delete user._id;
    delete user.__v;
  },
});

export const User = model('User', userSchema);
