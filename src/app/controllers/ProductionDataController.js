const ProductionData = require('../models/ProductionData');
const Yup = require('yup');

class ProductionDataController {
  async store(req, res) {
    const schema = Yup.object().shape({
      data: Yup.string().required(),
      value: Yup.number().positive().required(),
      production_id: Yup.number().positive().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(401).json({ error: 'Validation fails!' });
    }

    const { value, data, production_id } = req.body;

    const production_data = await ProductionData.create({
      value,
      data,
      production_id,
    });

    return res.json(production_data);
  }

  async index(req, res) {
    const production_data = await ProductionData.findAll();

    if (!production_data) {
      return res.status(400).json({ error: 'No data founded!' });
    }

    return res.json(production_data);
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
