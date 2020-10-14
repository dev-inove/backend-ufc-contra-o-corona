const Action = require('../models/Action');

class FilterController{
  async show(req,res){
    const {category_ref} = req.body

    try {
      const listActions = await Action.find({category_ref})

      if(!listActions)
        return res.status(400).json({message:"Do not exists actions with this Catgory"})

      return res.status(200).json({listActions});
    } catch (error) {
      return res.status(400)
    }

  }
}

module.exports = new FilterController()
