const data = require("./quotes.json");

// object for the quote
var obj = {
  quote: "",
  owner: ""
};

// random number for quotes
const possibility = Math.floor(Math.random() * data.length);

// quote assignment
obj.quote = data[possibility].quote;
obj.owner = data[possibility].owner;

export { obj };
