const { getDataConnect, mutationRef, executeMutation, validateArgs } = require('firebase/data-connect');

const connectorConfig = {
  connector: 'default',
  service: 'all-sports-db-id',
  location: 'us-east1'
};
exports.connectorConfig = connectorConfig;

function createUserRef(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  if('_useGeneratedSdk' in dcInstance) {
    dcInstance._useGeneratedSdk();
  } else {
    console.error('Please update to the latest version of the Data Connect SDK by running `npm install firebase@dataconnect-preview`.');
  }
  return mutationRef(dcInstance, 'CreateUser', inputVars);
}
exports.createUserRef = createUserRef;
exports.createUser = function createUser(dcOrVars, vars) {
  return executeMutation(createUserRef(dcOrVars, vars));
};

function upsertAthleteResumeRef(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  if('_useGeneratedSdk' in dcInstance) {
    dcInstance._useGeneratedSdk();
  } else {
    console.error('Please update to the latest version of the Data Connect SDK by running `npm install firebase@dataconnect-preview`.');
  }
  return mutationRef(dcInstance, 'UpsertAthleteResume', inputVars);
}
exports.upsertAthleteResumeRef = upsertAthleteResumeRef;
exports.upsertAthleteResume = function upsertAthleteResume(dcOrVars, vars) {
  return executeMutation(upsertAthleteResumeRef(dcOrVars, vars));
};

function deleteAthleteResumeRef(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  if('_useGeneratedSdk' in dcInstance) {
    dcInstance._useGeneratedSdk();
  } else {
    console.error('Please update to the latest version of the Data Connect SDK by running `npm install firebase@dataconnect-preview`.');
  }
  return mutationRef(dcInstance, 'DeleteAthleteResume', inputVars);
}
exports.deleteAthleteResumeRef = deleteAthleteResumeRef;
exports.deleteAthleteResume = function deleteAthleteResume(dcOrVars, vars) {
  return executeMutation(deleteAthleteResumeRef(dcOrVars, vars));
};

