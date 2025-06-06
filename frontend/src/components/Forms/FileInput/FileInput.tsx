"use client";

import { useRef, useState } from "react";
import api from "@/lib/axios";
import { formValidator } from "@/lib/validators/formValidator";
import { registerValidationSchema } from "@/lib/validators/validationSchema";
import styles from "../Form.module.css";
interface FileProps {
  //onFileSelect: (file: File | null) => void;
  setFileName:React.Dispatch<React.SetStateAction<string>>;
  fileName: string;
};
const FileInput: React.FC<FileProps> = ({ /*onFileSelect*/ setFileName, fileName}) => {
    const inputRef = useRef<HTMLInputElement>(null);
    
    const handleButtonClick = () => {
        inputRef.current?.click();
        console.log(inputRef);
       // setFileName();
    };
    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if(!file)  return;
        setFileName(file.name);
        const formData = new FormData();
        formData.append('file', file);
        const fileData = {file: file};
        const validationResult = formValidator(fileData, registerValidationSchema);
        console.log(validationResult);
        if(validationResult) {
            console.log(validationResult);
        }
        try {
            const res = await api.post('api/user/uploadImage.php', formData);
            console.log(res);
        } catch(error) {
            console.log(error);
        }
    };
    console.log(fileName);
    return (
        <div>
            <input type="file" name="file" ref={inputRef} onChange={handleFileChange}/>
            <button type="button" className={styles.fileBtn} onClick={handleButtonClick}>Izaberi sliku</button>
            <p>{fileName}</p>
        </div>
    );
};
export default FileInput;