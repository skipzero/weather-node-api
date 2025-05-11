import mongoose, { Schema } from 'mongoose';

const userSchema = new Schema({
  userName: {
    type: String,
    trim: true,
    required: true,
  },
  // password to go here...
  name: {
    type: String,
    trim: true,
    required: true
  },
  email: {
    type: String,
    trim: true,
    required: true,
  },
    profile: {
      address: {
      type: String,
      trim: true,
      required: false,
    },
    phone: {
      type: Number,
      trim: true,
      required: false,
    },
  },
  signup_date: {
    type: Date,
    trim: true,
    required: true,
    default: Date.now
  },
  authentication: {
    password: {
      type: String,
      trim: true,
      required: true,
      select: false,
      salt: {
        type: String,
        select: false,
      },
      sessionToken: {
        type: String,
        select: false,
      },
    },
  }
})

export const UserModel = mongoose.model('user', userSchema, 'user')

export const getUserByEmail = async (email: string) => await UserModel.findOne({ email })
  .then((user) => user!.toObject()).catch((err) => {
    console.error('Error: finding user by email:', err);
    throw new Error('Error finding user by email');
  }
)

export const getUserBySessionToken = async (sessionToken: string) => await UserModel.findOne({ 
  'authentication.sessionToken': sessionToken 
})

export const getUserById = async (id: string) => await UserModel.findById(id)
  .then((user) => user!.toObject()).catch((err) => {
    console.error('Error finding user by id:', err);
    throw new Error('Error finding user by id');
  }
)

export const createUser = async (values: Record<string, any>) => await new UserModel(values)
  .save().then((user) => user.toObject()).catch((err) => {
    console.error('Error creating user:', err);
    throw new Error('Error creating user');
  }
)

export const deleteUserById = async (id: string) => await UserModel.findByIdAndDelete({ _id: id })
  .then((user) => user!.toObject()).catch((err) => {
    console.error('Error deleting user:', err);
    throw new Error('Error deleting user');
  }
)

export const updateUserById = async (id: string, values: Record<string, any>) => await UserModel.findByIdAndUpdate(id, values, { new: true })
  .then((user) => user!.toObject()).catch((err) => {
    console.error('Error updating user:', err);
    throw new Error('Error updating user');
  }
)