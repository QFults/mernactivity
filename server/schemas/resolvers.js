const { AuthenticationError } = require("apollo-server-express");
const { Profile } = require("../models");
const { signToken } = require("../utils/auth.js");

const resolvers = {
  Query: {
    profiles: async () => {
      return Profile.find();
    },

    profile: async (parent, { profileId }) => {
      return Profile.findOne({ _id: profileId });
    },
    me: async (parent, args, context) => {
      if (context.user) {
        return Profile.findOne({ _id: context.user._id });
      }
      throw new AuthenticationError("You need to be logged in!");
    },
  },

  Mutation: {
    addProfile: async (parent, { name, email, password }) => {
      const profile = await Profile.create({ name, email, password });
      const token = signToken(profile);
      return { token, profile };
    },
    login: async (parent, { email, password }) => {
      const profile = await Profile.findOne({ email });

      if (!profile) {
        throw new AuthenticationError("No profile with this email found!");
      }

      const correctPw = await profile.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect password!");
      }

      const token = signToken(profile);
      return { token, profile };
    },
    addSkill: async (parent, { profileId, skill }, context) => {
      if (context.user) {
        return Profile.findOneAndUpdate(
          { _id: profileId },
          {
            $addToSet: { skills: skill },
          },
          {
            new: true,
            runValidators: true,
          }
        );
      }

      throw new AuthenticationError("You need to be logged in!");
    },
    removeProfile: async (parent, { profileId }, context) => {
      if (context.user) {
        return Profile.findOneAndDelete({ _id: profileId });
      }

      throw new AuthenticationError("You need to be logged in!");
    },
    removeSkill: async (parent, { profileId, skill }, context) => {
      if (context.user) {
        return Profile.findOneAndUpdate(
          { _id: profileId },
          { $pull: { skills: skill } },
          { new: true }
        );
      }

      throw new AuthenticationError("You need to be logged in!");
    },
  },
};

module.exports = resolvers;
