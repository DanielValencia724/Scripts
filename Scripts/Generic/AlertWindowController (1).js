var AlertWindowController = pc.createScript('alertWindowController');

//Objects
AlertWindowController.attributes.add('textMessage', { type: "entity"});
AlertWindowController.attributes.add('buttonAccept', { type: "entity"});
AlertWindowController.attributes.add('buttonCancel', { type: "entity"});

//Vars


// initialize code called once per entity
AlertWindowController.prototype.initialize = function() {
    this.buttonAccept.button.on('click',this.onClickAccept, this);
    this.buttonCancel.button.on('click',this.onClickCancel, this);

    
};

// update code called every frame
AlertWindowController.prototype.update = function(dt) {

};

//Public Methods
AlertWindowController.prototype.setMessage = function(tmpMessage) {
    this.textMessage.element.text = tmpMessage;
    //console.log("SetMessage");
};

AlertWindowController.prototype.onClickAccept = function(event) {
    this.entity.enabled = false;
};

AlertWindowController.prototype.onClickCancel = function(event) {

};

// swap method called for script hot-reloading
// inherit your script state here
// AlertWindowController.prototype.swap = function(old) { };

// to learn more about script anatomy, please read:
// https://developer.playcanvas.com/en/user-manual/scripting/