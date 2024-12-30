import React, { useState, useEffect } from "react";
import axios from "axios";
import "../css/IndividualList.css";

const IndividualList = () => {
    const [individuals, setIndividuals] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null);

    useEffect(() => {
        const fetchIndividuals = async () => {
            const res = await axios.get("/api/individuals");
            setIndividuals(res.data);
        };
        fetchIndividuals();
    }, []);

    const handleImageChange = (e, indId) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = async () => {
                const base64Image = reader.result;
                await updateProfileImage(indId, base64Image);
            };
            reader.readAsDataURL(file);
        }
    };

    const updateProfileImage = async (indId, base64Image) => {
        try {
            await axios.post(`/api/individuals/${indId}/update-image`, { profileImage: base64Image });
            setIndividuals(prev =>
                prev.map(ind =>
                    ind._id === indId ? { ...ind, profileImage: base64Image } : ind
                )
            );
        } catch (error) {
            console.error("Error updating profile image", error);
        }
    };

    return (
        <div className="individual-list">
            <h2>Individuals</h2>
            <ul>
                {individuals.map((ind) => (
                    <li key={ind._id}>
                        {ind.name}
                        <span
                            className={`individual-status ${ind.profileImage ? "status-uploaded" : "status-pending"}`}
                        >
                            {ind.profileImage ? "Uploaded" : "Not Uploaded"}
                        </span>
                        <div>
                            {ind.profileImage && (
                                <img src={ind.profileImage} alt={ind.name} className="profile-image-thumbnail" />
                            )}
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => handleImageChange(e, ind._id)}
                            />
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default IndividualList;
