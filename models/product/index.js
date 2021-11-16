function updatedRequestBody(req) {
  const { price, stock, desc, code, status, deletedDate, image, category } =
    req.body;
  let updatedBody = {};
  if (price !== null && price !== "") {
    updatedBody.price = price;
  }
  if (stock !== null && stock !== "") {
    updatedBody.stock = stock;
  }
  if (desc !== null && desc !== "") {
    updatedBody.desc = desc;
  }
  if (status !== null && status !== "") {
    updatedBody.status = status;
  }
  if (deletedDate !== null && deletedDate !== "") {
    updatedBody.deletedDate = deletedDate;
  }
  if (image !== null && image !== "") {
    updatedBody.image = image;
  }
  if (code !== null && code !== "") {
    updatedBody.code = code;
  }
  if (category !== null && category !== "") {
    updatedBody.category = category;
  }
  return updatedBody;
}
module.exports = updatedRequestBody;
