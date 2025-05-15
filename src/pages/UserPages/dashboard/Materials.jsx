import React, { useEffect, useState } from 'react';
import { Header } from '../../../components/shared/Header';
import { useUserStore } from '../../../store/userStore';
import { Button } from '../../../components/shared/Button';

export const Materials = () => {
    const { userMaterials } = useUserStore();
    const [searchTerm, setSearchTerm] = useState('');
    const [displayedMaterials, setDisplayedMaterials] = useState([]);
    const [searchedMaterials, setSearchedMaterials] = useState([]);
    const [isSearching, setIsSearching] = useState(false);

    useEffect(() => {
        if (userMaterials.length > 10) {
            setDisplayedMaterials(userMaterials.slice(0, 8))
        } else {
            setDisplayedMaterials(userMaterials)
        }
    }, []);
    console.log(userMaterials);

    const handleSearch = (e) => {
        setIsSearching(true);
        const filteredMaterials = userMaterials.filter((material) => {
            const regex = new RegExp(searchTerm, 'i');
            const searchProperties = [material.materialDetails.customMetadata.name, material.materialDetails.customMetadata.rank, material.materialDetails.customMetadata.author];
            return searchProperties.some((property) => regex.test(property));
        });

        if (filteredMaterials.length === 1) {
            setSearchedMaterials(filteredMaterials);
        } else {
            setSearchedMaterials(filteredMaterials.slice(0, 8));
        }
        setSearchTerm("")
    };

    return (
        <div className="flex flex-col w-full p-8 md:p-10 gap-4">
            <Header title="Materials" />
            <main className="flex-grow">
                <section className='flex flex-col gap-4'>
                    <div className="flex mb-4">
                        <div className="relative w-full md:w-2/3 flex">
                            <input
                                type="text"
                                className="border rounded-md py-2 px-4 pr-10 w-full"
                                placeholder="Search by rank or title"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <div className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer" onClick={handleSearch}>
                                <svg
                                    className="h-5 w-5 text-gray-400"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                    />
                                </svg>
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {!isSearching &&
                            (displayedMaterials.length > 0 ? (
                                displayedMaterials.map((material, index) => (
                                    <div key={index} className="p-4 text-darkgrey w-full">
                                        <img
                                            src={material.materialDetails.customMetadata.materialCover}
                                            alt={material.materialDetails.customMetadata.name}
                                            className="w-full h-32 object-cover border-4 border-yellow rounded-md mb-2 bg-grey"
                                        />
                                        <h3 className="mb-1">{material.materialDetails.customMetadata.name}</h3>
                                        <div className="text-xs"> Rank: {material.materialDetails.customMetadata.rank}</div>
                                        <Button
                                            title="Download"
                                            btnStyles=" text-secondary bg-yellow px-2 py-1 rounded-md mt-2"
                                            btnClick={() => {
                                                const link = document.createElement("a");
                                                link.href = material.url;
                                                link.download = material.materialDetails.customMetadata.name;
                                                link.click();
                                            }}
                                        />
                                    </div>
                                ))
                            ) : (
                                <div className="text-center text-gray-500 text-xl col-span-5">
                                    No materials available
                                </div>)
                            )}
                        {isSearching &&
                            (searchedMaterials.length > 0 ? (
                                searchedMaterials.map((material, index) => (
                                    <div key={index} className="p-4 text-darkgrey w-full">
                                        <img
                                            src={material.materialDetails.customMetadata.materialCover}
                                            alt={material.materialDetails.customMetadata.name}
                                            className="w-full h-32 object-cover border-4 border-yellow rounded-md mb-2 bg-grey"
                                        />
                                        <h3 className="mb-1">{material.materialDetails.customMetadata.name}</h3>
                                        <div className="text-xs"> Rank: {material.materialDetails.customMetadata.rank}</div>
                                        <Button
                                            title="Download"
                                            btnStyles=" text-secondary bg-yellow px-2 py-1 rounded-md mt-2"
                                            btnClick={() => {
                                                const link = document.createElement("a");
                                                link.href = material.url;
                                                link.download = material.materialDetails.customMetadata.name;
                                                link.click();
                                            }}
                                        />
                                    </div>
                                ))
                            ) : (
                                <div className="text-center text-gray-500 text-xl col-span-5">
                                    Materials does not exist!
                                </div>))}
                    </div>
                    {isSearching && <div className="text-primary cursor-pointer text-lg" onClick={() => { setIsSearching(false); setSearchTerm("") }}>See all materials</div>}
                    {displayedMaterials.length > 10 && (
                        <button
                            className="hover:text-primary text-end px-4 py-2 mt-4"
                            onClick={() => setDisplayedMaterials(userMaterials)}
                        >
                            See More...
                        </button>
                    )}
                </section>
            </main>
        </div>
    );
};
