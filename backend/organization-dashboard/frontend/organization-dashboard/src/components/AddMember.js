import React, { useState, useEffect } from "react";
import axios from "axios";
import "../css/AddMember.css";

const AddMember = () => {
    const [member, setMember] = useState({ name: "", email: "" });
    const [teams, setTeams] = useState([]);
    const [selectedTeam, setSelectedTeam] = useState("");
    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState("");

    useEffect(() => {
        const fetchTeams = async () => {
            const res = await axios.get("/api/teams");
            setTeams(res.data);
        };
        fetchTeams();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`/api/teams/${selectedTeam}/members`, member);
            setMessage("Member added successfully!");
            setMessageType("success");
            setMember({ name: "", email: "" });
        } catch (err) {
            console.error(err);
            setMessage("Failed to add member.");
            setMessageType("error");
        }
    };

    return (
        <div>
            <form className="add-member-form" onSubmit={handleSubmit}>
                <h2>Add Member</h2>
                <select
                    value={selectedTeam}
                    onChange={(e) => setSelectedTeam(e.target.value)}
                    required
                >
                    <option value="">Select Team</option>
                    {teams.map((team) => (
                        <option key={team._id} value={team._id}>
                            {team.name}
                        </option>
                    ))}
                </select>
                <input
                    type="text"
                    name="name"
                    placeholder="Member Name"
                    value={member.name}
                    onChange={(e) => setMember({ ...member, name: e.target.value })}
                    required
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={member.email}
                    onChange={(e) => setMember({ ...member, email: e.target.value })}
                    required
                />
                <button type="submit">Add Member</button>
                {message && (
                    <div className={`message ${messageType}`}>
                        {message}
                    </div>
                )}
            </form>
           
        </div>
    );
};

export default AddMember;
