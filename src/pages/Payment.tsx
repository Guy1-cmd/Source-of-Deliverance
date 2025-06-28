import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { DollarSign, CreditCard, Calendar, User, CheckCircle, ArrowRight, Heart, Gift, Cross, Banknote } from 'lucide-react';

const Payment = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [paymentType, setPaymentType] = useState('tithe');
  
  const [formData, setFormData] = useState({
    memberEmail: '',
    memberName: '',
    paymentType: 'tithe',
    amount: '',
    paymentMethod: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: '',
    mobileNumber: '',
    reference: '',
    notes: ''
  });

  const paymentMethods = [
    { id: 'card', name: 'Credit/Debit Card', icon: <CreditCard className="w-5 h-5" /> },
    { id: 'mobile', name: 'Mobile Money', icon: <Banknote className="w-5 h-5" /> },
    { id: 'bank', name: 'Bank Transfer', icon: <DollarSign className="w-5 h-5" /> }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePaymentTypeChange = (type: string) => {
    setPaymentType(type);
    setFormData(prev => ({
      ...prev,
      paymentType: type
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Payment submitted:', formData);
    setIsSubmitted(true);
    
    // Reset form after 5 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        memberEmail: '',
        memberName: '',
        paymentType: 'tithe',
        amount: '',
        paymentMethod: '',
        cardNumber: '',
        expiryDate: '',
        cvv: '',
        cardholderName: '',
        mobileNumber: '',
        reference: '',
        notes: ''
      });
      setPaymentType('tithe');
    }, 5000);
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCardNumber(e.target.value);
    setFormData(prev => ({
      ...prev,
      cardNumber: formatted
    }));
  };

  return (
    <div className="pt-20 min-h-screen bg-gradient-to-br from-green-900 via-green-800 to-blue-900 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-yellow-400/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-green-400/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-blue-400/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 flex items-center justify-center min-h-screen px-4 py-12">
        <div className="w-full max-w-4xl mx-auto">
          {/* Success Message */}
          {isSubmitted && (
            <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-2xl p-8 text-center mb-8 text-white shadow-2xl">
              <CheckCircle className="w-16 h-16 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-2">Payment Successful!</h3>
              <p className="text-green-100">Thank you for your generous contribution. May God bless you abundantly!</p>
              <div className="mt-4 bg-white/20 rounded-lg p-4">
                <p className="text-sm">
                  <strong>Amount:</strong> ${formData.amount} | 
                  <strong> Type:</strong> {formData.paymentType === 'tithe' ? 'Tithe' : 'Offering'}
                </p>
              </div>
            </div>
          )}

          {/* Form Container */}
          {!isSubmitted && (
            <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/20">
              <div className="text-center mb-8">
                <div className="flex justify-center mb-4">
                  <div className="bg-gradient-to-r from-green-500 to-blue-600 p-4 rounded-full">
                    <Cross className="w-8 h-8 text-white" />
                  </div>
                </div>
                <h3 className="text-3xl font-bold text-green-600 mb-2">
                  Tithe & Offerings
                </h3>
                <p className="text-gray-600">
                  "Give, and it will be given to you. A good measure, pressed down, shaken together and running over" - Luke 6:38
                </p>
              </div>

              {/* Payment Type Selection */}
              <div className="mb-8">
                <h4 className="text-lg font-bold text-gray-800 mb-4">Select Payment Type</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => handlePaymentTypeChange('tithe')}
                    className={`p-6 rounded-xl border-2 transition-all duration-300 ${
                      paymentType === 'tithe'
                        ? 'border-green-500 bg-green-50 text-green-700'
                        : 'border-gray-200 bg-white text-gray-600 hover:border-green-300'
                    }`}
                  >
                    <Heart className="w-8 h-8 mx-auto mb-3 text-green-500" />
                    <h5 className="font-bold text-lg mb-2">Tithe</h5>
                    <p className="text-sm">
                      "Bring the whole tithe into the storehouse" - Malachi 3:10
                    </p>
                  </button>
                  
                  <button
                    type="button"
                    onClick={() => handlePaymentTypeChange('offering')}
                    className={`p-6 rounded-xl border-2 transition-all duration-300 ${
                      paymentType === 'offering'
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-200 bg-white text-gray-600 hover:border-blue-300'
                    }`}
                  >
                    <Gift className="w-8 h-8 mx-auto mb-3 text-blue-500" />
                    <h5 className="font-bold text-lg mb-2">Offering</h5>
                    <p className="text-sm">
                      "Each of you should give what you have decided in your heart" - 2 Corinthians 9:7
                    </p>
                  </button>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Member Information Section */}
                <div className="bg-gray-50 rounded-2xl p-6">
                  <h4 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                    <User className="w-5 h-5 mr-2 text-green-600" />
                    Member Information
                  </h4>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Member Email */}
                    <div className="space-y-2">
                      <label htmlFor="memberEmail" className="block text-sm font-semibold text-gray-700">
                        Registered Email *
                      </label>
                      <input
                        type="email"
                        id="memberEmail"
                        name="memberEmail"
                        required
                        value={formData.memberEmail}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-green-500/20 focus:border-green-500 transition-all duration-200 bg-white text-gray-800 placeholder-gray-400"
                        placeholder="Enter your registered email"
                      />
                    </div>

                    {/* Member Name */}
                    <div className="space-y-2">
                      <label htmlFor="memberName" className="block text-sm font-semibold text-gray-700">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="memberName"
                        name="memberName"
                        required
                        value={formData.memberName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-green-500/20 focus:border-green-500 transition-all duration-200 bg-white text-gray-800 placeholder-gray-400"
                        placeholder="Enter your full name"
                      />
                    </div>
                  </div>
                </div>

                {/* Payment Details Section */}
                <div className="bg-blue-50 rounded-2xl p-6">
                  <h4 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                    <DollarSign className="w-5 h-5 mr-2 text-blue-600" />
                    Payment Details
                  </h4>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Amount */}
                    <div className="space-y-2">
                      <label htmlFor="amount" className="block text-sm font-semibold text-gray-700">
                        Amount (USD) *
                      </label>
                      <div className="relative">
                        <DollarSign className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                          type="number"
                          id="amount"
                          name="amount"
                          required
                          min="1"
                          step="0.01"
                          value={formData.amount}
                          onChange={handleInputChange}
                          className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 bg-white text-gray-800 placeholder-gray-400"
                          placeholder="0.00"
                        />
                      </div>
                    </div>

                    {/* Payment Method */}
                    <div className="space-y-2">
                      <label htmlFor="paymentMethod" className="block text-sm font-semibold text-gray-700">
                        Payment Method *
                      </label>
                      <select
                        id="paymentMethod"
                        name="paymentMethod"
                        required
                        value={formData.paymentMethod}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 bg-white text-gray-800 appearance-none"
                      >
                        <option value="">Select Payment Method</option>
                        {paymentMethods.map((method) => (
                          <option key={method.id} value={method.id}>
                            {method.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Payment Method Specific Fields */}
                {formData.paymentMethod === 'card' && (
                  <div className="bg-yellow-50 rounded-2xl p-6">
                    <h4 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                      <CreditCard className="w-5 h-5 mr-2 text-yellow-600" />
                      Card Information
                    </h4>
                    
                    <div className="space-y-6">
                      {/* Cardholder Name */}
                      <div className="space-y-2">
                        <label htmlFor="cardholderName" className="block text-sm font-semibold text-gray-700">
                          Cardholder Name *
                        </label>
                        <input
                          type="text"
                          id="cardholderName"
                          name="cardholderName"
                          required={formData.paymentMethod === 'card'}
                          value={formData.cardholderName}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-yellow-500/20 focus:border-yellow-500 transition-all duration-200 bg-white text-gray-800 placeholder-gray-400"
                          placeholder="Name on card"
                        />
                      </div>

                      {/* Card Number */}
                      <div className="space-y-2">
                        <label htmlFor="cardNumber" className="block text-sm font-semibold text-gray-700">
                          Card Number *
                        </label>
                        <input
                          type="text"
                          id="cardNumber"
                          name="cardNumber"
                          required={formData.paymentMethod === 'card'}
                          value={formData.cardNumber}
                          onChange={handleCardNumberChange}
                          maxLength={19}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-yellow-500/20 focus:border-yellow-500 transition-all duration-200 bg-white text-gray-800 placeholder-gray-400"
                          placeholder="1234 5678 9012 3456"
                        />
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        {/* Expiry Date */}
                        <div className="space-y-2">
                          <label htmlFor="expiryDate" className="block text-sm font-semibold text-gray-700">
                            Expiry Date *
                          </label>
                          <input
                            type="text"
                            id="expiryDate"
                            name="expiryDate"
                            required={formData.paymentMethod === 'card'}
                            value={formData.expiryDate}
                            onChange={handleInputChange}
                            placeholder="MM/YY"
                            maxLength={5}
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-yellow-500/20 focus:border-yellow-500 transition-all duration-200 bg-white text-gray-800 placeholder-gray-400"
                          />
                        </div>

                        {/* CVV */}
                        <div className="space-y-2">
                          <label htmlFor="cvv" className="block text-sm font-semibold text-gray-700">
                            CVV *
                          </label>
                          <input
                            type="text"
                            id="cvv"
                            name="cvv"
                            required={formData.paymentMethod === 'card'}
                            value={formData.cvv}
                            onChange={handleInputChange}
                            maxLength={4}
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-yellow-500/20 focus:border-yellow-500 transition-all duration-200 bg-white text-gray-800 placeholder-gray-400"
                            placeholder="123"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {formData.paymentMethod === 'mobile' && (
                  <div className="bg-green-50 rounded-2xl p-6">
                    <h4 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                      <Banknote className="w-5 h-5 mr-2 text-green-600" />
                      Mobile Money Information
                    </h4>
                    
                    <div className="space-y-6">
                      {/* Mobile Number */}
                      <div className="space-y-2">
                        <label htmlFor="mobileNumber" className="block text-sm font-semibold text-gray-700">
                          Mobile Number *
                        </label>
                        <input
                          type="tel"
                          id="mobileNumber"
                          name="mobileNumber"
                          required={formData.paymentMethod === 'mobile'}
                          value={formData.mobileNumber}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-green-500/20 focus:border-green-500 transition-all duration-200 bg-white text-gray-800 placeholder-gray-400"
                          placeholder="+250 123 456 789"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {formData.paymentMethod === 'bank' && (
                  <div className="bg-purple-50 rounded-2xl p-6">
                    <h4 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                      <DollarSign className="w-5 h-5 mr-2 text-purple-600" />
                      Bank Transfer Information
                    </h4>
                    
                    <div className="bg-white rounded-lg p-4 mb-4">
                      <h5 className="font-bold text-gray-800 mb-2">Bank Details:</h5>
                      <p className="text-sm text-gray-600 mb-1"><strong>Bank:</strong> Source of Deliverance Church</p>
                      <p className="text-sm text-gray-600 mb-1"><strong>Account:</strong> 123-456-789</p>
                      <p className="text-sm text-gray-600"><strong>Reference:</strong> Use your email as reference</p>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="reference" className="block text-sm font-semibold text-gray-700">
                        Transfer Reference *
                      </label>
                      <input
                        type="text"
                        id="reference"
                        name="reference"
                        required={formData.paymentMethod === 'bank'}
                        value={formData.reference}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 transition-all duration-200 bg-white text-gray-800 placeholder-gray-400"
                        placeholder="Enter transfer reference number"
                      />
                    </div>
                  </div>
                )}

                {/* Notes Section */}
                <div className="bg-gray-50 rounded-2xl p-6">
                  <h4 className="text-xl font-bold text-gray-800 mb-6">Additional Notes (Optional)</h4>
                  <textarea
                    id="notes"
                    name="notes"
                    value={formData.notes}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-gray-500/20 focus:border-gray-500 transition-all duration-200 bg-white text-gray-800 placeholder-gray-400 resize-none"
                    placeholder="Any special prayer requests or notes..."
                  />
                </div>

                {/* Submit Button */}
                <div className="pt-6">
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center group"
                  >
                    Complete Payment
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>

                {/* Security Notice */}
                <div className="text-center text-sm text-gray-600 bg-blue-50 rounded-lg p-4">
                  <p className="mb-2">🔒 Your payment information is secure and encrypted</p>
                  <p>"Honor the Lord with your wealth, with the firstfruits of all your crops" - Proverbs 3:9</p>
                </div>
              </form>
            </div>
          )}

          {/* Navigation Links */}
          <div className="flex justify-between items-center mt-8 text-white/80">
            <Link
              to="/"
              className="inline-flex items-center hover:text-white font-semibold transition-colors group"
            >
              <ArrowRight className="w-4 h-4 mr-2 rotate-180 group-hover:-translate-x-1 transition-transform" />
              Back to Home
            </Link>
            
            <Link
              to="/register"
              className="inline-flex items-center hover:text-white font-semibold transition-colors group"
            >
              Not a member? Register
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;