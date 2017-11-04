const encrypt = require('../lib/encription').encrypt;
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const serviceSchema = new Schema(
  {
    name: String,
    url: String,
    logo: String,
    category: String,
    owner: { type: Schema.Types.ObjectId, index: true, default: undefined },
    user: String,
    password: String,
    invoices: [{ type: Schema.Types.ObjectId, ref: 'Invoice' }]
  },
  { timestamps: true },
);

serviceSchema.pre('save', function save(next) {
  const service = this;

  if (!service.isModified('password')) {
    return next();
  }

  // encrypt user's username and password
  // service.user = encrypt(service.user);
  service.password = encrypt(service.password);

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
