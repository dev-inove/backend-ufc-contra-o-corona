const Category = require('../models/Category');
const User = require('../models/User');
const Yup = require('yup');

class CategoryController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(401).json({ error: 'Validation fails!' });
    }

    const { name } = req.body;

    const exists = await Category.findOne({ name });

    if (!exists) {
      const category = await Category.create({ name });

      await category.save();

      return res.status(201).json({ message: 'created' });
    }

    return res.status(400).json({ merrage: 'Category alredy exists' });
  }

  async show(req, res) {
    const { name } = req.query;
    if (!name) return res.status(400).json({ message: 'Title not provided' });
    const titleRefactored = name.replace(/_/gi, ' ');

    const category = await Category.findOne({ name: titleRefactored });

    if (!category) {
      return res.status(403).json({ message: 'Category not found' });
    }

    return res.status(200).json(category);
  }

  async index(req, res) {
    const categories = await Category.find();
    if (!categories) {
      return res.status(400).json({ error: 'No categories founded' });
    }

    return res.status(200).json({ categories });
  }
}

module.exports = new CategoryController();
