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
}

module.exports = new CategoryController();
