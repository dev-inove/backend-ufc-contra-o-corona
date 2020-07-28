const ProductionData = require('../models/ProductionData');
const Production = require('../models/Production');

const Yup = require('yup');

class ProductionDataController {
  async store(req, res) {
    const schema = Yup.object().shape({
      location: Yup.string().required(),
      quantity: Yup.number().positive().required(),
      productionDate: Yup.date().required(),
      distributionDate: Yup.date().required(),

      productionId: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(401).json({ error: 'Validation fails!' });
    }

    try {
      const { productionId } = req.body;

      const production = await Production.findOne({ _id: productionId });

      if (!production) {
        return res.status(400).json({ message: 'Production dont exists' });
      }

      const productionData = await ProductionData.create(req.body);

      await productionData.save();
      production.listOfProductions.push(productionData._id);
      production.save();
      return res.json(productionData);
    } catch (error) {
      return res
        .status(400)
        .json({ error: 'Error on create production data.' });
    }
  }

  async index(req, res) {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: 'Production Data dont exists' });
    }
    const production = await Production.findOne({ _id: id });

    if (!production)
      return res.status(400).json({ message: 'production dont exists' });

    // const listOfProductions2 = await production.listOfProductions.map(
    //   async (e) => {
    //     return await ProductionData.findOne({ _id: e });
    //   }
    // );

    const listOfProductions = async () => {
      return Promise.all(
        production.listOfProductions.map((item) => {
          return ProductionData.findOne({ _id: item });
        })
      );
    };
    const list = await listOfProductions().then((e) => e);
    if (!list) {
      return res.status(400).json({ error: 'No data founded!' });
    }
    return res.json({ listOfProductions: list });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      location: Yup.string(),
      quantity: Yup.number().positive(),
      productionDate: Yup.date(),
      distributionDate: Yup.date(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(401).json({ error: 'Validation fails!' });
    }

    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: 'Production Data dont exists' });
    }

    try {
      const productionData = await ProductionData.findOne({ _id: id });
      if (!productionData) {
        return res.status(400).json({ message: 'ProdData not found' });
      }

      productionData.set(req.body);
      await productionData.save();
      return res.json({ productionData });
    } catch (error) {
      return res.status(400).json({ message: `An error ocurred, try again` });
    }
  }

  async destroy(req, res) {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ error: 'Id not given.' });
    }

    try {
      const productionData = await ProductionData.findOne({ _id: id });
      const { productionId } = productionData;
      const production = await Production.findOne({ _id: productionId });

      if (!production || !productionData) {
        return res
          .status(400)
          .json({ message: 'Production or Production data not found' });
      }

      production.listOfProductions.splice(productionData._id, 1);
      await production.save();
      await productionData.remove();

      return res.json({
        success: 'Data successful deleted!',
      });
    } catch (error) {
      return res.status(400).json({ error: 'Error on delete data!' });
    }
  }
}

module.exports = new ProductionDataController();
