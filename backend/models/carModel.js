import db from "../config/db.js";

export const getCars = async () => {
    return await db
    .selectFrom('inventory')
    .selectAll()
    .execute();
};

export const createCar = async (name, brand, price, year, status) => {
    return await db
    .insertInto('inventory')
    .values({
        name: name,
        brand: brand,
        price: price,
        year: year,
        status: status
    })
    .execute();
}

export const updateCar = async (id, { name, brand, price, year, status }) => {
    return await db
    .updateTable('inventory')
    .set({ name, brand, price, year, status })
    .where('id', '=', id)
    .executeTakeFirst();
};

export const deleteCar = async (id) => {
    return await db
    .deleteFrom('inventory')
    .where('id', '=', id)
    .executeTakeFirst();
};