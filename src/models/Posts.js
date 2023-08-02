import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
  username: { type: String, required: true },
  profilePhoto: {
    type: String,
    default: function () {
      return `https://secure.gravatar.com/avatar/${this._id}?s=90&d=identification`;
    },
  },
});

UserSchema.set("toJSON", { getters: true });

UserSchema.options.toJSON.transform = (doc, ret) => {
  delete ret.__id;
  delete ret.__v;
  return ret;
};
