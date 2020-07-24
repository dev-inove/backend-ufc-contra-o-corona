const User = require('../models/User');
const Yup = require('yup');
const bcrypt = require('bcryptjs');

class UserController {
  async store(req, res) {
    const schema = Yup.object().shape({
      fullName: Yup.string().required(),
      email: Yup.string().email().required(),
      password: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(401).json({ error: 'Validation fails!' });
    }
    const { fullName, email, password } = req.body;

    const exists = await User.findOne({ email });

    if (exists) {
      return res.status(400).json({ message: 'User alredy exists' });
    }

    try {
      const password_hash = await bcrypt.hash(password, 9);
      const user = await User.create({ fullName, email, password_hash });
      await user.save();
      const { createdAt, updatedAt, _id } = user;
      return res.json({
        user: { fullName, email, createdAt, updatedAt, _id },
      });
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

    const { fullName, email } = user;

    return res.json({ fullName, email });
  }

  async index(req, res) {
    const users = await User.findAll({ attributes: ['fullName', 'email'] });

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
      fullName: Yup.string(),
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

    if (update.fullName) {
      user.fullName = update.fullName;
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
