const Notification = require('../models/Notification');
const Yup = require('yup');

class NotificationController {
  async store(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      content: Yup.string().required(),
      topic: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(401).json({ error: 'Validation fails!' });
    }

    try {
      const notification = await Notification.create(req.body);

      return res.json(notification);
    } catch (error) {
      return res.status(400).json({ error: 'Error on create notification!' });
    }
  }

  async index(req, res) {
    const notifications = await Notification.findAll();

    if (!notifications) {
      return res.status(400).json({ error: 'No notifications founded!' });
    }

    return res.json(notifications);
  }

  async destroy(req, res) {
    const { id } = req.params;

    try {
      const notification = await Notification.findByPk(id);

      notification.destroy();

      return res.json({ success: 'Notification succesfull deleted' });
    } catch (error) {
      return res.status(400).json({ error: 'Error on destroy notification.' });
    }
  }
}

module.exports = new NotificationController();
