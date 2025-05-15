import React, { useEffect, useState } from 'react'

export const Timer = ({ time }) => {
    const [seconds, setSeconds] = useState(time * 60);

    useEffect(() => {
        const timer = setInterval(() => {
            setSeconds((prevSeconds) => prevSeconds - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    return (
        <div className="bg-primary text-white p-4 w-24 h-24 text-center items-center rounded-full">
            <div className='text-lg'>Timer</div>
            <span className="text-2xl font-bold">{minutes < 10 ? `0${minutes}` : minutes}:{remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds}</span>
        </div>
    );
};