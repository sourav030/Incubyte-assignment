import Sweet from "../models/Sweet.js";

// ADD SWEET
export const addSweet = async (req, res) => {
  try {
    const { name, category, price, quantity, imageUrl } = req.body;

    // Validation
    if (!name || !price || !quantity || !imageUrl) {
      return res.status(400).json({ msg: "Please provide all required fields" });
    }

    const sweet = await Sweet.create({
      name,
      category,
      price,
      quantity,
      imageUrl
    });

    res.status(201).json(sweet);
  } catch (error) {
    res.status(500).json(error);
  }
};

// GET ALL SWEETS
export const getSweets = async (req, res) => {
  const sweets = await Sweet.find();
  res.json(sweets);
};

// SEARCH SWEETS
export const searchSweets = async (req, res) => {
  const { name, category, minPrice, maxPrice } = req.query;

  let filter = {};

  if (name) filter.name = new RegExp(name, "i");
  if (category) filter.category = category;

  if (minPrice || maxPrice) {
    filter.price = {};
    if (minPrice) filter.price.$gte = Number(minPrice);
    if (maxPrice) filter.price.$lte = Number(maxPrice);
  }

  const results = await Sweet.find(filter);
  res.json(results);
};

// UPDATE SWEET
export const updateSweet = async (req, res) => {
  const { name, category, price, quantity, imageUrl } = req.body;

  const updatedData = {
    ...(name && { name }),
    ...(category && { category }),
    ...(price !== undefined && { price }),
    ...(quantity !== undefined && { quantity }),
    ...(imageUrl && { imageUrl })
  };

  const sweet = await Sweet.findByIdAndUpdate(req.params.id, updatedData, { new: true });

  res.json(sweet);
};

// DELETE SWEET
export const deleteSweet = async (req, res) => {
  await Sweet.findByIdAndDelete(req.params.id);
  res.json({ msg: "Sweet deleted" });
};

// PURCHASE SWEET
export const purchaseSweet = async (req, res) => {
  const sweet = await Sweet.findById(req.params.id);
  const {quantity}=req.body
  if (!sweet) return res.status(404).json({ msg: "Not found" });
  if (sweet.quantity < quantity) return res.status(400).json({ msg: "Out of stock" });

  sweet.quantity -= quantity;
  await sweet.save();

  res.json(sweet);
};

// RESTOCK SWEET
export const restockSweet = async (req, res) => {
  const sweet = await Sweet.findById(req.params.id);

  if (!sweet) return res.status(404).json({ msg: "Not found" });

  const addQty = Number(req.body.quantity);
  if (isNaN(addQty) || addQty <= 0) {
    return res.status(400).json({ msg: "Invalid quantity" });
  }

  sweet.quantity += addQty;
  await sweet.save();

  res.json(sweet);
};
