exports.up = knex => knex.schema.createTable("completedPurchase",table => {

table.increments("id");

table.integer("user_id").references("id").inTable("USERS");

table.text("orderStatus");
table.text("orderPaymentMethod");

table.timestamp("created_at").default(knex.fn.now());
});


exports.down = knex => knex.schema.dropTable("completedPurchase");

