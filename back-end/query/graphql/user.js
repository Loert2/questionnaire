import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInputObjectType
} from "graphql";

import {
  getUserById,
  getUserByE_mail,
  addUser,
  changePassword
} from "../database/db-user";

import { nodeInterface } from "./node";

import { createMutation, createPayload } from "./utilities";

import { fromGlobalId, toGlobalId, globalIdField } from "graphql-relay";

//import { AnswerUserConnection } from "./answerUser";
//import { ResultConnection } from "./result";

// === === === === === === QUERY === === === === === ===

export const UserType = new GraphQLObjectType({
  name: "User",
  interfaces: [nodeInterface],
  fields: () => ({
    id: globalIdField(),
    full_name: {
      name: "full_name",
      type: GraphQLString
    },
    e_mail: {
      name: "e_mail",
      type: GraphQLString
    }
    //    AnswerUser: AnswerUserConnection,
    //    Result: ResultConnection
  })
});

export const UserField = {
  type: UserType,
  resolve: async (obj, args, context) => {
    return await getUserById(context.userId);
    console.log(obj.userId, args.userId, context.userId);
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
    e_mail: { name: "e_mail", type: GraphQLString },
    password: { name: "password", type: GraphQLString }
  })
};

const signInResolve = async (obj, args, context) => {
  const id_user = context.userId;
  if (id_user) {
    return { error: "alreadySignedIn" };
  }
  const user = await getUserByE_mail(args.e_mail);
  if (user && user.password === args.password) {
    await context.setUserId(user.id_user);
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
    full_name: { name: "full_name", type: GraphQLString },
    e_mail: { name: "e_mail", type: GraphQLString },
    password: { name: "password", type: GraphQLString }
  })
};

const signUpResolve = async (obj, args, context) => {
  const contextId = context.userId;
  const { e_mail, full_name, password } = args;

  if (contextId) {
    return { error: "alreadySignedIn" };
  }

  const signedUpUser = await getUserByE_mail(args.e_mail);
  if (signedUpUser) {
    return { error: "e_mailAlreadyInUse" };
  }

  const id_user = await addUser({ e_mail, full_name, password });
  const user = await getUserById(id_user);
  await context.setUserId(user.id_user);

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
  const id_user = context.userId;
  if (!id_user) {
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
  const id_user = context.userId;
  const { password } = args;

  if (!id_user) {
    return { error: "notSignedIn" };
  }

  await changePassword({ id_user, password });
  const user = await getUserById(id_user);

  return { user };
};

export const UserChangePasswordField = createMutation({
  input: changePasswordInput,
  payload: userMutationPayload,
  resolve: changePasswordResolve
});
