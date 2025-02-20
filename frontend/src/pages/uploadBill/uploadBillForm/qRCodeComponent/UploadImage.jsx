import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import { imageDB } from "../../../../../firebase/FireBaseConfig";

const UploadImage = () => {
    const [image, setImage] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [downloadUrl, setDownloadUrl] = useState(null);
    const [searchParams] = useSearchParams();
    const userId = 12;

    const handleFileChange = (event) => {
        setImage(event.target.files[0]);
    };

    const handleUpload = async () => {
        if (!image) return;

        setUploading(true);
        const imgRef = ref(imageDB, `upload/${userId}/${uuidv4()}`);

        try {
            await uploadBytes(imgRef, image);
            const url = await getDownloadURL(imgRef);
            setDownloadUrl(url);
        } catch (error) {
            console.error("Eroare la încărcare:", error);
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="flex flex-col items-center p-4">
            <h2 className="text-xl font-bold mb-4">Încarcă o imagine</h2>
            <input type="file" accept="image/*" onChange={handleFileChange} className="mb-4 border p-2" />
            <button onClick={handleUpload} disabled={uploading} className="bg-blue-500 text-white px-4 py-2 rounded">
                {uploading ? "Se încarcă..." : "Încarcă"}
            </button>
            {downloadUrl && (
                <p className="mt-4">
                    Imaginea a fost încărcată! <a href={downloadUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">Vezi imaginea</a>
                </p>
            )}
        </div>
    );
};

export default UploadImage;
