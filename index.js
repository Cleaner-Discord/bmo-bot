const globalVariables = {};
require("./initGlobalVariable.js")(globalVariables);
Object.keys(globalVariables).map(variable => {
  global[variable] = globalVariables[variable];
});

client.setMaxListeners(Infinity);

//preload commands
if(fs.existsSync(__dirname+"/commands")){
    let commands = getFiles(__dirname+"/commands").filter(f => f.endsWith(".js"));
    for(let i=0; i<commands.length; i++) require(commands[i]);
}

let events = getFiles(__dirname + "/events").filter(f => f.endsWith(".js"));

console.log(events);

events.map(event => {
  let func = require(event)(globalVariables);
  listeners.push([func.listener,func]);
  client.on(func.listener, func);
});

client.login(process.env.BOT_TOKEN);
