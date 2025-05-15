import React from 'react'

export const OverviewCard = ({ cardStyles, label, icon, cardValue, cardClick }) => {
    return (
        <div
            className={`bg-white rounded-lg shadow-md flex items-center cursor-pointer w-full gap-4 ${cardStyles}`}
            onClick={cardClick}
        >
            <div className=''>
                {icon}
            </div>
            <div>
                <div className="font-bold text-lg md:text-2xl">{cardValue}</div>
                <div className="text-xs font-light" >{label}</div>
            </div>
        </div>
    )
}
