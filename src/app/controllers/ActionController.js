const Action = require('../models/Action');
const User = require('../models/User');
const Yup = require('yup');

class ActionController {
  async store(req, res) {
    const schema = Yup.object().shape({
      urlImg: Yup.string().required(),
      responsible_id: Yup.string(),
      situation: Yup.string().required(),

      initialDate: Yup.string().required(),
      finalDate: Yup.string().required(),
      audience: Yup.string().required(),

      title: Yup.string().required(),
      subtitle: Yup.string().required(),
      content: Yup.string().required(),
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
      title,
      subtitle,
      content,
      urlImg,
      situation,
      observation,
      initialDate,
      finalDate,
      audience,
    } = req.body;

    const existsTitle = await Action.findOne({ title });

    if (existsTitle)
      return res
        .status(400)
        .json({ message: 'Title already exists, try other title' });

    try {
      const action = await Action.create({
        urlImg,
        responsible,
        situation,
        observation,
        initialDate,
        finalDate,
        audience,
        title,
        subtitle,
        content,
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
      responsible_id: Yup.string(),
      situation: Yup.string(),

      initialDate: Yup.string(),
      finalDate: Yup.string(),
      audience: Yup.string(),

      title: Yup.string(),
      subtitle: Yup.string(),
      content: Yup.string(),
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
