// message.entity.js
const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
  name: "Message",
  tableName: "messages",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    isBot: {
      type: "boolean",
    },
    createdOn: {
      type: "datetime",
      default: () => "CURRENT_TIMESTAMP",
    },
    message: {
      type: "text",
    },
  },
  relations: {
    user: {
      type: "many-to-one",
      target: "User",
      joinColumn: { name: "userId", referencedColumnName: "id" },
    },
  },
});
