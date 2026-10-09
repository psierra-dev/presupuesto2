"use client";
import Image from "next/image";
import React from "react";
import useImageLoad from "../hooks/useImageLoad";

const ImageLoad = () => {
  const { selectedImage, inputImage, handleChangeFile } = useImageLoad();

  return (
    <div className="flex flex-1 flex-col w-full ">
      <label className=" text-start text-xs font-semibold text-neutral-800">
        Imagen de la obra
      </label>

      <div
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
          console.log("click");
          inputImage.current?.click();
        }}
        className="flex z-30 flex-col justify-center items-center w-full min-h-[160px] border-[1px] border-collapse hover:cursor-pointer hover:bg-neutral-400 mt-2 relative "
      >
        <div className=" z-20">
          <h4 className=" text-md text-neutral-800">
            {selectedImage ? "Cambiar" : "Subir"} imagen
          </h4>
          <p className=" text-xs text-neutral-500">De formato jpg, png etc</p>
        </div>

        {selectedImage && (
          <div className="flex flex-1 absolute justify-center h-full w-auto ">
            <div>
              <Image
                src={selectedImage}
                alt="preview"
                className=" max-w-[270px] w-full h-full rounded-lg"
                width={300}
                height={400}
              />
            </div>
          </div>
        )}
      </div>

      <input
        className="hidden"
        type="file"
        name="file"
        ref={inputImage}
        onChange={handleChangeFile}
      />
    </div>
  );
};

export default ImageLoad;
