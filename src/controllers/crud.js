// the schema is supplied by injection
class CrudController {
  constructor(model) {
    this.model = model;
  }

  create = async (req, res, next) => {

    const entity = new this.model(req.body);
    await entity.save();
    res.status(201).json(entity);
  };

  getAll = async (req, res, next) => {
    const entities = await this.model.find();
    res.status(200).send(entities);
  };

  getOne = async (req, res, next) => {
    const entity = await this.model.findById(req.params.id);
    res.status(200).send(entity);
  };

  getBatch = async (req, res) => {
    const startIndex = req.params.batch * req.params.amount;
    let entities = await this.model.find();
    let response = [];

    await entities.sort((a, b) => {
      new Date(a.date) - new Date(b.date);
    });
    await entities
      .slice(startIndex, startIndex + req.params.amount)
      .map((item) => {
        response.push(item);
      });
    res.status(200).send(response);
  };

  update = async (req, res, next) => {
    await this.model.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).json({ id: req.body._id }).end();
  };

  delete = async (req, res, next) => {
    const entity = await this.model.findById(req.params.id);
    await entity.delete();
    res.status(204).end();
  };
}

module.exports = CrudController;
