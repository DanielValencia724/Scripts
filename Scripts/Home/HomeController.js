var HomeController = pc.createScript('homeController');

/////////////////Objects
HomeController.attributes.add('imageAvatar', { type: "entity"});
HomeController.attributes.add('textUserName', { type: "entity"});
HomeController.attributes.add('textBalance', { type: "entity"});
HomeController.attributes.add('textInPlay', { type: "entity"});
HomeController.attributes.add('tableContainer', { type: "entity"});
HomeController.attributes.add('templateTableRow', { type: "asset", assetType: "template"});
HomeController.attributes.add('tableInfoController', { type: "entity"});

////////////////buttons 
//filters
HomeController.attributes.add('buttonNoLimit', { type: "entity"});
HomeController.attributes.add('buttonLimit', { type: "entity"});
HomeController.attributes.add('buttonPotLimit', { type: "entity"});
HomeController.attributes.add('buttonStakeHigh', { type: "entity"});
HomeController.attributes.add('buttonStakeMid', { type: "entity"});
HomeController.attributes.add('buttonStakeLow', { type: "entity"});
//filters games
HomeController.attributes.add('buttonHoldem', { type: "entity"});
HomeController.attributes.add('buttonOmaha', { type: "entity"});

//windows
HomeController.attributes.add('settingsGameController', { type: "entity"});
HomeController.attributes.add('alertWindowController', { type: "entity"});




// initialize code called once per entity
HomeController.prototype.initialize = function() {
    Window.alertWindowController = this.alertWindowController;

    this.localPlayer = {
        iduser: null,
        username: null,
        chip_balance: null,
        chip_inplay: null,
        avatar: 1,
        avatar_border_color: 1,
        card_deck: 1,
        card_back: 1
    }

    this.buttonFilterNormal = new pc.Color(0.2,0.2,0.2);
    this.buttonFilterSelected = new pc.Color(0.63,0.35,0.11);
    this.InitFilters(0);

    this.tableData;
    this.lastRow;
    this.idlimitType = 0;
    this.idstakeType = 0;
    this.idgameType = 0;

    //events limits
    this.buttonNoLimit.button.on('click', function(){ 
        this.InitFilters(1);
        if(this.idlimitType == LIMIT_TYPE.notlimit){ this.idlimitType = 0; this.buttonNoLimit.element.color = this.buttonFilterNormal;}
        else{ this.idlimitType = LIMIT_TYPE.notlimit; this.buttonNoLimit.element.color = this.buttonFilterSelected; }
        this.FilterTable();
    } ,this);
    this.buttonLimit.button.on('click', function(){ 
        this.InitFilters(1);
        if(this.idlimitType == LIMIT_TYPE.limit){ this.idlimitType = 0; this.buttonLimit.element.color = this.buttonFilterNormal;}
        else { this.idlimitType = LIMIT_TYPE.limit; this.buttonLimit.element.color = this.buttonFilterSelected; }
        this.FilterTable();
    } ,this);
    this.buttonPotLimit.button.on('click', function(){ 
        this.InitFilters(1);
        if(this.idlimitType == LIMIT_TYPE.potlimit){ this.idlimitType = 0; this.buttonPotLimit.element.color = this.buttonFilterNormal;}
        else { this.idlimitType = LIMIT_TYPE.potlimit; this.buttonPotLimit.element.color = this.buttonFilterSelected; }
        this.FilterTable();
    } ,this);

    //events stakes
    this.buttonStakeHigh.button.on('click', function(){ 
        this.InitFilters(2);
        if(this.idstakeType == STAKE_TYPE.high){ this.idstakeType = 0; this.buttonStakeHigh.element.color = this.buttonFilterNormal;}
        else{ this.idstakeType = STAKE_TYPE.high; this.buttonStakeHigh.element.color = this.buttonFilterSelected; }
        this.FilterTable();
    } ,this);

    this.buttonStakeMid.button.on('click', function(){ 
        this.InitFilters(2);
        if(this.idstakeType == STAKE_TYPE.mid){ this.idstakeType = 0; this.buttonStakeMid.element.color = this.buttonFilterNormal;}
        else{ this.idstakeType = STAKE_TYPE.mid; this.buttonStakeMid.element.color = this.buttonFilterSelected; }
        this.FilterTable();
    } ,this);

    this.buttonStakeLow.button.on('click', function(){ 
        this.InitFilters(2);
        if(this.idstakeType == STAKE_TYPE.low){ this.idstakeType = 0; this.buttonStakeLow.element.color = this.buttonFilterNormal;}
        else{ this.idstakeType = STAKE_TYPE.low; this.buttonStakeLow.element.color = this.buttonFilterSelected; }
        this.FilterTable();
    } ,this);
    
    //events games
    this.buttonHoldem.button.on('click', function(){ 
        this.InitFilters(3);
        if(this.idgameType == GAME_TYPE.holdem){ this.idgameType = 0; this.buttonHoldem.element.color = this.buttonFilterNormal; }
        else { this.idgameType = GAME_TYPE.holdem; this.buttonHoldem.element.color = this.buttonFilterSelected; }
        this.FilterTable();
    } ,this);
    this.buttonOmaha.button.on('click', function(){ 
        this.InitFilters(3);
        if(this.idgameType == GAME_TYPE.omaha){ this.idgameType = 0; this.buttonOmaha.element.color = this.buttonFilterNormal; }
        else{ this.idgameType = GAME_TYPE.omaha; this.buttonOmaha.element.color = this.buttonFilterSelected; }
        this.FilterTable();
    } ,this);
};

