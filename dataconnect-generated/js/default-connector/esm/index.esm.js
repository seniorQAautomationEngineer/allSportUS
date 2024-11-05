import { getDataConnect, mutationRef, executeMutation, validateArgs } from 'firebase/data-connect';

export const connectorConfig = {
  connector: 'default',
  service: 'all-sports-db-id',
  location: 'us-east1'
};

export function createUserRef(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  if('_useGeneratedSdk' in dcInstance) {
    dcInstance._useGeneratedSdk();
  } else {
    console.error('Please update to the latest version of the Data Connect SDK by running `npm install firebase@dataconnect-preview`.');
  }
  return mutationRef(dcInstance, 'CreateUser', inputVars);
}
export function createUser(dcOrVars, vars) {
  return executeMutation(createUserRef(dcOrVars, vars));
}
export function upsertAthleteResumeRef(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  if('_useGeneratedSdk' in dcInstance) {
    dcInstance._useGeneratedSdk();
  } else {
    console.error('Please update to the latest version of the Data Connect SDK by running `npm install firebase@dataconnect-preview`.');
  }
  return mutationRef(dcInstance, 'UpsertAthleteResume', inputVars);
}
export function upsertAthleteResume(dcOrVars, vars) {
  return executeMutation(upsertAthleteResumeRef(dcOrVars, vars));
}
export function deleteAthleteResumeRef(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  if('_useGeneratedSdk' in dcInstance) {
    dcInstance._useGeneratedSdk();
  } else {
    console.error('Please update to the latest version of the Data Connect SDK by running `npm install firebase@dataconnect-preview`.');
  }
  return mutationRef(dcInstance, 'DeleteAthleteResume', inputVars);
}
export function deleteAthleteResume(dcOrVars, vars) {
  return executeMutation(deleteAthleteResumeRef(dcOrVars, vars));
}
