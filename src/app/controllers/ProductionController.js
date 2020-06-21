const Production = require('../models/Production');
const ProductionData = require('../models/ProductionData');
const Yup = require('yup');

class ProductionController {
  async store(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      subtitle: Yup.string().required(),
      situation: Yup.string().required(),
      user_id: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(401).json({ error: 'Validation fails.' });
    }

    const { title, subtitle, situation, user_id } = req.body;

    const production = await Production.create({
      title,
      subtitle,
      situation,
      user_id,
    });

    return res.json(production);
  }

  async index(req, res) {
    const productions = await Production.findAll({
      include: [{ model: User, as: 'user' }],
    });

    if (!productions) {
      return res.status(400).json({ error: 'No productions founded!' });
    }

    return res.json(productions);
  }

  async update(req, res) {
    const { id } = req.params;

    if (!id) {
      return res.status(401).json({ error: 'Id not given!' });
    }

    const schema = Yup.object().shape({
      title: Yup.string(),
      subtitle: Yup.string(),
      situation: Yup.string(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(401).json({ error: 'Validation fails.' });
    }

    const production = await Production.findByPk(id);

    const { title, subtitle, situation } = req.body;

    if (title) {
      production.title = title;
    }

    if (subtitle) {
      production.subtitle = subtitle;
    }

    if (situation) {
      production.situation = situation;
    }

    production.save();

    return res.json(production);
  }

  async show(req, res) {
    const { id } = req.params;

    if (!id) {
      return res.status(401).json({ error: 'Id not given.' });
    }

    try {
      const { title } = await Production.findByPk(id);

      const production_data = await ProductionData.findAll({
        include: [
          {
            model: DistribuitionLocation,
            as: 'location',
          },
        ],
        where: { production_id: id },
        attributes: [
          'location',
          'quantity',
          'production_date',
          'distribuition_date',
        ],
      });

      return res.json({ title, production_data });
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
