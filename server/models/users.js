const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    required: true
  },
  password: {
    type: String,   
    required: true
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
  department: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'department'
  },
  lastLogin: {
    type: Date,
    default: Date.now()
  },
  bio: {
    degree: {
      type: String
    },
    description: {
      type: String
    },
    genre: {
      type: String
    },
    birthday: {
      type: Date
    },
    profileImage: {
      type: String
    }
  },
  socialProfile: {
    fbProfile: {
      type: String
    },
    twProfile: {
      type: String
    },
    gProfile: {
      type: String
    }
  },
  posts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'post'
  }],
  events: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'event'
  }]
}, 
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
  }
});

userSchema.pre('save', async function(next){
  try{
    // Generate a salt
    const salt = await bcrypt.genSalt(10);
    // Generate a password Hash (salt + hash)
    const passwordHash = await bcrypt.hash(this.password, salt)
    // Reassign hashed version over original, plain text password
    this.password = passwordHash;
    next();
  } catch(error) {
    next(error);
  }
});

userSchema.methods.isValidPassword = async function(newPassword){
  try{
    return await bcrypt.compare(newPassword, this.password);
  } catch(error) {
    throw new Error(error);
  }
}

// Create Model
const User = mongoose.model('user', userSchema);
// Export the Model
module.exports = User;