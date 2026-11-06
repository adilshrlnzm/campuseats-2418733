// useState for form values + validation errors
import { useState } from 'react';

// Constant mahallah list for the dropdown
const MAHALLAHS = ['Ali', 'Aminah', 'Faruq', 'Asiah', 'Bilal', 'Hafsa', 'Uthman', 'Zubair'];

// Pure validation: values in → errors object out. {} = valid.
function validate(values) {
  const errors = {};
  // Name: at least 3 non-whitespace characters
  if (values.name.trim().length < 3) errors.name = 'Enter your name (at least 3 characters).';
  // Mahallah: must be selected
  if (!values.mahallah) errors.mahallah = 'Mahallah must be chosen.';
  // Pickup time: string comparison works for "HH:MM"
  if (values.pickupTime < '07:00' || values.pickupTime > '22:00') {
    errors.pickupTime = 'Pickup time must be between 07:00 and 22:00.';
  }
  return errors;
}

function CheckoutForm({ onPlaceOrder }) {
  // Controlled state for every field
  const [values, setValues] = useState({ name: '', mahallah: '', pickupTime: '' });
  // Error state (same keys, only populated after submit)
  const [errors, setErrors] = useState({});

  // One generic handler for ALL inputs.
  // event.target.name matches a key in values.
  function handleChange(event) {
    const { name, value } = event.target;
    // Functional update: merge new value into previous state
    setValues((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();          // stop page reload
    const found = validate(values);  // run validation
    setErrors(found);                // show errors
    // No error keys → form is valid → tell the parent
    if (Object.keys(found).length === 0) {
      onPlaceOrder(values);
    }
  }

  return (
    // noValidate disables browser's own popups
<form className="form" onSubmit={handleSubmit} noValidate>
      <h3>Checkout</h3>

      {/* NAME field - controlled by values.name */}
      <label htmlFor="name">Name</label>
      <input id="name" name="name" value={values.name} onChange={handleChange} />
      {errors.name && <p className="field-error">{errors.name}</p>}

      {/* MAHALLAH dropdown - controlled by values.mahallah */}
      <label htmlFor="mahallah">Mahallah</label>
      <select id="mahallah" name="mahallah" value={values.mahallah} onChange={handleChange}>
        <option value="">--Select--</option>
        {/* One <option> per mahallah */}
        {MAHALLAHS.map((m) => <option key={m} value={m}>{m}</option>)}
      </select>
      {errors.mahallah && <p className="field-error">{errors.mahallah}</p>}

      {/* PICKUP TIME - native time picker */}
      <label htmlFor="pickupTime">Pickup Time</label>
      <input
        id="pickupTime"
        type="time"
        name="pickupTime"
        value={values.pickupTime}
        onChange={handleChange}
      />
      {errors.pickupTime && <p className="field-error">{errors.pickupTime}</p>}

      {/* Submit button triggers the form's onSubmit */}
      <button type="submit" className="btn">Place order</button>
    </form>
  );
}

export default CheckoutForm;

// ============================================================
// SUMMARY
// ============================================================
// The checkout form: collects name, mahallah, pickup time.
// Validates on submit via the standalone validate() function.
// Only calls onPlaceOrder(values) if there are no errors.
// Uses one generic handleChange() for every field via input name.
// Think of it as the order form at the counter.
// ============================================================