HomeController.prototype.InitFilters = function(tmpAction) {
    
    if(tmpAction == 0 || tmpAction == 1)
    {
        this.buttonNoLimit.element.color = this.buttonFilterNormal;
        this.buttonLimit.element.color = this.buttonFilterNormal;
        this.buttonPotLimit.element.color = this.buttonFilterNormal;
    }

    if(tmpAction == 0 || tmpAction == 2)
    {
        this.buttonStakeHigh.element.color = this.buttonFilterNormal;
        this.buttonStakeMid.element.color = this.buttonFilterNormal;
        this.buttonStakeLow.element.color = this.buttonFilterNormal;
    }

    if(tmpAction == 0 || tmpAction == 3)
    {
        this.buttonHoldem.element.color = this.buttonFilterNormal;
        this.buttonOmaha.element.color = this.buttonFilterNormal;
    }

};

//private methods
HomeController.prototype.FilterTable = function()
{
    for(let i=0; i < this.tableContainer.children.length; i++)
    {
        this.tableContainer.children[i].destroy();
        i--;
    }
    this.tableContainer.element.height = 0;

    let changeColor = false;
    for(let i=0; i < this.tableData.length; i++)
    {
        if(this.idlimitType != 0)
            if(this.tableData[i].limit_type != this.idlimitType)
                continue;

        if(this.idgameType != 0)
            if(this.tableData[i].game_type != this.idgameType)
                continue;


        if(this.idstakeType !=0)
        {
            if(this.idstakeType == STAKE_TYPE.high)
                if(this.tableData[i].max_stake < 100)//settings high_limit
                    continue;

            if(this.idstakeType == STAKE_TYPE.low)
                if(this.tableData[i].max_stake > 50)//settings low_limit
                    continue;

            if(this.idstakeType == STAKE_TYPE.mid)
                if(this.tableData[i].max_stake < 50 || this.tableData[i].max_stake > 100)
                    continue;
        }


        const tmpRow = this.templateTableRow.resource.instantiate();
        this.tableContainer.addChild(tmpRow);
        this.tableContainer.element.height += tmpRow.element.height;
        let tmpTable = this.tableData[i];
        
        tmpRow.script.tableRow.textTableName.element.text = this.tableData[i].table_name;
        tmpRow.script.tableRow.textStakers.element.text = USDOLLAR.format(this.tableData[i].min_stake) +"/"+USDOLLAR.format(this.tableData[i].max_stake);
        tmpRow.script.tableRow.textPlayers.element.text = this.tableData[i].taken_seats +"/"+this.tableData[i].total_seats;
        tmpRow.script.tableRow.textGameInfo.element.text = this.tableData[i].game_type_name +" "+this.tableData[i].limit_type_name;

        for(let j=0; j<this.tableData[i].mode_types.length; j++)
            tmpRow.script.tableRow.modeType[this.tableData[i].mode_types[j].idmode_type - 1].enabled = true;
        
        tmpRow.button.on('click', function (event)
        {
            //console.log("---ClickTable: ",tmpTable);
            this.onClickRow(event, tmpTable);
            if(this.lastRow)
            {
                this.lastRow.script.tableRow.imageBackground.element.color = this.lastRow.script.tableRow.normalColor;
            }
            tmpRow.script.tableRow.imageBackground.element.color = new pc.Color(0.84,0.74,0.63); 
            this.lastRow = tmpRow;
        }, this);                       

        if(changeColor) {
            tmpRow.script.tableRow.normalColor = new pc.Color(0.95,0.9,0.85);
            tmpRow.script.tableRow.imageBackground.element.color = new pc.Color(0.89,0.83,0.75);    
            changeColor = false;                    
        }else {
            tmpRow.script.tableRow.normalColor = new pc.Color(0.95,0.9,0.85);
            tmpRow.script.tableRow.imageBackground.element.color = new pc.Color(0.95,0.9,0.85);
            changeColor = true;
        }

        if(i == 0)        
        {
            this.lastRow = tmpRow;
        
            tmpRow.script.tableRow.imageBackground.element.color = new pc.Color(0.84,0.74,0.63); 
            this.onClickRow(null, tmpTable);
        }
    }

};

