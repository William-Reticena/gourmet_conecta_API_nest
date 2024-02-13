export const insertQueries = {
  createRestaurant: `
    INSERT INTO restaurant (name, email, phone, address_id, user_id)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *;
  `,
  createMenu: `
    INSERT INTO menu (name, category, restaurant_id)
    VALUES ($1, $2, $3)
    RETURNING *;
  `,
}
