import { ConnectorConfig, DataConnect, QueryRef, QueryPromise, MutationRef, MutationPromise } from 'firebase/data-connect';
export const connectorConfig: ConnectorConfig;

export type TimestampString = string;

export type UUIDString = string;

export type Int64String = string;

export type DateString = string;



export interface CreateUserData {
  user_upsert: User_Key;
}

export interface CreateUserVariables {
  id: UUIDString;
  authUid: string;
  firstName: string;
  lastName: string;
  email: string;
  country: string;
  age?: number | null;
  createdAt: TimestampString;
}

export interface GetUserByUidData {
  users: ({
    id: UUIDString;
    firstName: string;
    lastName: string;
    email: string;
    country?: string | null;
    age?: number | null;
    createdAt: TimestampString;
  } & User_Key)[];
}

export interface GetUserByUidVariables {
  id: UUIDString;
}

export interface User_Key {
  id: UUIDString;
  __typename?: 'User_Key';
}



/* Allow users to create refs without passing in DataConnect */
export function createUserRef(vars: CreateUserVariables): MutationRef<CreateUserData, CreateUserVariables>;
/* Allow users to pass in custom DataConnect instances */
export function createUserRef(dc: DataConnect, vars: CreateUserVariables): MutationRef<CreateUserData,CreateUserVariables>;

export function createUser(vars: CreateUserVariables): MutationPromise<CreateUserData, CreateUserVariables>;
export function createUser(dc: DataConnect, vars: CreateUserVariables): MutationPromise<CreateUserData,CreateUserVariables>;


/* Allow users to create refs without passing in DataConnect */
export function getUserByUidRef(vars: GetUserByUidVariables): QueryRef<GetUserByUidData, GetUserByUidVariables>;
/* Allow users to pass in custom DataConnect instances */
export function getUserByUidRef(dc: DataConnect, vars: GetUserByUidVariables): QueryRef<GetUserByUidData,GetUserByUidVariables>;

export function getUserByUid(vars: GetUserByUidVariables): QueryPromise<GetUserByUidData, GetUserByUidVariables>;
export function getUserByUid(dc: DataConnect, vars: GetUserByUidVariables): QueryPromise<GetUserByUidData,GetUserByUidVariables>;


