const Action = require('../models/Action');
const User = require('../models/User');
const Yup = require('yup');
const { isAfter, parseISO, isBefore } = require('date-fns');

class ActionController {
  async store(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      subtitle: Yup.string().required(),
      content: Yup.string().required(),
      image_url: Yup.string().notRequired(),
      impact: Yup.string().required(),
      started: Yup.date().required(),
      ended: Yup.date(),
      target_audience: Yup.string().required(),
      observation: Yup.string().required(),
      situation: Yup.string().required(),
      user_id: Yup.number().positive().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(401).json({ error: 'Validation fails!' });
    }

    const {
      title,
      subtitle,
      content,
      image_url,
      impact,
      started,
      target_audience,
      observation,
      user_id,
    } = req.body;
    let situation = 'Não iniciado';

    if (isAfter(new Date(), parseISO(started))) {
      situation = 'Em andamento';
    }

    let ended = '';

    if (req.body.ended) {
      ended = req.body.ended;

      if (isAfter(new Date(), parseISO(ended))) {
        situation = 'Concluída';
      }
    }

    try {
      const action = await Action.create({
        title,
        subtitle,
        content,
        image_url,
        user_id,
        impact,
        started,
        ended,
        target_audience,
        observation,
        situation,
      });

      return res.json(action);
    } catch (error) {
      return res.status(400).json({ error: 'Error on create action!' });
    }

    return res.json({ started, ended, situation });
  }

  async index(req, res) {
    const actions = await Action.findAll({
      include: [{ model: User, as: 'user', attributes: ['name'] }],
    });

    if (!actions) {
      return res.status(400).json({ error: 'No actions founded' });
    }

    return res.json(actions);
  }

  async show(req, res) {
    const { id } = req.params;
    const action = await Action.findByPk(id, {
      include: [{ model: User, as: 'user', attributes: ['name'] }],
    });

    if (!action) {
      return res.status(400).json({ error: 'Action not founded!' });
    }

    return res.json(action);
  }

  async update(req, res) {
    const { id } = req.params;

    try {
      const action = await Action.findByPk(id);

      const update = req.body;

      if (update.title) {
        action.title = update.title;
      }

      if (update.subtitle) {
        action.subtitle = update.subtitle;
      }

      if (update.content) {
        action.content = update.content;
      }

      if (update.image_url) {
        action.image_url = update.image_url;
      }

      if (update.impact) {
        action.impact = update.impact;
      }

      if (update.title) {
        action.title = update.title;
      }

      if (update.started) {
        action.started = update.started;
      }

      if (update.ended) {
        action.ended = update.ended;
      }

      if (update.target_audience) {
        action.target_audience = update.target_audience;
      }

      if (update.observation) {
        action.observation = update.observation;
      }

      if (isBefore(new Date(), action.started)) {
        action.situation = 'Não iniciada';
      }

      if (isAfter(new Date(), action.started)) {
        action.situation = 'Em andamento';
      }

      if (isAfter(new Date(), action.ended)) {
        action.situation = 'Concluída';
      }

      action.save();

      return res.json(action);
    } catch (error) {
      return res.status(400).json({ error: 'Error on updating action!' });
    }
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