HomeController.prototype.createSprite = function(tmpFileName) {
    //var textureAsset = this.app.assets.find('Avatar_1.png', 'texture');
    //var app = this.app;

    const avatar = this.app.assets.find(tmpFileName, "texture");
    avatar.ready(function (asset) {
        // asset loaded
        //this.imageAvatar.element.sprite = asset.resource;
        var texture = asset.resource;
        texture.addressU = pc.ADDRESS_CLAMP_TO_EDGE;
        texture.addressV = pc.ADDRESS_CLAMP_TO_EDGE;
        texture.minFilter = pc.FILTER_NEAREST;
        texture.magFilter = pc.FILTER_NEAREST;

        var atlas = new pc.TextureAtlas();
        atlas.frames = {
            "0": {
                rect: new pc.Vec4(0, 0, 256, 512),
                pivot: new pc.Vec2(0.5, 0.5)
            }
        };
        atlas.texture = texture;

        var sprite = new pc.Sprite(this.app.graphicsDevice, {
            atlas: atlas,
            frameKeys: '0',
            pixelsPerUnit: 100,
            renderMode: pc.SPRITE_RENDERMODE_SIMPLE
        });

        this.imageAvatar.element.sprite = sprite; 
    }, this);
    this.app.assets.load(avatar);
    //console.log('--TOKEN: '+localStorage.getItem('token'));
};

