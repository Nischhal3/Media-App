'user strict';

const pool = require('../database/db');
const promisePool = pool.promise();
const { internalServerError } = require('../utils/error');

const getAllImagesByUser = async (id) => {
  try {
    const [rows] = await promisePool.query(
      'SELECT * FROM image_db where user_id = ?',
      [id]
    );
    return rows;
  } catch (e) {
    console.error(' images', e.message);
    const err = internalServerError();
    next(err);
  }
};

//get one image by its id
const getImage = async (imageId, next) => {
  try {
    const [rows] = await promisePool.query(
      'SELECT collection_db.collection_id, collection_db.collection_title, user_db.first_name, user_db.last_name, image_title, image_date, image_description, image_file FROM image_db INNER JOIN user_db on user_db.user_id = image_db.user_id INNER JOIN collection_db on collection_db.collection_id = image_db.collection_id WHERE image_db.image_id = ?',
      [imageId]
    );
    return rows[0];
  } catch (e) {
    console.error('Get image by id', e.message);
    const err = internalServerError();
    next(err);
  }
};

const getImageByCollectionId = async (id, next) => {
  try {
    const [rows] = await promisePool.query(
      'SELECT collection_db.collection_id, user_db.first_name, user_db.last_name, image_id, image_title, image_file FROM image_db INNER JOIN user_db on user_db.user_id = image_db.user_id INNER JOIN collection_db on collection_db.collection_id = image_db.collection_id WHERE image_db.collection_id = ?',
      [id]
    );
    return rows;
  } catch (e) {
    console.error('Get image by id', e.message);
    const err = internalServerError();
    next(err);
  }
};

const insertImage = async (user_id, image, next) => {
  try {
    const [rows] = await promisePool.query(
      'INSERT INTO image_db (user_id, collection_id, image_title, image_description, image_file, image_date) VALUES (?,?,?,?,?,?)',
      [
        user_id,
        image.collection,
        image.title,
        image.description,
        image.file,
        image.date,
      ]
    );
    return rows.affectedRows;
  } catch (e) {
    console.error('Insert image', e.message);
    const err = internalServerError();
    next(err);
  }
};

const deleteImage = async (imageId, user_id, role, next) => {
  let sql = 'DELETE FROM image_db WHERE image_id = ? AND user_id = ?';
  let params = [imageId, user_id];

  //check if user is admin
  if (role === 0) {
    (sql = 'DELETE FROM image_db WHERE image_id = ?'), (params = [imageId]);
  }

  try {
    const [rows] = await promisePool.execute(sql, params);
    return rows.affectedRows === 1;
  } catch (e) {
    console.error('Delete image', e.message);
    const err = internalServerError();
    next(err);
  }
};

const updateImage = async (user_id, image, next) => {
  console.log('update', user_id, image);

  try {
    const [rows] = await promisePool.query(
      'UPDATE image_db SET image_title = ? , image_description = ?,  collection_id = ?, image_date = ? WHERE  image_id = ? AND  user_id =  ?',
      [
        image.title,
        image.description,
        image.collection,
        image.date,
        image.id,
        user_id,
      ]
    );
    return rows.affectedRows === 1;
  } catch (e) {
    console.error('Update image ', e.message);
    const err = internalServerError();
    next(err);
  }
};

module.exports = {
  getAllImagesByUser,
  getImage,
  insertImage,
  deleteImage,
  updateImage,
  getImageByCollectionId,
};
