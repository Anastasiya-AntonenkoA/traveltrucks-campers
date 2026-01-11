"use client";

import css from "./BookForm.module.css";
import toast from 'react-hot-toast';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";

export default function BookForm() {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget); 
    const data = Object.fromEntries(formData.entries());

    const finalData = {
      ...data,
      date: startDate
    };
    
    console.log("Booking Data:", finalData);
    toast.success("Booking successful!");

    setStartDate(null);
    e.currentTarget.reset(); 
  };

  return (
    <div className={css.container}>
      <h3 className={css.title}>Book your campervan now</h3>
      <p className={css.subtitle}>Stay connected! We are always ready to help you.</p>
      
      <form className={css.form} onSubmit={handleSubmit}>
        <input 
          name="name"
          type="text" 
          placeholder="Name*" 
          className={css.input} 
          required 
        />
        <input 
          name="email"
          type="email" 
          placeholder="Email*" 
          className={css.input} 
          required 
        />
        <DatePicker
          selected={startDate}
          onChange={(date: Date | null) => setStartDate(date)}
          className={css.input}
          placeholderText="Booking date*"
          dateFormat="dd.MM.yyyy"
          calendarStartDay={1}
          required
          autoComplete="off"
        />
        <textarea 
          name="comment"
          placeholder="Comment" 
          className={css.textarea} 
        ></textarea>
        
        <button type="submit" className={css.submitBtn}>
          Send
        </button>
      </form>
    </div>
  );
}