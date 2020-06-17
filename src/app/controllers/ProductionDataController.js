const ProductionData = require('../models/ProductionData');
const Yup = require('yup');

class ProductionDataController {
  async store(req, res) {
    const schema = Yup.object().shape({
      production_date: Yup.date().required(),
      quantity: Yup.number().positive().required(),
      production_id: Yup.number().positive().required(),
      location_id: Yup.number().positive().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(401).json({ error: 'Validation fails!' });
    }

    try {
      const {
        quantity,
        production_date,
        production_id,
        location_id,
      } = req.body;

      const production_data = await ProductionData.create({
        quantity,
        production_date,
        production_id,
        location_id,
      });

      return res.json(production_data);
    } catch (error) {
      return res
        .status(400)
        .json({ error: 'Error on create production data.' });
    }
  }

  async index(req, res) {
    const production_data = await ProductionData.findAll({
      include: [
        {
          model: DistribuitionLocation,
          as: 'distribuition',
          attributes: ['name'],
        },
      ],
    });

    if (!production_data) {
      return res.status(400).json({ error: 'No data founded!' });
    }

    return res.json(production_data);
  }

  async update(req, res) {
    return res.json({ WIP: true });
  }

  async destroy(req, res) {
    const { id } = req.params;

    if (!id) {
      return res.status(401).json({ error: 'Id not given.' });
    }

    try {
      const production_data = await ProductionData.findByPk(id);

      production_data.destroy();

      return res.json({ success: 'Data successful deleted!' });
    } catch (error) {
      return res.status(400).json({ error: 'Error on delete data!' });
    }
  }
}

module.exports = new ProductionDataController();
