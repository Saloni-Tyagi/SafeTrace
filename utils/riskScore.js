// Weight per complaint category — adjust as needed
const CATEGORY_WEIGHTS = {
    "Reckless Driving": 3,
    "Rash Driving": 3,
    "Accident": 4,
    "Drunk Driving": 5,
    "Illegal Parking": 1,
    "Signal Jump": 2,
    "Overspeeding": 2,
    "Other": 1
};

const DEFAULT_WEIGHT = 2;

function getCategoryWeight(category) {
    return CATEGORY_WEIGHTS[category] || DEFAULT_WEIGHT;
}

// Recency multiplier — complaints in the last 30 days count more
function getRecencyMultiplier(createdAt) {
    const daysAgo = (Date.now() - new Date(createdAt).getTime()) / (1000 * 60 * 60 * 24);

    if (daysAgo <= 30) return 1.5;
    if (daysAgo <= 90) return 1.2;
    return 1;
}

// Takes an array of complaint documents for ONE vehicle, returns a score + label
function calculateRiskScore(complaints) {
    let score = 0;

    for (const complaint of complaints) {
        const weight = getCategoryWeight(complaint.category);
        const recencyMultiplier = getRecencyMultiplier(complaint.createdAt);
        score += weight * recencyMultiplier;
    }

    // Round to 1 decimal for display
    score = Math.round(score * 10) / 10;

    let label = "Low";
    if (score >= 15) label = "High";
    else if (score >= 7) label = "Medium";

    return { score, label, complaintCount: complaints.length };
}

// Groups complaints by vehicleNumber and scores each group
function buildVehicleRiskProfiles(allComplaints) {
    const grouped = {};

    for (const complaint of allComplaints) {
        const plate = complaint.vehicleNumber;
        if (!grouped[plate]) grouped[plate] = [];
        grouped[plate].push(complaint);
    }

    const profiles = Object.keys(grouped).map(plate => {
        const complaints = grouped[plate];
        const { score, label, complaintCount } = calculateRiskScore(complaints);

        return {
            vehicleNumber: plate,
            score,
            label,
            complaintCount,
            complaints
        };
    });

    // Highest risk first
    profiles.sort((a, b) => b.score - a.score);

    return profiles;
}

module.exports = { calculateRiskScore, buildVehicleRiskProfiles };