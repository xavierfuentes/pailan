const mongoose = require('mongoose');
const slug = require('slug');

const serviceSchema = new mongoose.Schema(
  {
    name: String,
    slug: { type: String, unique: true, index: true },
    url: String,
    // logo: String,
    owner: { type: mongoose.Schema.Types.ObjectId, index: true },
    user: String,
    password: String,
  },
  { timestamps: true }
);

serviceSchema.pre('save', function save(next) {
  const service = this;

  service.slug = slug(service.name);
  next();
});

serviceSchema.query.allByUser = function(id) {
  return this.find({ $or: [{ owner: id }, { owner: 'default' }] });
};

serviceSchema.query.allPrivateByUser = function(id) {
  return this.find({ owner: id });
};

serviceSchema.query.allDefault = function() {
  return this.find({ owner: 'default' });
};

const Service = mongoose.model('Service', serviceSchema);

module.exports = Service;
