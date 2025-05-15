import React from 'react';
import { Button } from '../shared/Button';

export const Contact = () => {
    return (
        <div className="mx-auto px-4">
            <div className="text-center">
                <h2 className="text-2xl md:text-4xl font-bold text-primary mb-4">CONTACT INFORMATION</h2>
                <p className="mb-8 text-sm md:text-md text-grey">
                    Feel free to reach out to us through various channels. We are available by phone, email, and social media for your convenience.
                </p>
            </div>

            <div className="md:p-10 p-3 md:flex gap-10">
                <div className='md:w-2/3 text-center'>
                    <h3 className="text-xl md:text-4xl font-semibold text-primary mb-4">SEND ME A MESSAGE</h3>
                    <p className="mb-6 text-sm md:text-md text-grey">Have a specific inquiry or message for us? Please use the contact form below, and we'll get back to you promptly.</p>
                </div>

                <form className='w-full flex flex-col gap-4'>
                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                        <div>
                            <label htmlFor="firstName" className="block mb-2">
                                First Name
                            </label>
                            <input
                                type="text"
                                id="firstName"
                                className="w-full py-2 px-3 border-b border-b-grey bg-transparent focus:border-b-primary focus:outline-none"
                                placeholder="FIRST NAME"
                            />
                        </div>
                        <div>
                            <label htmlFor="lastName" className="block mb-2">
                                Last Name
                            </label>
                            <input
                                type="text"
                                id="lastName"
                                className="w-full py-2 px-3 border-b border-b-grey bg-transparent focus:border-b-primary focus:outline-none"
                                placeholder="LAST NAME"
                            />
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                        <div>
                            <label htmlFor="email" className="block mb-2">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                className="w-full py-2 px-3 border-b border-b-grey bg-transparent focus:border-b-primary focus:outline-none"
                                placeholder="EMAIL ADDRESS"
                            />
                        </div>

                        <div>
                            <label htmlFor="phone" className="block mb-2">
                                Phone Number
                            </label>
                            <input
                                type="tel"
                                id="phone"
                                className="w-full py-2 px-3 border-b border-b-grey bg-transparent focus:border-b-primary focus:outline-none"
                                placeholder="PHONE NUMBER"
                            />
                        </div>
                    </div>

                    <div className="mb-6">
                        <label htmlFor="message" className="block mb-2">
                            Your Message
                        </label>
                        <textarea
                            id="message"
                            className="w-full px-3 border-b border-b-grey bg-transparent focus:border-b-primary focus:outline-none"
                            placeholder="MESSAGE"
                        ></textarea>
                    </div>

                    <div className='flex justify-center md:justify-start'>
                    <Button title="Send message" btnStyles="bg-primary w-fit hover:bg-green-600 text-white py-3 px-4 rounded-md" />
                    </div>
                </form>
            </div>
        </div>
    );
};