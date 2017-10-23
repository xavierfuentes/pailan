const mongoose = require('mongoose');
const slug = require('slug');

const Schema = mongoose.Schema;

const serviceSchema = new Schema(
  {
    name: String,
    slug: { type: String, unique: true, index: true },
    url: String,
    logo: String,
    category: String,
    owner: { type: Schema.Types.ObjectId, index: true, default: undefined },
    user: String,
    password: String,
    // invoices: [{ type: Schema.Types.ObjectId, ref: 'Invoice' }]
  },
  { timestamps: true },
);

serviceSchema.pre('save', function save(next) {
  const service = this;

  service.slug = slug(service.name, { lower: true });
  next();
});

serviceSchema.query.allByUser = function allByUser(id) {
  return this.find({ $or: [{ owner: id }, { owner: undefined }] });
};

serviceSchema.query.allPrivateByUser = function allPrivateByUser(id) {
  return this.find({ owner: id });
};

serviceSchema.query.allDefault = function allDefault() {
  return this.find({ owner: undefined }).sort('category');
};

const Service = mongoose.model('Service', serviceSchema);

module.exports = Service;
