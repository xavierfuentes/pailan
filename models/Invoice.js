import { Schema, model } from 'mongoose';

const invoiceSchema = new Schema(
  {
    owner: { type: Schema.Types.ObjectId, index: true, default: undefined },
    service: { type: Schema.Types.ObjectId, index: true, default: undefined },
    date: Date,
    amount: Number,
    // file: { data: Buffer, contentType: String },
  },
  { timestamps: true },
);

const Invoice = model('Invoice', invoiceSchema);

module.exports = Invoice;
