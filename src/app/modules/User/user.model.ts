/* eslint-disable @typescript-eslint/no-this-alias */
import bcrypt from 'bcrypt'
import moment from 'moment'
import jwt from 'jsonwebtoken'
import { Schema, model } from 'mongoose'
import config from '../../config'
import { UserStatus } from './user.constant'
import { TUser, UserModel } from './user.interface'

const userSchema = new Schema<TUser, UserModel>(
  {
    firstname: {
      type: String,
      required: true,
    },
    profileImage: {
      type: String,
    },
    isTrusted: {
      type: Boolean,
      defaultValue: false,
    },
    lastname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: 0,
    },
    needsPasswordChange: {
      type: Boolean,
      default: true,
    },
    passwordChangedAt: {
      type: Date,
    },
    role: {
      type: String,
      enum: ['superAdmin', 'tailor', 'admin', 'user'],
      default: 'tailor',
    },
    status: {
      type: String,
      enum: UserStatus,
      default: 'in-progress',
    },
    userMeasurement: {
      type: Schema.Types.ObjectId,
      ref: 'Measurement',
    },
    userSavedAddresses: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Address',
      },
    ],
    store: {
      type: String,
      ref: 'Store',
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
)

userSchema.pre('save', async function (next) {
  const user = this;
  // Only hash the password if it has been modified (or is new)
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(
      user.password,
      Number(config.bcrypt_salt_rounds),
    );
  }
  next();
});


// set '' after saving password
userSchema.post('save', function (doc, next) {
  doc.password = ''
  next()
})

userSchema.statics.isUserExistsByCustomId = async function (id: string) {
  return await User.findOne({ id }).select('+password')
}

userSchema.statics.isPasswordMatched = async function (
  plainTextPassword,
  hashedPassword,
) {
  return await bcrypt.compare(plainTextPassword, hashedPassword)
}

userSchema.statics.isJWTIssuedBeforePasswordChanged = function (
  passwordChangedTimestamp: Date,
  jwtIssuedTimestamp: number,
) {
  const passwordChangedTime =
    new Date(passwordChangedTimestamp).getTime() / 1000
  return passwordChangedTime > jwtIssuedTimestamp
}

userSchema.methods.createJwt = function () {
  const payload = {
    id: this._id,
    role: this.role,
    iat: moment().unix(),
    exp: moment().add(config.jwt_access_expires_in, 'minutes').unix(),
  }

  return jwt.sign(payload, config.jwt_access_secret as string)
}

export const User = model<TUser, UserModel>('User', userSchema)
