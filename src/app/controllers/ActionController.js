const Action = require('../models/Action');
const Category = require('../models/Category');
const Yup = require('yup');

class ActionController {
  async store(req, res) {
    const schema = Yup.object().shape({
      urlImg: Yup.string(),
      category: Yup.string(),
      fullName: Yup.string().required(),
      institution: Yup.string().required(),
      email: Yup.string().required(),

      initialDate: Yup.string(),
      finalDate: Yup.string(),

      title: Yup.string().required(),
      subtitle: Yup.string().required(),
      description: Yup.string().required(),
      result: Yup.string(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(401).json({ error: 'Validation fails!' });
    }

    const { filename } = req.file;

    const urlImg = filename;
    const {
      category,
      fullName,
      institution,
      email,

      initialDate,
      finalDate,

      title,
      subtitle,
      description,
      result,
    } = req.body;

    const existsTitle = await Action.findOne({ title });

    if (existsTitle)
      return res
        .status(400)
        .json({ message: 'Title already exists, try other title' });

    const existCategory = await Category.findOne({ name: category });

    if (!existCategory) {
      return res.status(400).json({ message: 'Wrong Category, try again' });
    }

    const category_ref = existCategory._id;
    const categoryName = existCategory.name;

    try {
      const action = await Action.create({
        urlImg,
        category_ref,
        categoryName,
        fullName,
        institution,
        email,

        initialDate,
        finalDate,

        title,
        subtitle,
        description,
        result,
      });
      // await action.populate('category_ref').execPopulate();

      await action.save();

      return res.json(action);
    } catch (error) {
      return res.status(400).json({ error: 'Error on create action!' });
    }
  }

  async index(req, res) {
    const actions = await Action.find();
    if (!actions) {
      return res.status(400).json({ error: 'No actions founded' });
    }

    return res.status(200).json({ actions });
  }

  async show(req, res) {
    const { title } = req.query;
    if (!title) return res.status(400).json({ message: 'Title not provided' });
    const titleRefactored = title.replace(/_/gi, ' ');
    const action = await Action.find({
      title: { $regex: `${titleRefactored}`, $options: 'i' },
    });

    if (!action) {
      return res.status(400).json({ error: 'Action not founded!' });
    }

    return res.json({ action });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      urlImg: Yup.string(),
      category_ref: Yup.string(),
      fullName: Yup.string(),
      institution: Yup.string(),
      email: Yup.string(),

      initialDate: Yup.string(),
      finalDate: Yup.string(),

      title: Yup.string(),
      subtitle: Yup.string(),
      description: Yup.string(),
      result: Yup.string(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(401).json({ error: 'Validation fails!' });
    }
    const titleRefactored = title.replace(/_/gi, ' ');

    try {
      const action = Action.findOne({ title: titleRefactored });

      if (!action) {
        return res.status(400).json({ message: 'Action not found' });
      }

      const { category_ref } = req.body;
      const existCategory = await Category.findById({ _id: category_ref });

      if (!existCategory) {
        return res
          .status(403)
          .json({ message: 'Category not found, try gain' });
      }

      action.set(req.body);
      await action.updateOne();
      return res.json({ message: 'Success' });
    } catch (error) {
      return res.status(400).json({ message: 'Update fails' });
    }
  }

  async destroy(req, res) {
    const { title } = req.query;
    if (!title) return res.status(400).json({ message: 'Title not provided' });
    const titleRefactored = title.replace(/_/gi, ' ');

    if (!title) {
      return res.status(400).json({ error: 'Validation fails!' });
    }
    try {
      const action = await Action.findOne({ title: titleRefactored });

      action.remove();

      return res.json({ success: 'Action successfuly deleted!' });
    } catch (e) {
      return res.status(400).json({ error: 'Action not founded!' });
    }
  }

  async numberDocsWithResult(req, res) {
    try {
      const allActions = await Action.countDocuments();

      const allCategories = await Category.countDocuments();

      const empty = await Action.find({ result: '' });

      const result = allActions - empty.length;

      return res.status(200).json({
        message: 'Done',
        allActions: allActions,
        actionsDone: result,
        allCategories: allCategories,
      });
    } catch (error) {
      return res.status(400).json({
        message: 'Not a number',
      });
    }
  }
}

module.exports = new ActionController();
