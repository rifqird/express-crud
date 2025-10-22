import { Product } from "../models/productModel.js";
export const createProduct = async (req, res) => {
  try {
    const { name, price } = req.body;
    const newProduct = new Product({ name, price });
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
    }
}
export const getProducts = async (req, res) => {
  try {
    const page=parseInt(req.query.page) || 1;
    const limit=parseInt(req.query.limit) || 10;
    const sortBy=req.query.sortBy || 'name';
    const order=req.query.order ==='desc' ? -1 : 1;
    const skip=(page-1)*limit;
    const totalProducts=await Product.countDocuments();
    const totalPages=Math.ceil(totalProducts/limit);
    const search=req.query.search || '';

    const products = await Product.find({name:{$regex:search,$options:"i"}}).sort({ [sortBy]: order }).skip(skip).limit(limit);
    res.status(200).json({total:totalProducts,page,limit,totalPages:totalPages,sortBy,order:order===1?"asc":"desc",data:products});
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
}
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
        return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(product);
    } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
    }
}
export const updateProduct = async (req, res) => {
  try {
    const { name, price } = req.body;
    const product = await Product.findByIdAndUpdate(
        req.params.id,
        { name, price },
        { new: true }
    );
    if (!product) {
        return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(product);
    } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
    }
}
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
        return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
    }
}
