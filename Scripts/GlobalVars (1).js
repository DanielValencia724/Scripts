const SERVER_HOST = "http://localhost:5000/";

const GAME_TYPE = {
    holdem: 1,
    omaha: 2,
    stud: 3,
    draw: 4,
    bigtwo: 5,
    mixed: 6,
};

const LIMIT_TYPE = {
    notlimit: 1,
    potlimit: 2,
    limit: 3
};

const STAKE_TYPE = {
    high: 1,
    mid: 2,
    low: 3
};

const MODE_TYPE = {
    alwaysruntwice: 1,
    straddle: 2,
    buttonstraddle: 3,
    killgames: 4,
    doubleboard: 5,
    allinorfold: 6
};

const USDOLLAR = new Intl.NumberFormat('en-US', {
    //style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 2,
});