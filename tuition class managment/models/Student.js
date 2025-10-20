const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String },
  email: { type: String, required: true, unique: true },
  phone: { type: String },
  class: { type: String },
  subject: { type: String },
  totalFees: { type: Number, default: 0 },
  feesPaid: { type: Number, default: 0 },
  status: { type: String, enum: ['Active','Inactive'], default: 'Active' },
  remarks: { type: String },
  enrolledAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Student', studentSchema);
