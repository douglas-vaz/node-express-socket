var Users = [];

function addUser(user){
  for(var i = 0; i < Users.length; i++){
    if(Users[i].userName == user){
      return false;
    }
  }

  Users.push({'userName':user, 'clientId':'', 'clientIP':''});
  return true;
}

function addClientId(id, user){
  for(var i = 0; i < Users.length; i++){
    if(Users[i].userName == user){
      Users[i].clientId = id;
      return true;
    }
  }
  return false;
}

function addClientIP(ip, user)
{
  for(var i = 0; i < Users.length; i++){
    if(Users[i].userName == user){
      Users[i].clientIP = ip;
      return true;
    }
  }
  return false;
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

function removeClient(id){
  for(var i = 0; i < Users.length; i++){
    if(Users[i].clientId == id){
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

function listUsers(){
  return Users;
}

//Expose
exports.addUser = addUser;
exports.removeUser = removeUser;
exports.countUsers = countUsers;
exports.init = init;
exports.listUsers = listUsers;
exports.addClientId = addClientId;
exports.removeClient = removeClient;
exports.addClientIP = addClientIP;