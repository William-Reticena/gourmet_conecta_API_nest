export const insertQueries = {
  createUserQuery: `
    INSERT INTO "user" (first_name, last_name, email, password, role_id)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *;
  `,
  createAddressQuery: `
    INSERT INTO "address" (
      type,
      active_for_delivery,
      street,
      number,
      complement,
      neighborhood,
      city,
      state,
      country,
      zip_code,
      user_id
    )
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
    RETURNING *;
  `,
}

export const selectQueries = {
  getUsersQuery: `
    SELECT *
    FROM "user";
  `,
  getUserByIdQuery: `
    SELECT *
    FROM "user"
    WHERE id = $1;
  `,
  getAddressByIdQuery: `
    SELECT *
    FROM "address"
    WHERE id = $1;
  `,
  getAddressesQuery: `
    SELECT *
    FROM "address";
  `,
}

export const deleteQueries = {
  deleteUserQuery: `
    DELETE FROM "user"
    WHERE id = $1
    RETURNING *;
  `,
  deleteAddressQuery: `
    DELETE FROM "address"
    WHERE id = $1
    RETURNING *;
  `,
}
