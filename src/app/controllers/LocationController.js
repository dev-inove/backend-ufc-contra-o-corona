const Location = require('../models/Location');

class LocationController {
  async store(req, res) {
    const { name } = req.body;

    if (!name) {
      return res.status(401).json({ error: 'Validation fails!' });
    }

    const location = await Location.create({ name });

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
