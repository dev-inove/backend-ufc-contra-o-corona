const User = require('../models/User');
const Yup = require('yup');

class UserController {
  async store(req, res) {
    const schema = Yup.object().shape({
      fullname: Yup.string().required(),
      email: Yup.string().email().required(),
      password: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(401).json({ error: 'Validation fails!' });
    }

    try {
      const { id, fullname, email } = await User.create(req.body);

      return res.json({ id, fullname, email });
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

    const { fullname, email } = user;

    return res.json({ fullname, email });
  }

  async index(req, res) {
    const users = await User.findAll({ attributes: ['fullname', 'email'] });

    if (!users) {
      return res.status(400).json({ error: 'No users founded' });
    }

    return res.json(users);
  }

  async update(req, res) {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ error: 'Id not given.' });
    }

    const schema = Yup.object().shape({
      fullname: Yup.string(),
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

    if (update.fullname) {
      user.fullname = update.fullname;
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
