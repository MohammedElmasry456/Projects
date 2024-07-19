const file = require("./file");
const yargs = require("yargs");

yargs.command({
  command: "add",
  describe: "to add item",
  builder: {
    id: {
      describe: "add id to the use",
      demandOption: true,
      type: "string",
    },
    fname: {
      describe: "add first name to the use",
      demandOption: true,
      type: "string",
    },
    lname: {
      describe: "add last name to the use",
      demandOption: true,
      type: "string",
    },
    age: {
      describe: "add age to the use",
      demandOption: true,
      type: "string",
    },
    city: {
      describe: "add city to the user",
      demandOption: true,
      type: "string",
    },
  },
  handler: (x) => {
    file.addUser(x.id, x.fname, x.lname, x.age, x.city);
  },
});

yargs.command({
  command: "delete",
  describe: "to delete item",
  builder: {
    id: {
      describe: "add id to the use",
      demandOption: true,
      type: "string",
    },
  },
  handler: (x) => {
    file.deleteUser(x.id);
  },
});

yargs.command({
  command: "read",
  describe: "to read item",
  builder: {
    id: {
      describe: "to read item",
      demandOption: true,
      type: "string",
    },
  },
  handler: (x) => {
    file.readUser(x.id);
  },
});

yargs.command({
  command: "list",
  describe: "to list items",
  handler: (x) => {
    file.listUsers();
  },
});

yargs.parse();
