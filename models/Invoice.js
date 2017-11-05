const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const invoiceSchema = new Schema(
  {
    owner: { type: Schema.Types.ObjectId, index: true, default: undefined },
    service: { type: Schema.Types.ObjectId, index: true, default: undefined },
    date: Date,
    amount: Number,
    currency: String,
    // file: { data: Buffer, contentType: String },
  },
  { timestamps: true },
);

const Invoice = mongoose.model('Invoice', invoiceSchema);

module.exports = Invoice;
