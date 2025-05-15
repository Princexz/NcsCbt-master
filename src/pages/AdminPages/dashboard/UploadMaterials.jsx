import React, { useEffect, useRef, useState } from "react";
import { Header } from "../../../components/shared/Header";
import { Button } from "../../../components/shared/Button";
import { Modal } from "../../../components/shared/Modal";
import upload from "../../../assets/upload-cloud.png";
import success from "../../../assets/upload.png";
import { useUserStore } from "../../../store/userStore";
import { materialStorage } from "../../../../config";
import {
  getDownloadURL,
  ref,
  updateMetadata,
  uploadBytes,
} from "firebase/storage";
import { v4 } from "uuid";

export const UploadMaterials = () => {
  const { materials } = useUserStore();
  // const [materials, setMaterials] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (materials.length === 0) {
      setIsLoading(true)
    }
    if (materials.length > 10) {
      setDisplayedMaterials(materials.slice(0, 8));
    } else {
      setDisplayedMaterials(materials);
    }
  }, []);

  const [name, setName] = useState("");
  const [author, setAuthor] = useState("");
  const [rank, setRank] = useState("");
  const [book, setBook] = useState(null);
  const [coverImage, setCoverImage] = useState(null);
  const [coverImageUrl, setCoverImageUrl] = useState(null);
  const [bookName, setBookName] = useState("");
  const [fileType, setFileType] = useState("")

  const [uploadError, setUploadError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [handleUpload, setHandleUpload] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  const [searchedMaterials, setSearchedMaterials] = useState([]);
  const [displayedMaterials, setDisplayedMaterials] = useState([]);

  if (isLoading) {
    return <div className="bg-cardgreen absolute inset-0 flex items-center justify-center mx-auto">
      <div className="rounded-full w-52 h-52 animate-bounce border-8 border-secondary"></div>
    </div>;
  }

  const handleSearch = (e) => {
    setIsSearching(true);
    const filteredMaterials = materials.filter((material) => {
      const regex = new RegExp(searchTerm, "i");
      const searchProperties = [material.materialDetails.customMetadata.name, material.materialDetails.customMetadata.rank, material.materialDetails.customMetadata.author];
      return searchProperties.some((property) => regex.test(property));
    });

    if (filteredMaterials.length === 1) {
      setSearchedMaterials(filteredMaterials);
    } else {
      setSearchedMaterials(filteredMaterials.slice(0, 8));
    }
    setSearchTerm("");
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.size > 10485760) {
      setUploadError("File size should not exceed 10MB");
      setBook(null);
      setBookName("");
    } else {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = (e) => {
        setBook(e.target.result);
        setBookName(file.name);
        setUploadError("");
      };
      reader.onerror = (e) => {
        setUploadError("Error uploading file");
        setBook(null);
      };
    }
  };

  const handleCoverImageChange = (e) => {
    const file = e.target.files[0]
    if (file && file.size > 1048576) {
      setUploadError("File size should not exceed 1MB");
      setCoverImage(null);
    } else {
      setCoverImage(file)
      setCoverImageUrl(URL.createObjectURL(file));
      setFileType(file.type)
    }// Store the selected file in the state
  };

  const uploadMaterial = async () => {
    if (name === "" || author === "" || rank === "" || book === null || coverImage === null) {
      setUploadError("Please fill in all the required fields");
    } else {
      const material = { name, author, rank };
      const metadata = {
        customMetadata: material,
      };

      const imageMetadata = {
        contentType: fileType,
        firebaseStorageDownloadTokens: v4()
      }
      const materialRef = ref(materialStorage, `materials/${name}`);
      const coverImageRef = ref(materialStorage, `coverImages/${name}`)
      await uploadBytes(materialRef, book, metadata);
      await uploadBytes(coverImageRef, coverImage, imageMetadata)

      const coverImageUrl = await getDownloadURL(coverImageRef);

      await updateMetadata(materialRef, {
        customMetadata: {
          materialCover: coverImageUrl
        }
      })

      setName("");
      setAuthor("");
      setRank("");
      setCoverImage(null);
      setBook(null);
      setUploadError("");
      setShowModal(false);
      setHandleUpload(!handleUpload);
    }
  };

  const getImageText = (materialName) => {
    const options = [
      // First letter
      materialName.charAt(0),
      // First and last letter
      `${materialName.charAt(0)}${materialName.charAt(materialName.length - 1)}`,
      // First letter of each word
      materialName
        .split(" ")
        .map((word) => word.charAt(0))
        .join(""),
    ];

    // Choose one of the options randomly
    const randomIndex = Math.floor(Math.random() * options.length);
    const imageText = options[randomIndex];

    return encodeURIComponent(imageText);
  };

  return (
    <div className="flex flex-col w-full p-8 md:p-10 gap-4">
      <Header title="Materials" />
      <main className="flex-grow">
        <section className="flex flex-col gap-4">
          <div className="flex md:flex-row flex-col gap-4 mb-4 justify-between">
            <div className="relative md:w-2/3 flex">
              <input
                type="text"
                className="border rounded-md py-2 px-4 pr-10 w-full"
                placeholder="Search by rank or title"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <div
                className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer hover:text-primary"
                onClick={handleSearch}
              >
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
            <div className="flex justify-end">
              <Button
                title="Upload Material"
                btnStyles="px-4 py-3 text-white bg-primary rounded-md"
                btnClick={() => setShowModal(!showModal)}
              />
            </div>
          </div>
          <div className="text-2xl mt-6">Uploaded Materials</div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
          {isSearching && (
            <div
              className="text-primary cursor-pointer text-lg"
              onClick={() => {
                setIsSearching(false);
                setSearchTerm("");
              }}
            >
              See all materials
            </div>
          )}
          {materials.length > 10 && (
            <button onClick={() => setDisplayedMaterials(materials)}>
              See More...
            </button>
          )}
        </section>
        <section>
          {showModal && (
            <Modal
              closeModal={() => setShowModal(false)}
              title="Upload Material"
              content={
                <div className="flex flex-col items-center gap-4 my-2">
                  {uploadError && (
                    <div className="text-red-500 mt-2">{uploadError}</div>
                  )}
                  <div className="w-full flex flex-col">
                    <label htmlFor="name">Material Name</label>
                    <input
                      type="text"
                      value={name}
                      className="border rounded-md py-2 px-4"
                      placeholder="Material Name"
                      onChange={(e) => {
                        setName(e.target.value);
                      }}
                    />
                  </div>
                  <div className="w-full flex flex-col">
                    <label htmlFor="author">Author's Name</label>
                    <input
                      type="text"
                      value={author}
                      onChange={(e) => {
                        setAuthor(e.target.value);
                      }}
                      className="border rounded-md py-2 px-4"
                      placeholder="Author's Name"
                    />
                  </div>
                  <div className="w-full flex flex-col">
                    <label htmlFor="rank" className="block py-1 -mb-1">
                      Select Rank
                    </label>
                    <select
                      id="rank"
                      name="rank"
                      value={rank}
                      onChange={(e) => {
                        setRank(e.target.value);
                      }}
                      className={`border w-full py-4 px-4 rounded-lg shadow-sm text-sm hover:border-primary`}
                    >
                      <option value="">Select a category</option>
                      <option value="CAI-CAII">CAI-CAII</option>
                      <option value="CAII-AIC">CAII-AIC</option>
                      <option value="AIC-IC">AIC-IC</option>
                      <option value="IC-ASCII">IC-ASCII</option>
                      <option value="ASCII-ASCI">ASCII-ASCI</option>
                      <option value="ASCI-DSC">ASCI-DSC</option>
                      <option value="DSC-SC">DSC-SC</option>
                      <option value="SC-CSC">SC-CSC</option>
                      <option value="CSC-AC">CSC-AC</option>
                      <option value="AC-DC">AC-DC</option>
                      <option value="DC-CC">DC-CC</option>
                    </select>
                  </div>
                  <div className="w-full flex flex-col gap-10">
                    <div className='border border-dotted border-primary rounded-lg flex flex-col justify-center items-center px-14 py-10'>
                      <div className='flex justify-start w-full -mt-8 -ml-14'>Upload cover image</div>
                      <label htmlFor="coverImage" className="flex flex-col items-center justify-center my-10">
                        <div className="flex flex-col items-center justify-center">
                          <img src={upload} alt="upload" />
                          <div className='text-primary'>Drag & Drop</div>
                        </div>
                        <div className='text-sm'>or select file from device</div>
                        <input
                          type="file"
                          id="coverImage"
                          accept="image/*"
                          onChange={(e) => { handleCoverImageChange(e) }}
                          className="hidden"
                        />
                      </label>
                      <div className='text-xs -mb-8'>max. 1MB</div>
                    </div>
                    {coverImage ? (
                      <div className='rounded-md px-4 py-3 border border-primary'>
                        <div className='flex w-full justify-end text-red-500 cursor-pointer' onClick={() => { setCoverImage(null); setCoverImageUrl(null) }}>X</div>
                        <img src={coverImageUrl} alt="Cover" className="w-full h-40 object-cover rounded-md mb-2" />
                      </div>
                    ) : ("")}
                    <div className="border border-dotted border-primary rounded-lg flex flex-col justify-center items-center px-14 py-10">
                      <div className="flex justify-start w-full -mt-8 -ml-14">
                        Upload file
                      </div>
                      <label
                        htmlFor="fileUpload"
                        className="flex flex-col items-center justify-center my-10"
                      >
                        <div className="flex flex-col items-center justify-center">
                          <img src={upload} alt="upload" />
                          <div className="text-primary">Drag & Drop</div>
                        </div>
                        <div className="text-sm">
                          or select file from device
                        </div>
                        <input
                          type="file"
                          id="fileUpload"
                          accept=".pdf, .doc, .docx, .ppt, .pptx, .xls, .xlsx, .txt, .zip, .mp4, .mp3, .wav, .flac, .avi, .mkv, .mov, .wmv, .webm, .ogg"
                          onChange={(e) => handleFileChange(e)}
                          className="hidden"
                        />
                      </label>
                      <div className="text-xs -mb-8">max. 10MB</div>
                    </div>
                    {book ? (
                      <div className="flex w-full justify-between items-center rounded-md px-4 py-2 border border-primary">
                        <div>{bookName}</div>
                        <div
                          className="cursor-pointer text-red-500"
                          onClick={() => {
                            setBook(null);
                            setBookName("");
                          }}
                        >
                          X
                        </div>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              }
              buttons={
                <Button
                  title="Upload Material"
                  btnStyles="bg-primary px-4 py-3 text-white rounded-md w-full my-5"
                  btnClick={uploadMaterial}
                />
              }
              modStyles="bg-secondary h-5/6 w-1/2 overflow-y-scroll"
            />
          )}
          {handleUpload && (
            <Modal
              content={
                <div className="flex flex-col gap-4 items-center justify-center py-10">
                  <div className="motion-safe:animate-bounce duration-75">
                    <img src={success} alt="sucess" />
                  </div>
                  <div className="text-primary text-3xl font-bold">
                    Upload Successful!
                  </div>
                </div>
              }
              buttons={
                <Button
                  title="Done"
                  btnStyles="bg-primary px-4 py-3 text-white rounded-md w-full"
                  btnClick={() => setHandleUpload(false)}
                />
              }
              modStyles="bg-secondary w-1/2 transition duration-300 ease-in-out"
              closeModal={() => setHandleUpload(false)}
            />
          )}
        </section>
      </main>
    </div >
  );
};
