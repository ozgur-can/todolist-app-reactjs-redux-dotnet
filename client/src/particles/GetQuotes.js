const data = require("./quotes.json");

var obj = {
  quote: "",
  owner: ""
};

const possibility = Math.floor(Math.random() * data.length);

obj.quote = data[possibility].quote;
obj.owner = data[possibility].owner;

export { obj };
