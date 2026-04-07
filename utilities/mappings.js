const venuePriceMapping = {
    'The Light Horse': 800,
    'The Renegade': 1200,
    'Sauf Haus': 750,
    Crossroads: 700,
    "Ned Devine's": 600,
    'Wedding Event': 2500,
    'Private Event': 1000,
};

const findVenueValue = (venue) => {
    return venuePriceMapping[venue.trim()] ?? null;
};

module.exports = {
    venuePriceMapping,
    findVenueValue,
};
