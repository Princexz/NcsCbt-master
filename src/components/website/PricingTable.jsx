import React from 'react';
import { Link } from 'react-router-dom';

export const PricingTable = () => {
    return (
        <div className="flex justify-center py-10">
            <div className="max-w-3xl w-full bg-story border border-grey shadow-md rounded-lg">
                <div className="grid grid-cols-4 my-4 border-b border-b-grey justify-between text-center ml-10">
                    <h2 className="md:text-lg font-semibold text-grey mb-4 md:col-span-2 flex justify-start">Benefits</h2>
                    <h2 className="md:text-lg font-semibold text-grey mb-4 col-span-1 mr-4">Free</h2>
                    <h2 className="md:text-lg font-semibold text-grey mb-4 col-span-1">Paid <br /> N1000/month</h2>
                </div>
                <div className="grid grid-cols-4 divide-x divide-grey text-grey">
                    <div className="col-span-2 px-10 text-left">
                        <ul className="space-y-10">
                            <li>Past Questions</li>
                            <li>Manage Your Time</li>
                            <li>Less Data</li>
                            <li>Reading Materials</li>
                            <li>Result History</li>
                        </ul>
                    </div>
                    <div className="col-span-1 px-8">
                        <ul className="space-y-10">
                            <li>Limited</li>
                            <li>
                                <span className="text-primary">&#10003;</span>
                            </li>
                            <li>
                                <span className="text-primary">&#10003;</span>
                            </li>
                            <li>No</li>
                            <li>No</li>
                        </ul>
                    </div>
                    <div className="col-span-1 px-10">
                        <ul className="space-y-10">
                            <li>
                                <span className="text-primary">&#10003;</span>
                            </li>
                            <li>
                                <span className="text-primary">&#10003;</span>
                            </li>
                            <li>
                                <span className="text-primary">&#10003;</span>
                            </li>
                            <li>
                                <span className="text-primary">&#10003;</span>
                            </li>
                            <li>
                                <span className="text-primary">&#10003;</span>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="flex justify-end py-6 px-7 gap-14">
                    <Link to="/create-account" className="bg-primary text-white font-semibold py-2 px-4 rounded-md mr-4"> Subscribe</Link>
                    <Link to="#" className="bg-primary text-white font-semibold py-2 px-4 rounded-md mr-4"> Subscribe</Link>
                </div>
            </div>
        </div>
    );
};