const Location = require('../models/Location');
const Yup = require('yup');

class LocationController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      street: Yup.string().required(),
      city: Yup.string().required(),
      state: Yup.string().required(),
    });
    if (!(await schema.isValid(req.body))) {
      return res.status(401).json({ error: 'Validation fails!' });
    }

    const location = await Location.create(req.body);

    return res.json(location);
  }

  async index(req, res) {
    const locations = await Location.findAll();

    return res.json(locations);
  }

  async destroy(req, res) {
    const { id } = req.params;

    try {
      const location = await Location.findByPk(id);

      location.destroy();

      return res.json({
        success: 'Location successfuly deleted!',
      });
    } catch (error) {
      return res.status(400).json({ error: 'Error on delete location' });
    }
  }
}

module.exports = new LocationController();
