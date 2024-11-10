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

export interface GetAthleteResumesData {
  athleteResumes: ({
    gender: string;
    sport: string;
    updatedAt: TimestampString;
  })[];
}

export interface GetUserAthleteResumeData {
  athleteResumes: ({
    id: UUIDString;
    gender: string;
    sport: string;
    parameters: string[];
    updatedAt: TimestampString;
  } & AthleteResume_Key)[];
}

export interface GetUserAthleteResumeVariables {
  userId: UUIDString;
}

export interface GetUsersData {
  users: ({
    uid: string;
    firstName: string;
    lastName: string;
    email: string;
    country?: string | null;
    createdAt: TimestampString;
  })[];
}

export interface InsertAthleteResumeData {
  athleteResume_upsert: AthleteResume_Key;
}

export interface InsertAthleteResumeVariables {
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
export function insertAthleteResumeRef(vars: InsertAthleteResumeVariables): MutationRef<InsertAthleteResumeData, InsertAthleteResumeVariables>;
/* Allow users to pass in custom DataConnect instances */
export function insertAthleteResumeRef(dc: DataConnect, vars: InsertAthleteResumeVariables): MutationRef<InsertAthleteResumeData,InsertAthleteResumeVariables>;

export function insertAthleteResume(vars: InsertAthleteResumeVariables): MutationPromise<InsertAthleteResumeData, InsertAthleteResumeVariables>;
export function insertAthleteResume(dc: DataConnect, vars: InsertAthleteResumeVariables): MutationPromise<InsertAthleteResumeData,InsertAthleteResumeVariables>;


/* Allow users to create refs without passing in DataConnect */
export function deleteAthleteResumeRef(vars: DeleteAthleteResumeVariables): MutationRef<DeleteAthleteResumeData, DeleteAthleteResumeVariables>;
/* Allow users to pass in custom DataConnect instances */
export function deleteAthleteResumeRef(dc: DataConnect, vars: DeleteAthleteResumeVariables): MutationRef<DeleteAthleteResumeData,DeleteAthleteResumeVariables>;

export function deleteAthleteResume(vars: DeleteAthleteResumeVariables): MutationPromise<DeleteAthleteResumeData, DeleteAthleteResumeVariables>;
export function deleteAthleteResume(dc: DataConnect, vars: DeleteAthleteResumeVariables): MutationPromise<DeleteAthleteResumeData,DeleteAthleteResumeVariables>;


/* Allow users to create refs without passing in DataConnect */
export function getUsersRef(): QueryRef<GetUsersData, undefined>;/* Allow users to pass in custom DataConnect instances */
export function getUsersRef(dc: DataConnect): QueryRef<GetUsersData,undefined>;

export function getUsers(): QueryPromise<GetUsersData, undefined>;
export function getUsers(dc: DataConnect): QueryPromise<GetUsersData,undefined>;


/* Allow users to create refs without passing in DataConnect */
export function getAthleteResumesRef(): QueryRef<GetAthleteResumesData, undefined>;/* Allow users to pass in custom DataConnect instances */
export function getAthleteResumesRef(dc: DataConnect): QueryRef<GetAthleteResumesData,undefined>;

export function getAthleteResumes(): QueryPromise<GetAthleteResumesData, undefined>;
export function getAthleteResumes(dc: DataConnect): QueryPromise<GetAthleteResumesData,undefined>;


/* Allow users to create refs without passing in DataConnect */
export function getUserAthleteResumeRef(vars: GetUserAthleteResumeVariables): QueryRef<GetUserAthleteResumeData, GetUserAthleteResumeVariables>;
/* Allow users to pass in custom DataConnect instances */
export function getUserAthleteResumeRef(dc: DataConnect, vars: GetUserAthleteResumeVariables): QueryRef<GetUserAthleteResumeData,GetUserAthleteResumeVariables>;

export function getUserAthleteResume(vars: GetUserAthleteResumeVariables): QueryPromise<GetUserAthleteResumeData, GetUserAthleteResumeVariables>;
export function getUserAthleteResume(dc: DataConnect, vars: GetUserAthleteResumeVariables): QueryPromise<GetUserAthleteResumeData,GetUserAthleteResumeVariables>;


