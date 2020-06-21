const Need = require('../models/Need');
const Yup = require('yup');

class NeedController {
  async store(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      subtitle: Yup.string().required(),
      situation: Yup.string().required(),
      link: Yup.string().required(),
      image_url: Yup.string().notRequired(),
      quantity: Yup.number().positive().required(),
      started: Yup.date().required(),
      ended: Yup.date().required(),
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

      if (update.title) {
        need.title = update.title;
      }

      if (update.subtitle) {
        need.subtitle = update.subtitle;
      }

      if (update.situation) {
        need.situation = update.situation;
      }

      if (update.link) {
        need.link = update.link;
      }

      if (update.image_url) {
        need.image_url = update.image_url;
      }

      if (update.quantity) {
        need.quantity = update.quantity;
      }

      if (update.started) {
        need.started = update.started;
      }

      if (update.ended) {
        need.ended = update.ended;
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
