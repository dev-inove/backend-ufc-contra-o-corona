const Production = require('../models/Production');
const ProductionData = require('../models/ProductionData');
const Yup = require('yup');
const Sequelize = require('sequelize');

class ProductionController {
  async store(req, res) {
    const { name } = req.body;

    if (!name) {
      return res.status(401).json({ error: 'Name not given' });
    }

    const production = await Production.create({ name });

    return res.json(production);
  }

  async index(req, res) {
    const productions = await Production.findAll();

    if (!productions) {
      return res.status(400).json({ error: 'No productions founded!' });
    }

    return res.json(productions);
  }

  async show(req, res) {
    const { id } = req.params;

    if (!id) {
      return res.status(401).json({ error: 'Id not given.' });
    }

    try {
      const { name } = await Production.findByPk(id);

      const production_data = await ProductionData.findAll({
        where: { production_id: id },
        attributes: ['data', 'value'],
      });

      return res.json({ name, production_data });
    } catch (error) {
      return res.status(400).json({ error: 'Error on showing production' });
    }
  }

  async destroy(req, res) {
    const { id } = req.params;

    if (!id) {
      return res.status(401).json({ error: 'Id not given.' });
    }

    try {
      const production = await Production.findByPk(id);

      production.destroy();

      return res.json({ success: 'Production successful deleted!' });
    } catch (error) {
      return res.status(400).json({ error: 'Error on delete production!' });
    }
  }
}

module.exports = new ProductionController();
