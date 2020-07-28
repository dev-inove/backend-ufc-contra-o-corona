const Production = require('../models/Production');
const User = require('../models/User');
const ProductionData = require('../models/ProductionData');
const Yup = require('yup');

class ProductionController {
  async store(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      subtitle: Yup.string().required(),
      responsible: Yup.string().required(),
      situation: Yup.string().required(),
      listOfProductions: Yup.array().of(Yup.string()),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(401).json({ error: 'Validation fails.' });
    }

    const { responsible, title } = req.body;
    const existsResponsible = await User.findOne({ _id: responsible }, '_id');

    if (!existsResponsible) {
      return res.status(400).json({ message: "User don't exists" });
    }

    const existsTitle = await Production.findOne({ title });

    if (existsTitle) {
      return res.status(400).json({ message: 'Production already exists' });
    }

    try {
      const production = await Production.create(req.body);
      await production.save();
      return res.json({ id: production._id });
    } catch (error) {
      return res.status(400).json({ message: `Error on create ${title}` });
    }
  }

  async index(req, res) {
    const productions = await Production.find();

    if (!productions) {
      return res.status(400).json({ error: 'No productions founded!' });
    }

    return res.json(productions);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string(),
      subtitle: Yup.string(),
      responsible: Yup.string(),
      situation: Yup.string(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(401).json({ error: 'Validation fails.' });
    }

    const titleQuery = req.query.title;

    if (!titleQuery) {
      return res.status(401).json({ error: 'Title not given!' });
    }

    try {
      const production = await Production.findOne({ title: titleQuery });
      if (!production) {
        return res.status(400).json({ error: 'No production founded!' });
      }

      production.set(req.body);
      await production.save();
      return res.json(production);
    } catch (error) {
      return res.status(400).json({ message: `Error on create ${title}` });
    }
  }

  async show(req, res) {
    const { title } = req.query;

    if (!title) {
      return res.status(401).json({ error: 'title not given.' });
    }

    try {
      const production = await Production.findOne({ title });
      if (!production)
        return res.json({ message: "This Production don't exits" });
      // missing the acoplation with prodData

      return res.json({ Production: production });
    } catch (error) {
      return res.status(400).json({ error: 'Error on showing production' });
    }
  }

  async destroy(req, res) {
    const { title } = req.query;

    if (!title) {
      return res.status(401).json({ error: 'title not given.' });
    }

    try {
      const production = await Production.findOne({ title });

      await production.remove();

      return res.json({ success: 'Production successful deleted!' });
    } catch (error) {
      return res.status(400).json({ error: 'Error on delete production!' });
    }
  }
}

module.exports = new ProductionController();
