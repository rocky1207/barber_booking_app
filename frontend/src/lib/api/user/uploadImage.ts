import api from "../../axios";
type UploadImageResponse =
  | { success: true; fileName: string }
  | { success: false; message: string }


export const uploadImage = async (url: string, file: FormData): Promise<UploadImageResponse> => {
    
    try {
        const response = await api.post(url, file);
        console.log(response);
        if(response.status === 200) {
            return {success: true, fileName: response.data.fileName};
        }
    } catch(error: any) {
        return {success: false, message: error.message};
    }
    return {success: false, message: 'Nije moguće uploudovati fajl. Pokušajte kasnije ponovo.'};
}