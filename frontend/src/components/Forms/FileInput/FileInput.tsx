"use client";

import { useRef, useState, useEffect } from "react";
import { uploadImage } from "@/lib/api/user/uploadImage";
import { formValidator } from "@/lib/validators/formValidator";
import { registerValidationSchema } from "@/lib/validators/validationSchema";
import styles from "../Form.module.css";
interface FileProps {
  setFileName:React.Dispatch<React.SetStateAction<string>>;
  fileName: string;
};

const FileInput: React.FC<FileProps> = ({setFileName, fileName}) => {
    const [choosenImageName, setChoosenImageName] = useState<string>('Slika nije izbrana');
    const inputRef = useRef<HTMLInputElement>(null);
    console.log(fileName);
    const handleButtonClick = () => {
        inputRef.current?.click();
    };
    useEffect(() => {
        if(fileName === '') setChoosenImageName('Slika nije izbrana');
        if(fileName !== '') setChoosenImageName(fileName);
    }, [fileName])
    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if(!file)  return;
        setChoosenImageName(file.name);
        const formData = new FormData();
        formData.append('file', file);
        if(fileName !== 'Slika nije izbrana') formData.append('oldFile', fileName);
        const fileData = {file: file};
        const validationResult = formValidator(fileData, registerValidationSchema);
        if(!validationResult.status) {
            setChoosenImageName(validationResult.message);
            return;
        }

        const result = await uploadImage('user/uploadImage.php', formData);
        if(!result.success) {
            setChoosenImageName(result.message);
            return;
        } 
        setFileName(result.fileName);
    };
    return (
        <div>
            <input type="file" name="file" ref={inputRef} onChange={handleFileChange}/>
            <button type="button" className={styles.fileBtn} onClick={handleButtonClick}>Izaberi sliku</button>
            <p>{choosenImageName}</p>
        </div>
    );
};
export default FileInput;