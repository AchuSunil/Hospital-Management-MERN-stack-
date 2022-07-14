import axios from "axios";

export const UploadImage = async (img) => {
    if (img.type === "image/jpeg" || img.type === "image/png") {
        const formData = new FormData();
        formData.append("file", img);
        formData.append("upload_preset", "healthcare-hospital");
        formData.append("cloud_name", "hospital-management");
        const { data } = await axios.post("https://api.cloudinary.com/v1_1/hospital-management/image/upload", formData);
        if (data) {
            return data;
        }
    } else {
        return console.log("picture is not uploaded");
    }
};
