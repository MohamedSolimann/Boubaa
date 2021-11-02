function updatedRequestBody(req) {
  const { name, price, stock, desc, status, deleted, image, category } =
    req.body;
  let updatedBody = {};
  if (name !== null) {
    updatedBody.name = name;
  }
  if (price !== null) {
    updatedBody.price = price;
  }
  if (stock !== null) {
    updatedBody.stock = stock;
  }
  if (desc !== null) {
    updatedBody.desc = desc;
  }
  if (status !== null) {
    updatedBody.status = status;
  }
  if (deletedDate !== null) {
    updatedBody.deleted = deleted;
  }
  if (image !== null) {
    updatedBody.image = image;
  }
  if (category !== null) {
    updatedBody.category = category;
  }
  return updatedBody;
}
module.exports = updatedRequestBody;
