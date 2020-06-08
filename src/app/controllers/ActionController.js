const Action = require('../models/Action');
const File = require('../models/File');
const Yup = require('yup');

class ActionController {
  async store(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      subtitle: Yup.string().required(),
      content: Yup.string().required(),
      image_id: Yup.number().positive().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails!' });
    }

    try {
      const action = await Action.create(req.body);

      return res.json(action);
    } catch (error) {
      return res.status(400).json({ error: 'Error on create action!' });
    }
  }

  async index(req, res) {
    const actions = await Action.findAll({
      include: [{ model: File, as: 'image' }],
    });

    if (!actions) {
      return res.status(400).json({ error: 'No actions founded' });
    }

    return res.json(actions);
  }

  async show(req, res) {
    const { id } = req.params;

    try {
      const action = await Action.findByPk(id);

      return res.json(action);
    } catch (e) {
      return res.status(400).json({ error: 'Action not founded!' });
    }
  }

  async update(req, res) {
    const { id } = req.params;

    const action = await Action.findByPk(id);

    if (req.body.title) {
      const { title } = req.body;

      action.title = title;
    }

    if (req.body.subtitle) {
      const { subtitle } = req.body;

      action.subtitle = subtitle;
    }

    if (req.body.content) {
      const { content } = req.body;

      action.content = content;
    }

    action.save();

    return res.json(action);
  }

  async destroy(req, res) {
    const { id } = req.params;

    try {
      const action = await Action.findByPk(id);

      action.destroy();

      return res.json({ success: 'Action successfuly deleted!' });
    } catch (e) {
      return res.status(400).json({ error: 'Action not founded!' });
    }
  }
}

module.exports = new ActionController();
