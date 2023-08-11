var HomeArchiveController = pc.createScript('homeArchiveController');

//////////Objects
//Windows
HomeArchiveController.attributes.add('windowsHands', { type: "entity"});
HomeArchiveController.attributes.add('windowsConnections', { type: "entity"});
HomeArchiveController.attributes.add('windowsTransactions', { type: "entity"});

HomeArchiveController.attributes.add('containerConnections', { type: "entity"});

//Templates
HomeArchiveController.attributes.add('templateRowConnection', { type: "asset", assetType: "template"});

//Buttons
HomeArchiveController.attributes.add('buttonHands', { type: "entity"});
HomeArchiveController.attributes.add('buttonConnections', { type: "entity"});
HomeArchiveController.attributes.add('buttonTransactions', { type: "entity"});

// initialize code called once per entity
HomeArchiveController.prototype.initialize = function() {
    this.buttonHands.button.on('click', this.OnClikButtonHands, this);
    this.buttonConnections.button.on('click', this.OnClikButtonConnections, this);
    this.buttonTransactions.button.on('click', this.OnClikButtonTransactions, this);

};

/////////Private Methods
HomeArchiveController.prototype.HideWindows = function() {
    this.windowsHands.enabled = false;
    this.windowsConnections.enabled = false;
    this.windowsTransactions.enabled = false;
};

HomeArchiveController.prototype.LoadConnections = function(tmpConnections) {
    for(let i=0; i < this.containerConnections.children.length; i++)
    {
        this.containerConnections.children[i].destroy();
        i--;
    }

    this.containerConnections.element.height = 0;

    for(let i=0; i < tmpConnections.length; i++)
    {
        const tmpRow = this.templateRowConnection.resource.instantiate();
        this.containerConnections.addChild(tmpRow);
        
        tmpRow.script.archiveConnectionRow.textStartDate.element.text = tmpConnections[i].start_date;
        tmpRow.script.archiveConnectionRow.textIpAddress.element.text = tmpConnections[i].ip_address;
        tmpRow.script.archiveConnectionRow.textLocation.element.text = tmpConnections[i].location;
        

        let tmpIcon = "";
        if(tmpConnections[i].device == "Android")
            tmpIcon = "Android";
        else if(tmpConnections[i].device == "IOS")
            tmpIcon = "IOS";
        else if(tmpConnections[i].device == "Windows")
            tmpIcon = "Windows";
        else if(tmpConnections[i].device == "Browser")
            tmpIcon = "Browser";
        else if(tmpConnections[i].device == "Other")
            tmpIcon = "Other";

/*
        const icon = this.app.assets.find("UI_Icon_"+tmpIcon);
        icon.ready(function (asset) {
           // console.log("--Load Avatar: "+asset.name); 
            tmpRow.script.archiveConnectionRow.imageDeviceIcon.element.sprite = asset.resource; 
        }, this);
        this.app.assets.load(icon);*/
        this.containerConnections.element.height += tmpRow.element.height;
    }
};

/////////Events
HomeArchiveController.prototype.OnClikButtonHands = function() {
    this.HideWindows();
    this.windowsHands.enabled = true;
};



HomeArchiveController.prototype.OnClikButtonConnections = function() {
    this.HideWindows();
    this.windowsConnections.enabled = true;
    pc.http.post(SERVER_HOST+"user_sessions", 
        { token:localStorage.getItem('token') },
        { "headers": { "Content-Type": "application/json"}},
        function (err, response) {
            if(err) {
                Window.alertWindowController.script.alertWindowController.setMessage("Connection error... 101");
                Window.alertWindowController.enabled = true;
                console.log("err: "+err);
            }else if(response.Sessions) {
                console.log("Response: ",response.Sessions);   
                localStorage.setItem('token',response.Token);
                this.LoadConnections(response.Sessions);             
            }else if(response.Message) {
                Window.alertWindowController.script.alertWindowController.setMessage(response.Message);
                Window.alertWindowController.enabled = true;
                console.log("Response: ",response.Message);                
            }else {
                Window.alertWindowController.script.alertWindowController.setMessage(response);
                Window.alertWindowController.enabled = true;
                console.log("Response: "+response);
            }
    }.bind(this));
};

HomeArchiveController.prototype.OnClikButtonTransactions = function() {
    this.HideWindows();
    this.windowsTransactions.enabled = true;
};

// swap method called for script hot-reloading
// inherit your script state here
// HomeArchiveController.prototype.swap = function(old) { };

// to learn more about script anatomy, please read:
// https://developer.playcanvas.com/en/user-manual/scripting/