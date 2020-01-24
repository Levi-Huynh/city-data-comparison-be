const db = require("../database/dbConfig.js");

module.exports = {
  addFav,
  removeFav,
  getFavs,
  findById,
  addImage, 
  editImage,
  findUserById,
  updateUser
};

function editImage(id, changes) {
  return db('users_image')
    .where({id})
    .update(changes, '*');
}

function updateUser(id, changes) {
  return db('users')
    .where({id})
    .update(changes, '*');
}

function findUserById(id) {
  return db('users as u')
    .join('users_image as i ', 'u.id', 'i.users_id')
    .select(
      'u.id',
      'u.username',
      'u.first_name',
      'u.last_name',
      'u.email',
      'u.city',
      'u.state',
      'i.userimage'
    )
    .where('u.id', id)
}

function addImage(image) {
  return db('users_image').insert(image)
}

function getFavs(userid) {
  return db("users_cities").where({ user_id: userid });
}

async function addFav(city) {
  const [id] = await db("users_cities").insert(city);
  return findById(id);
}

function findById(id) {
  return db("users_cities")
    .where({ id })
    .first();
}

function removeFav(id) {
  return db("users_cities")
    .where({ id })
    .del();
}