HomeController.prototype.loadTableList = function() {
    pc.http.post(SERVER_HOST+"table_list",
        { token:localStorage.getItem('token') },
        { "headers": { "Content-Type": "application/json"}}, 
        function (err, response) {
            if(err) {
                this.alertWindowController.script.alertWindowController.setMessage("Connection error... 101");
                this.alertWindowController.enabled = true;
                console.log("err: "+err);
            }else if(response.Tables) {

                this.tableData = response.Tables;

                for(let i=0; i < this.tableContainer.children.length; i++)
                {
                    this.tableContainer.children[i].destroy();
                    i--;
                }
                this.tableContainer.element.height = 0;

                let changeColor = false;
                for(let i=0; i < response.Tables.length; i++)
                {
                    const tmpRow = this.templateTableRow.resource.instantiate();
                    this.tableContainer.addChild(tmpRow);
                    this.tableContainer.element.height += tmpRow.element.height;
                    let tmpTable = response.Tables[i];
                    
                    tmpRow.script.tableRow.textTableName.element.text = response.Tables[i].table_name;
                    tmpRow.script.tableRow.textStakers.element.text = USDOLLAR.format(response.Tables[i].min_stake) +"/"+USDOLLAR.format(response.Tables[i].max_stake);
                    tmpRow.script.tableRow.textPlayers.element.text = response.Tables[i].taken_seats +"/"+response.Tables[i].total_seats;
                    tmpRow.script.tableRow.textGameInfo.element.text = response.Tables[i].game_type_name +" "+response.Tables[i].limit_type_name;

                    for(let j=0; j<response.Tables[i].mode_types.length; j++)
                        tmpRow.script.tableRow.modeType[response.Tables[i].mode_types[j].idmode_type - 1].enabled = true;
                    
                    tmpRow.button.on('click', function (event)
                    {
                        //console.log("---ClickTable: ",tmpTable);
                        this.onClickRow(event, tmpTable);
                        if(this.lastRow)
                        {
                            this.lastRow.script.tableRow.imageBackground.element.color = this.lastRow.script.tableRow.normalColor;
                        }
                        tmpRow.script.tableRow.imageBackground.element.color = new pc.Color(0.84,0.74,0.63); 
                        this.lastRow = tmpRow;
                    }, this);                       

                    if(changeColor) {
                        tmpRow.script.tableRow.normalColor = new pc.Color(0.95,0.9,0.85);
                        tmpRow.script.tableRow.imageBackground.element.color = new pc.Color(0.89,0.83,0.75);    
                        changeColor = false;                    
                    }else {
                        tmpRow.script.tableRow.normalColor = new pc.Color(0.95,0.9,0.85);
                        tmpRow.script.tableRow.imageBackground.element.color = new pc.Color(0.95,0.9,0.85);
                        changeColor = true;
                    }

                    if(i == 0)        
                    {
                        this.lastRow = tmpRow;
                    
                        tmpRow.script.tableRow.imageBackground.element.color = new pc.Color(0.84,0.74,0.63); 
                        this.onClickRow(null, tmpTable);
                    }
                }

                console.log("Response: ",response.Tables);   
                localStorage.setItem('token',response.Token);            
            }else if(response.Message) {                
                this.alertWindowController.script.alertWindowController.setMessage(response.Message);
                this.alertWindowController.enabled = true;
                console.log("Response: ",response.Message);                
            }else {
                this.alertWindowController.script.alertWindowController.setMessage(response);
                this.alertWindowController.enabled = true;
                console.log("Response: "+response);
            }
    }.bind(this));
}

HomeController.prototype.onClickRow = function (event, tmpTable) {
    let tmpDescription = tmpTable.game_type_name +" "+tmpTable.limit_type_name;    
    this.tableInfoController.script.tableInfoController.init(tmpTable.idptable, tmpTable.icon, tmpTable.table_name, tmpDescription, tmpTable.mode_types);
}

//callbacks
HomeController.prototype.loadedSceneHomeRootEntity = function(tmpData) {
    this.localPlayer.iduser = tmpData.iduser;
    this.localPlayer.username = tmpData.username;
    this.localPlayer.chip_balance = tmpData.chip_balance;
    this.localPlayer.chip_inplay = tmpData.chip_inplay;
    this.localPlayer.avatar = tmpData.avatar;
    this.localPlayer.avatar_border_color = tmpData.avatar_border_color;
    this.localPlayer.card_deck = tmpData.card_deck;
    this.localPlayer.card_back = tmpData.card_back;
    
    this.textUserName.element.text = this.localPlayer.username;
    this.textBalance.element.text = USDOLLAR.format(this.localPlayer.chip_balance);
    this.textInPlay.element.text = USDOLLAR.format(this.localPlayer.chip_inplay);

    //console.log("---Weolcome home: "+tmpData+" idplayer: "+localStorage.getItem('idplayer'));
/*
    const avatar = this.app.assets.find("Avatar_"+this.localPlayer.avatar);
    avatar.ready(function (asset) {
        console.log("--Load Avatar: "+asset.name); 
        this.imageAvatar.element.sprite = asset.resource; 
    }, this);
    this.app.assets.load(avatar);*/

    this.createSprite("Avatar_"+this.localPlayer.avatar+".png"); 
    this.loadTableList();
    this.settingsGameController.script.settingsGameController.Init();
};

// swap method called for script hot-reloading
// inherit your script state here
// HomeController.prototype.swap = function(old) { };

// to learn more about script anatomy, please read:
// https://developer.playcanvas.com/en/user-manual/scripting/

/*Preloader
var assets = this.app.assets.findByTag("level-1");
var count = 0;

for (var i = 0; i < assets.length; i++) {
    assets[i].once("load", function () {
        count++;
        if (count === assets.length) {
            // asset loading complete
        }
    });
    this.app.assets.load(assets[i]);
}*/