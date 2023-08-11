var HomeSettingsController = pc.createScript('homeSettingsController');

//Objects
HomeSettingsController.attributes.add('windowsGameSettings', { type: "entity"});
HomeSettingsController.attributes.add('windowsArchiveSettings', { type: "entity"});
HomeSettingsController.attributes.add('windowsBetSettings', { type: "entity"});
HomeSettingsController.attributes.add('windowsChangePassword', { type: "entity"});
HomeSettingsController.attributes.add('backgroundSettings', { type: "entity"});
HomeSettingsController.attributes.add('buttonGameShowSettings', { type: "entity"});
HomeSettingsController.attributes.add('buttonGameCloseSettings', { type: "entity"});
HomeSettingsController.attributes.add('buttonArchiveShowSettings', { type: "entity"});
HomeSettingsController.attributes.add('buttonArchiveCloseSettings', { type: "entity"});
HomeSettingsController.attributes.add('buttonBetShowSettings', { type: "entity"});
HomeSettingsController.attributes.add('buttonBetCloseSettings', { type: "entity"});
HomeSettingsController.attributes.add('buttonChangePasswordShow', { type: "entity"});
HomeSettingsController.attributes.add('buttonChangePasswordClose', { type: "entity"});

// initialize code called once per entity
HomeSettingsController.prototype.initialize = function() {
    this.buttonGameShowSettings.button.on('click', this.OnClickButtonShowGameSettings, this);
    this.buttonGameCloseSettings.button.on('click', this.OnClickButtonCloseGameSettings, this);
    this.buttonArchiveCloseSettings.button.on('click', this.OnClickButtonCloseArchiveSettings, this);
    this.buttonBetCloseSettings.button.on('click', this.OnClickButtonCloseBetSettings, this);
    this.buttonChangePasswordClose.button.on('click', this.OnClickButtonCloseChangePassword, this);
    this.buttonArchiveShowSettings.button.on('click', this.OnClickButtonShowArchive, this);
    this.buttonBetShowSettings.button.on('click', this.OnClickButtonShowBetSettings, this);
    this.buttonChangePasswordShow.button.on('click', this.OnClickButtonShowChangePassword, this);
};

HomeSettingsController.prototype.OnClickButtonShowGameSettings = function() {
    console.log("--Closeee")
    this.backgroundSettings.enabled = true;
    this.windowsGameSettings.enabled = true;
};

HomeSettingsController.prototype.OnClickButtonCloseGameSettings = function() {
    this.backgroundSettings.enabled = false;
    this.HideWindows();
};

HomeSettingsController.prototype.OnClickButtonCloseArchiveSettings = function() {
    this.HideWindows();
    this.windowsGameSettings.enabled = true;
};

HomeSettingsController.prototype.OnClickButtonCloseBetSettings = function() {
    this.HideWindows();
    this.windowsGameSettings.enabled = true;
};

HomeSettingsController.prototype.OnClickButtonCloseChangePassword = function() {
    this.HideWindows();
    this.windowsGameSettings.enabled = true;
};


HomeSettingsController.prototype.OnClickButtonShowGame = function() {
    this.HideWindows();
    this.windowsGameSettings.enabled = true;
};

HomeSettingsController.prototype.OnClickButtonShowArchive = function() {
    this.HideWindows();
    this.windowsArchiveSettings.enabled = true;
};

HomeSettingsController.prototype.OnClickButtonShowBetSettings = function() {
    this.HideWindows();
    this.windowsBetSettings.enabled = true;
};

HomeSettingsController.prototype.OnClickButtonShowChangePassword = function() {
    this.HideWindows();
    this.windowsChangePassword.enabled = true;
};

HomeSettingsController.prototype.HideWindows = function() {    
    this.windowsGameSettings.enabled = false;
    this.windowsArchiveSettings.enabled = false;
    this.windowsBetSettings.enabled = false;
    this.windowsChangePassword.enabled = false;
};

// swap method called for script hot-reloading
// inherit your script state here
// HomeSettingsController.prototype.swap = function(old) { };

// to learn more about script anatomy, please read:
// https://developer.playcanvas.com/en/user-manual/scripting/