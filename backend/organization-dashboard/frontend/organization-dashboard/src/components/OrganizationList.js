import React, { useState, useEffect } from "react";
import axios from "axios";
import '../css/OrganizationList.css'

const OrganizationList = () => {
    const [organizations, setOrganizations] = useState([]);

    useEffect(() => {
        const fetchOrganizations = async () => {
            const res = await axios.get("/api/organizations");
            setOrganizations(res.data);
        };
        fetchOrganizations();
    }, []);

    return (
        <div className="organization-list">
            <h2>Organizations</h2>
            <ul>
                {organizations.map((org) => (
                    <li key={org._id}>
                        <strong>{org.name}</strong>
                        <ul>
                            {org.teams.map((team) => (
                                <li key={team._id}>
                                    {team.name}
                                    <ul>
                                        {team.members.map((member) => (
                                            <li key={member._id}>{member.name}</li>
                                        ))}
                                    </ul>
                                </li>
                            ))}
                        </ul>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default OrganizationList;
