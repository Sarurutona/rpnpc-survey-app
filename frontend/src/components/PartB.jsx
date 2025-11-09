import React from 'react';

export default function PartB({ formData, handleChange }) {
  return (
    <section>
      <h3>Part B</h3>
      <div>
        <label>Department</label>
        <input name="department" value={formData.department || ''} onChange={handleChange} />
      </div>
      <div>
        <label>Role</label>
        <input name="role" value={formData.role || ''} onChange={handleChange} />
      </div>
    </section>
  );
}
