import React from "react";

const Faq = () => {
  return (
    <div className="max-w-3xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-6">FAQ</h1>
      <div className="space-y-4">
        <div>
          <h3 className="font-semibold">How long does delivery take?</h3>
          <p className="text-gray-700">Usually within 3-7 business days.</p>
        </div>
        <div>
          <h3 className="font-semibold">What payment methods do you accept?</h3>
          <p className="text-gray-700">We accept Credit/Debit cards, UPI, and Net Banking.</p>
        </div>
        <div>
          <h3 className="font-semibold">Can I return an item?</h3>
          <p className="text-gray-700">Yes, within 30 days of delivery. See our return policy.</p>
        </div>
      </div>
    </div>
  );
};

export default Faq;
