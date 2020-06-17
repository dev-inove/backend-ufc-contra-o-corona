const DistribuitionLocation = require('../models/DistribuitionLocation');

class DistribuitionLocationController {
  async store(req, res) {
    const { name } = req.body;

    if (!name) {
      return res.status(401).json({ error: 'Validation fails!' });
    }

    const dist_location = await DistribuitionLocation.create({ name });

    return res.json(dist_location);
  }

  async index(req, res) {
    const locations = await DistribuitionLocation.findAll();

    return res.json(locations);
  }

  async destroy(req, res) {
    const { id } = req.params;

    try {
      const dist_location = await DistribuitionLocation.findByPk(id);

      dist_location.destroy();

      return res.json({
        success: 'Location successfuly deleted!',
      });
    } catch (error) {
      return res.status(400).json({ error: 'Error on delete location' });
    }
  }
}

module.exports = new DistribuitionLocationController();
