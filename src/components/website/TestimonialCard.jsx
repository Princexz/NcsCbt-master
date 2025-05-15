import React from 'react';
import quote from '../../assets/quot.png'

export const TestimonialCard = ({ name, title, testimonial }) => (
    <div
        className='bg-white rounded-lg shadow-md p-6 flex gap-4 items-start'
    >
        <img src={quote} alt="quote" />
        <div>
            <p className="text-gray-600 mb-4">{testimonial}</p>
            <div className="font-bold">{name}</div>
            <div className="text-gray-500">{title}</div>
        </div>
    </div>
);