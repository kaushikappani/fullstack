import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AddOrganization from "./components/AddOrganization";
import AddTeam from "./components/AddTeam";
import AddMember from "./components/AddMember";
import OrganizationList from "./components/OrganizationList";
import IndividualList from "./components/IndividualList";
import "./App.css"

const App = () => {
  return (
    <Router>
      <div>
        <nav>
          <a href="/">Organizations</a> | <a href="/add-organization">Add Organization</a> |{" "}
          <a href="/add-team">Add Team</a> | <a href="/add-member">Add Member</a> |{" "}
          <a href="/individuals">Individuals</a>
        </nav>
        <Routes>
          <Route path="/" element={<OrganizationList />} />
          <Route path="/add-organization" element={<AddOrganization />} />
          <Route path="/add-team" element={<AddTeam />} />
          <Route path="/add-member" element={<AddMember />} />
          <Route path="/individuals" element={<IndividualList />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
