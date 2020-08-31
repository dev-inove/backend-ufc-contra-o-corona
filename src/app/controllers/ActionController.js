const Action = require('../models/Action');
const User = require('../models/User');
const Yup = require('yup');

class ActionController {
  async store(req, res) {
    const schema = Yup.object().shape({
      urlImg: Yup.string().required(),
      category_ref: Yup.string().required(),
      fullName: Yup.string().required(),
      institution: Yup.string().required(),
      email: Yup.string().required(),

      initialDate: Yup.date().required(),
      finalDate: Yup.date().required(),

      title: Yup.string().required(),
      subtitle: Yup.string().required(),
      description: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(401).json({ error: 'Validation fails!' });
    }

    const responsible = req.body.responsible_id || req.userId;

    const exists = await User.findOne({ _id: responsible });

    if (!exists)
      return res
        .status(400)
        .json({ message: "User don't exists, try a valid _id" });

    const {
      urlImg,
      category_ref,
      fullName,
      institution,
      email,
      initialDate,
      finalDate,
      title,
      subtitle,
      description,
    } = req.body;

    const existsTitle = await Action.findOne({ title });

    if (existsTitle)
      return res
        .status(400)
        .json({ message: 'Title already exists, try other title' });

    try {
      const action = await Action.create({
        urlImg,
        category_ref,
        fullName,
        institution,
        email,
        initialDate,
        finalDate,
        title,
        subtitle,
        description,
      });

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
    const action = await Action.findOne({ title: { $eq: title } });

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

      initialDate: Yup.date(),
      finalDate: Yup.date(),

      title: Yup.string(),
      subtitle: Yup.string(),
      description: Yup.string(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(401).json({ error: 'Validation fails!' });
    }

    try {
      const action = await Action.findOne({ title: req.query.title });
      if (!action) {
        return res
          .status(400)
          .json({ message: "Action don't exists, try a valid title" });
      }
      action.set(req.body);
      const responsible = req.body.responsible_id;

      const exists = await User.findOne({ _id: responsible });

      if (exists) {
        action.set('responsible', responsible);
      }

      action.save();

      return res.json(action);
    } catch (error) {
      return res.status(400).json({ error: 'Error on updating action!' });
    }
  }

  async destroy(req, res) {
    const { title } = req.query;

    if (!title) {
      return res.status(400).json({ error: 'Validation fails!' });
    }
    try {
      const action = await Action.findOne({ title });

      action.remove();

      return res.json({ success: 'Action successfuly deleted!' });
    } catch (e) {
      return res.status(400).json({ error: 'Action not founded!' });
    }
  }
}

module.exports = new ActionController();
