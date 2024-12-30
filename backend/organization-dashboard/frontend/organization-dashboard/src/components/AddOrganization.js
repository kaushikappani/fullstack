import React, { useState } from "react";
import axios from "axios";
import "../css/AddOrganization.css";

const AddOrganization = () => {
    const [organization, setOrganization] = useState({
        name: "",
        email: "",
        location: "",
    });

    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setOrganization((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("/api/organizations", organization);
            setMessage("Organization added successfully!");
            setMessageType("success");
            setOrganization({ name: "", email: "", location: "" });
        } catch (err) {
            console.error(err);
            setMessage("Failed to add organization.");
            setMessageType("error");
        }
    };

    return (
        <div>
            <form className="add-organization-form" onSubmit={handleSubmit}>
                <h2>Add Organization</h2>
                <input
                    type="text"
                    name="name"
                    placeholder="Organization Name"
                    value={organization.name}
                    onChange={handleChange}
                    required
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={organization.email}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="location"
                    placeholder="Location"
                    value={organization.location}
                    onChange={handleChange}
                />
                <button type="submit">Add Organization</button>
                {message && (
                    <div className={`message ${messageType}`}>
                        {message}
                    </div>
                )}
            </form>

        </div>
    );
};

export default AddOrganization;
