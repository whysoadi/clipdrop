// src/components/BackgroundRemoval.js
import React, { useState } from "react";

const Clipboard = () => {
  const [image, setImage] = useState(null);
  const [resultImage, setResultImage] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImage(file);
  };

  const handleRemoveBackground = async () => {
    // Check if an image is selected
    if (!image) {
      alert("Please select an image before removing the background.");
      return;
    }

    const formData = new FormData();
    formData.append("image_file", image);

    try {
      const response = await fetch(
        "https://clipdrop-api.co/remove-background/v1",
        {
          method: "POST",
          headers: {
            "x-api-key":
              "f0de336eccbf4c537a0cd3d939f00ca325fe83cfcb6758f2cfdd2f273d8fc991301bfe2a4ff5c7d84b4b5c1cdc65f314",
          },
          body: formData,
        }
      );

      const buffer = await response.arrayBuffer();

      // Convert the ArrayBuffer to a data URL
      const base64String = btoa(
        new Uint8Array(buffer).reduce(
          (data, byte) => data + String.fromCharCode(byte),
          ""
        )
      );
      const dataURL = `data:image/png;base64,${base64String}`;

      // Set the result image for display
      setResultImage(dataURL);
    } catch (error) {
      console.error("Error removing background:", error);
    }
  };

  return (
    <div>
      <div className="flex justify-center">
        <input type="file" onChange={handleImageChange} />
        <button
          className="border-black border-2 p-10 ml-10"
          onClick={handleRemoveBackground}
        >
          Remove Background
        </button>
      </div>

      {resultImage && (
        <div>
          <h1 className="pt-4 mt-4 justify-center flex text-lg font-bold">
            Result Image
          </h1>
          <img src={resultImage} alt="Result" style={{ maxWidth: "100%" }} />
        </div>
      )}
    </div>
  );
};

export default Clipboard;
