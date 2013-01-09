var state = Object.create(null);
var Users = [];

state.clientId = '';
state.userName = '';

function addUser(user, client){
  for(var i = 0; i < Users.length; i++){
    if(Users[i].userName == user)
      return false;
  }

  state.clientId = client;
  state.userName = user;

  Users.push(state);
  return true;
}

function removeUser(user){
  for(var i = 0; i < Users.length; i++){
    if(Users[i].userName == user){
      Users.splice(i,1);
      return true;
    }
  }
  return false;
}

function disconnectClient(client){
  for(var i = 0; i < Users.length; i++){
    if(Users[i].clientId == client){
      Users.splice(i,1);
      return true;
    }
  }
  return false;
}

function init()
{
  Users = [];
}

function countUsers(){
  return Users.length;
}

//Expose
exports.addUser = addUser;
exports.removeUser = removeUser;
exports.countUsers = countUsers;
exports.disconnectClient = disconnectClient;
exports.init = init;