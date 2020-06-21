const User = require('../models/User');
const Yup = require('yup');

class UserController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      fullname: Yup.string().required(),
      principal_phone: Yup.number().positive().required(),
      alternative_phone: Yup.number().positive(),
      email: Yup.string().email().required(),
      password: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(401).json({ error: 'Validation fails!' });
    }

    try {
      const { id, name, email } = await User.create(req.body);

      return res.json({ id, name, email });
    } catch (e) {
      return res.status(400).json({ error: 'Error registering user!' });
    }
  }

  async show(req, res) {
    const schema = Yup.object().shape({
      id: Yup.number().positive().required(),
    });

    if (!(await schema.isValid(req.params))) {
      return res.status(401).json({ error: 'Validation fails!' });
    }

    const user = await User.findByPk(req.params.id);

    if (!user) {
      return res.status(400).json({ error: "User doesn't exists!" });
    }

    const { name, email } = user;

    return res.json({ name, email });
  }

  async update(req, res) {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ error: 'Id not given.' });
    }

    const schema = Yup.object().shape({
      name: Yup.string(),
      fullname: Yup.string(),
      principal_phone: Yup.number().positive(),
      alternative_phone: Yup.number().positive(),
      email: Yup.string().email(),
      password: Yup.string(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(401).json({ error: 'Validation fails!' });
    }

    const update = req.body;

    const user = await User.findByPk(req.params.id);

    if (update.password) {
      user.password = update.password;
    }

    if (update.name) {
      user.name = update.name;
    }

    if (update.fullname) {
      user.fullname = update.fullname;
    }

    if (update.principal_phone) {
      user.principal_phone = update.principal_phone;
    }

    if (update.alternative_phone) {
      user.alternative_phone = update.alternative_phone;
    }

    if (update.email) {
      user.email = update.email;
    }

    user.save();

    return res.json(user);
  }

  async destroy(req, res) {
    const schema = Yup.object().shape({
      id: Yup.number().positive().positive().required(),
    });

    if (!(await schema.isValid(req.params))) {
      return res.status(401).json({ error: 'Validation fails!' });
    }

    try {
      const user = await User.findByPk(req.params.id);

      user.destroy();

      return res.json({ success: 'User successfuly deleted!' });
    } catch (e) {
      return res.status(400).json({ error: "User doesn't exists!" });
    }
  }
}

module.exports = new UserController();
