const Need = require('../models/Need');
const Yup = require('yup');

class NeedController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      link: Yup.string().required(),
      image_url: Yup.string().notRequired(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(401).json({ error: 'Validation fails!' });
    }

    const need = await Need.create(req.body);

    return res.json(need);
  }

  async index(req, res) {
    const needs = await Need.findAll();

    if (!needs) {
      return res.status(400).json({ error: 'Needs not found!' });
    }

    return res.json(needs);
  }

  async show(req, res) {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ error: 'Id not given!' });
    }

    const need = await Need.findByPk(id);

    if (!need) {
      return res.status(400).json({ error: 'Needs not found!' });
    }

    return res.json(need);
  }

  async update(req, res) {
    const { id } = req.params;

    try {
      const need = await Need.findByPk(id);

      const update = req.body;

      if (update.name) {
        need.name = update.name;
      }

      if (update.link) {
        need.link = update.link;
      }

      if (update.image_url) {
        need.image_url = update.image_url;
      }

      need.save();

      return res.json(need);
    } catch (error) {
      return res.status(400).json({ error: 'Error on updating need!' });
    }
  }

  async destroy(req, res) {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ error: 'Id not given!' });
    }

    const need = await Need.findByPk(id);

    if (!need) {
      return res.status(400).json({ error: 'Needs not found!' });
    }

    need.destroy();

    return res.json({ success: 'Need successfuly deleted!' });
  }
}

module.exports = new NeedController();
