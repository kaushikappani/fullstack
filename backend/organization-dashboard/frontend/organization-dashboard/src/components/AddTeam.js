import React, { useState, useEffect } from "react";
import axios from "axios";
import "../css/AddTeam.css";  

const AddTeam = () => {
    const [team, setTeam] = useState({ name: "" });
    const [organizations, setOrganizations] = useState([]);
    const [selectedOrg, setSelectedOrg] = useState("");
    const [message, setMessage] = useState(""); 
    const [messageType, setMessageType] = useState("");

    useEffect(() => {
        const fetchOrganizations = async () => {
            const res = await axios.get("/api/organizations");
            setOrganizations(res.data);
        };
        fetchOrganizations();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`/api/organizations/${selectedOrg}/teams`, team);
            setMessage("Team added successfully!");
            setMessageType("success");
            setTeam({ name: "" });
        } catch (err) {
            console.error(err);
            setMessage("Failed to add team.");
            setMessageType("error");
        }
    };

    return (
        <div>
            <form className="add-team-form" onSubmit={handleSubmit}>
                <h2>Add Team</h2>
                <select
                    value={selectedOrg}
                    onChange={(e) => setSelectedOrg(e.target.value)}
                    required
                >
                    <option value="">Select Organization</option>
                    {organizations.map((org) => (
                        <option key={org._id} value={org._id}>
                            {org.name}
                        </option>
                    ))}
                </select>
                <input
                    type="text"
                    name="name"
                    placeholder="Team Name"
                    value={team.name}
                    onChange={(e) => setTeam({ name: e.target.value })}
                    required
                />
                <button type="submit">Add Team</button>
                {message && (
                    <div className={`message ${messageType}`}>
                        {message}
                    </div>
                )}
            </form>
            
        </div>
    );
};

export default AddTeam;
