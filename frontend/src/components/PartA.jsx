import React from 'react';

export default function PartA({ formData, handleChange }) {
  return (
    <section>
      <h3>Part A</h3>
      <div>
        <label>Full name</label>
        <input name="fullName" value={formData.fullName || ''} onChange={handleChange} />
      </div>
      <div>
        <label>Email</label>
        <input name="email" value={formData.email || ''} onChange={handleChange} />
      </div>
    </section>
  );
}
