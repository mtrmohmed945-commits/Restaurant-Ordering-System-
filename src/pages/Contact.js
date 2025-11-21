import React, { useState } from "react";
import "../styles/Contact.css";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    alert(`Message Sent!\n\nName: ${formData.name}\nEmail: ${formData.email}\nMessage: ${formData.message}`);
    // Reset
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="contact-container">
      <h1>Contact Us</h1>

      <form onSubmit={handleSubmit} className="contact-form">
        <label>Name:</label>
        <input
          type="text"
          name="name"
          onChange={handleChange}
          value={formData.name}
          required
        />

        <label>Email:</label>
        <input
          type="email"
          name="email"
          onChange={handleChange}
          value={formData.email}
          required
        />

        <label>Message:</label>
        <textarea
          name="message"
          rows="5"
          onChange={handleChange}
          value={formData.message}
          required
        ></textarea>

        <button type="submit">Send</button>
      </form>
    </div>
  );
}
export default Contact