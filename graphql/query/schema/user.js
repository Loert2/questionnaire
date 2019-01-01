import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInputObjectType
} from "graphql";

import {
  getUserById,
  getUserByLogin,
  addUser,
  changePassword,
  changeName
} from "../database/db-user";

import { nodeInterface } from "./node";

import { createMutation, createPayload } from "./utilities";

import { fromGlobalId, toGlobalId, globalIdField } from "graphql-relay";

import { ProjectConnection } from "./project";

// === === === === === === QUERY === === === === === ===

export const UserType = new GraphQLObjectType({
  description: "Current user",
  name: "User",
  interfaces: [nodeInterface],
  fields: () => ({
    id: globalIdField(),
    full_name: {
      description: "User full_name",
      name: "full_name",
      type: GraphQLString
    },
    login: {
      description: "User e_mail",
      name: "e_mail",
      type: GraphQLString
    },
    project: ProjectConnection
  })
});

export const UserField = {
  type: UserType,
  resolve: async (obj, args, context) => {
    return await getUserById(context.userId);
  }
};

// === === === === === === MUTATIONS === === === === === ===

const userMutationPayload = createPayload({
  name: "UserMutationPayload",
  fields: () => ({
    user: { name: "User", type: UserType },
    error: { name: "Error", type: GraphQLString }
  })
});

// === === === === === === SIGN IN === === === === === ===

const signInInput = {
  name: "UserSignInInput",
  fields: () => ({
    login: { name: "e_mail", type: GraphQLString },
    password: { name: "password", type: GraphQLString }
  })
};

const signInResolve = async (obj, args, context) => {
  const id = context.userId;
  if (id) {
    return { error: "alreadySignedIn" };
  }
  const user = await getUserByLogin(args.login);
  if (user && user.password === args.password) {
    await context.setUserId(user.id);
    return { user };
  }
  return { error: "wrongCredantials" };
};

export const UserSignInField = createMutation({
  input: signInInput,
  payload: userMutationPayload,
  resolve: signInResolve
});

// === === === === === === SIGN UP === === === === === ===

const signUpInput = {
  name: "UserSignUpInput",
  fields: () => ({
    name: { name: "full_name", type: GraphQLString },
    login: { name: "e_mail", type: GraphQLString },
    password: { name: "password", type: GraphQLString }
  })
};

const signUpResolve = async (obj, args, context) => {
  const contextId = context.userId;
  const { e_mail, full_name, password } = args;

  if (contextId) {
    return { error: "alreadySignedIn" };
  }

  const signedUpUser = await getUserByLogin(args.e_mail);
  if (signedUpUser) {
    return { error: "e_mailAlreadyInUse" };
  }

  const id = await addUser({ e_mail, full_name, password });
  const user = await getUserById(id);
  await context.setUserId(user.id);

  return { user };
};

export const UserSignUpField = createMutation({
  input: signUpInput,
  payload: userMutationPayload,
  resolve: signUpResolve
});

// === === === === === === SIGN OUT === === === === === ===

const signOutInput = {
  name: "UserSignOutInput",
  fields: () => ({})
};

const signOutResolve = async (obj, args, context) => {
  const id = context.userId;
  if (!id) {
    return { error: "notSignedIn" };
  }
  await context.setUserId(null);
  return {};
};

export const UserSignOutField = createMutation({
  input: signOutInput,
  payload: userMutationPayload,
  resolve: signOutResolve
});

// === === === === === === CHANGE PASSWORD === === === === === ===

const changePasswordInput = {
  name: "UserChangePasswordInput",
  fields: () => ({
    password: { name: "password", type: GraphQLString }
  })
};

const changePasswordResolve = async (obj, args, context) => {
  const id = context.userId;
  const { password } = args;

  if (!id) {
    return { error: "notSignedIn" };
  }

  await changePassword({ id, password });
  const user = await getUserById(id);

  return { user };
};

export const UserChangePasswordField = createMutation({
  input: changePasswordInput,
  payload: userMutationPayload,
  resolve: changePasswordResolve
});
