const express = require('express');
const router = express.Router();
const Organization = require('../models/Organization'); 
const Team = require('../models/team'); 
const Individual = require('../models/individual');


router.post('/organizations', async (req, res) => {
    try {
        const { name, email, location } = req.body;
        const organization = new Organization({ name, email, location });
        await organization.save();
        res.status(201).json({ message: 'Organization registered successfully', organization });
    } catch (error) {
        res.status(500).json({ error: 'Failed to register organization', details: error.message });
    }
});

router.post('/organizations/:orgId/teams', async (req, res) => {
    try {
        const { orgId } = req.params;
        const { name } = req.body;

        const team = new Team({ name: name });
        console.log(team);
        await team.save();

        const organization = await Organization.findById(orgId);
        if (!organization) return res.status(404).json({ error: 'Organization not found' });

        organization.teams.push(team._id);
        await organization.save();
        res.status(201).json({ message: 'Team added successfully', organization });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


router.post('/organizations/:orgId/teams/:teamId/members', async (req, res) => {
    try {
        const { orgId, teamId } = req.params;
        const { memberName, memberId } = req.body;

        const organization = await Organization.findById(orgId);
        if (!organization) return res.status(404).json({ error: 'Organization not found' });

        const team = organization.teams.id(teamId);
        if (!team) return res.status(404).json({ error: 'Team not found' });

        team.members.push({ name: memberName, id: memberId });
        await organization.save();
        res.status(201).json({ message: 'Member added successfully', organization });
    } catch (error) {
        res.status(500).json({ error: 'Failed to add member', details: error.message });
    }
});

// Fetch all organizations
router.get('/organizations', async (req, res) => {
    try {
        const organizations = await Organization.find()
            .populate({
                path: 'teams',
                populate: {
                    path: 'members',
                    model: 'Individual',  
                },
            });

        res.status(200).json(organizations);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch organizations', details: error.message });
    }
});

router.get('/individuals', async (req, res) => {
    try {
      
        let individuals = await Individual.find();
        res.status(200).json(individuals);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch members', details: error.message });
    }
});

router.get('/teams', async (req, res) => {
    try {
        const teams = await Team.find(); 
        res.status(200).json(teams);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch teams', details: error.message });
    }
});

router.post('/teams/:teamId/members', async (req, res) => {
    try {
        const { teamId } = req.params;
        const { name, email } = req.body;

        const team = await Team.findById(teamId);
        if (!team) {
            return res.status(404).json({ error: 'Team not found' });
        }

        const member = new Individual({ name, email, profileImage :null});
        await member.save();

        team.members.push(member._id);
        await team.save();

        res.status(201).json({ message: 'Member added successfully', team });
    } catch (error) {
        res.status(500).json({ error: 'Failed to add member', details: error.message });
    }
});

router.post('/individuals/:id/update-image', async (req, res) => {
    const { profileImage } = req.body;
    const individualId = req.params.id;

    try {
        const updatedIndividual = await Individual.findByIdAndUpdate(
            individualId,
            { profileImage },
            { new: true }
        );
        res.json(updatedIndividual);
    } catch (error) {
        console.error("Error updating image:", error);
        res.status(500).send("Error updating profile image.");
    }
});


module.exports = router;
