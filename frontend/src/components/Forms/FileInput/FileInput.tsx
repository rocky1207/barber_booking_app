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
    const [choosenImageName, setChoosenImageName] = useState<string>('Slika nije izbrana');
    const inputRef = useRef<HTMLInputElement>(null);
    console.log(inputRef.current);
    const handleButtonClick = () => {
        inputRef.current?.click();
        console.log(inputRef);
    };
    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if(!file)  return;
        setChoosenImageName(file.name);
        const formData = new FormData();
        formData.append('file', file);
        const fileData = {file: file};
        const validationResult = formValidator(fileData, registerValidationSchema);
        console.log(validationResult);
        if(validationResult) {
            setChoosenImageName(validationResult);
            return;
        }
        try {
            const res = await api.post('user/uploadImage.php', formData);
            console.log(res);
            if(res.status === 200) {
                setFileName(res.data.fileName);
            } 
        } catch(error: any) {
            console.log(error);
            setChoosenImageName(error.message);
        }
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