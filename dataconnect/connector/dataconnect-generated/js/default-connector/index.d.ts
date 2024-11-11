import { ConnectorConfig, DataConnect, QueryRef, QueryPromise, MutationRef, MutationPromise } from 'firebase/data-connect';
export const connectorConfig: ConnectorConfig;

export type TimestampString = string;

export type UUIDString = string;

export type Int64String = string;

export type DateString = string;



export interface AthleteResume_Key {
  id: UUIDString;
  __typename?: 'AthleteResume_Key';
}

export interface CreateUserData {
  user_insert: User_Key;
}

export interface CreateUserVariables {
  uid: string;
  firstName: string;
  lastName: string;
  email: string;
  country: string;
  createdAt: TimestampString;
}

export interface DeleteAthleteResumeData {
  athleteResume_delete?: AthleteResume_Key | null;
}

export interface DeleteAthleteResumeVariables {
  resumeId: UUIDString;
}

export interface GetAthleteResumesByUserIdData {
  athleteResumes: ({
    id: UUIDString;
    gender: string;
    sport: string;
    parameters: string[];
    updatedAt: TimestampString;
  } & AthleteResume_Key)[];
}

export interface GetAthleteResumesByUserIdVariables {
  userId: UUIDString;
}

export interface GetUserByUidData {
  users: ({
    id: UUIDString;
    firstName: string;
    lastName: string;
    email: string;
    country?: string | null;
    createdAt: TimestampString;
  } & User_Key)[];
}

export interface GetUserByUidVariables {
  id: UUIDString;
}

export interface UpsertAthleteResumeData {
  athleteResume_upsert: AthleteResume_Key;
}

export interface UpsertAthleteResumeVariables {
  id?: UUIDString | null;
  userId: UUIDString;
  gender: string;
  sport: string;
  parameters?: string[] | null;
  updatedAt: TimestampString;
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
export function upsertAthleteResumeRef(vars: UpsertAthleteResumeVariables): MutationRef<UpsertAthleteResumeData, UpsertAthleteResumeVariables>;
/* Allow users to pass in custom DataConnect instances */
export function upsertAthleteResumeRef(dc: DataConnect, vars: UpsertAthleteResumeVariables): MutationRef<UpsertAthleteResumeData,UpsertAthleteResumeVariables>;

export function upsertAthleteResume(vars: UpsertAthleteResumeVariables): MutationPromise<UpsertAthleteResumeData, UpsertAthleteResumeVariables>;
export function upsertAthleteResume(dc: DataConnect, vars: UpsertAthleteResumeVariables): MutationPromise<UpsertAthleteResumeData,UpsertAthleteResumeVariables>;


/* Allow users to create refs without passing in DataConnect */
export function deleteAthleteResumeRef(vars: DeleteAthleteResumeVariables): MutationRef<DeleteAthleteResumeData, DeleteAthleteResumeVariables>;
/* Allow users to pass in custom DataConnect instances */
export function deleteAthleteResumeRef(dc: DataConnect, vars: DeleteAthleteResumeVariables): MutationRef<DeleteAthleteResumeData,DeleteAthleteResumeVariables>;

export function deleteAthleteResume(vars: DeleteAthleteResumeVariables): MutationPromise<DeleteAthleteResumeData, DeleteAthleteResumeVariables>;
export function deleteAthleteResume(dc: DataConnect, vars: DeleteAthleteResumeVariables): MutationPromise<DeleteAthleteResumeData,DeleteAthleteResumeVariables>;


/* Allow users to create refs without passing in DataConnect */
export function getUserByUidRef(vars: GetUserByUidVariables): QueryRef<GetUserByUidData, GetUserByUidVariables>;
/* Allow users to pass in custom DataConnect instances */
export function getUserByUidRef(dc: DataConnect, vars: GetUserByUidVariables): QueryRef<GetUserByUidData,GetUserByUidVariables>;

export function getUserByUid(vars: GetUserByUidVariables): QueryPromise<GetUserByUidData, GetUserByUidVariables>;
export function getUserByUid(dc: DataConnect, vars: GetUserByUidVariables): QueryPromise<GetUserByUidData,GetUserByUidVariables>;


/* Allow users to create refs without passing in DataConnect */
export function getAthleteResumesByUserIdRef(vars: GetAthleteResumesByUserIdVariables): QueryRef<GetAthleteResumesByUserIdData, GetAthleteResumesByUserIdVariables>;
/* Allow users to pass in custom DataConnect instances */
export function getAthleteResumesByUserIdRef(dc: DataConnect, vars: GetAthleteResumesByUserIdVariables): QueryRef<GetAthleteResumesByUserIdData,GetAthleteResumesByUserIdVariables>;

export function getAthleteResumesByUserId(vars: GetAthleteResumesByUserIdVariables): QueryPromise<GetAthleteResumesByUserIdData, GetAthleteResumesByUserIdVariables>;
export function getAthleteResumesByUserId(dc: DataConnect, vars: GetAthleteResumesByUserIdVariables): QueryPromise<GetAthleteResumesByUserIdData,GetAthleteResumesByUserIdVariables>;


