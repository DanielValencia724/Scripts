var TableRow = pc.createScript('tableRow');
//Attributes


//Objects
TableRow.attributes.add('imageBackground', { type: "entity"});
TableRow.attributes.add('textTableName', { type: "entity"});
TableRow.attributes.add('textStakers', { type: "entity"});
TableRow.attributes.add('textPlayers', { type: "entity"});
TableRow.attributes.add('textGameInfo', { type: "entity"});
TableRow.attributes.add('modeType', {
    type: 'entity',
    array: true
});


// initialize code called once per entity
TableRow.prototype.initialize = function() {
    this.idtable = null;
    this.game_type = null;
    this.limit_type = null;
    this.mode_type = [];
};



// swap method called for script hot-reloading
// inherit your script state here
// TableRow.prototype.swap = function(old) { };

// to learn more about script anatomy, please read:
// https://developer.playcanvas.com/en/user-manual/scripting/