"use client";
import React, { useRef, useState } from "react";

const useImageLoad = () => {
  const [selectedImage, setSelectedImage] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const inputImage = useRef<HTMLInputElement>(null);

  const handleChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      setFile(files[0]);

      const reader = new FileReader();

      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
      };

      reader.readAsDataURL(files[0]);
    }
  };
  return { selectedImage, inputImage, file, handleChangeFile };
};

export default useImageLoad;
