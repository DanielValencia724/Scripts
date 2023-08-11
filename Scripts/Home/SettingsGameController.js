var SettingsGameController = pc.createScript('settingsGameController');

//Objects
SettingsGameController.attributes.add('homeController', { type: "entity"});
SettingsGameController.attributes.add('imageAvatar', { type: "entity"});
SettingsGameController.attributes.add('buttonAvatar', {
    type: 'entity',
    array: true
});

SettingsGameController.attributes.add('buttonAvatarBorderColor', {
    type: 'entity',
    array: true
});

SettingsGameController.attributes.add('buttonCardDeck', {
    type: 'entity',
    array: true
});

SettingsGameController.attributes.add('buttonCardBack', {
    type: 'entity',
    array: true
});

// initialize code called once per entity
SettingsGameController.prototype.Init = function() {
    this.localPlayer = this.homeController.script.homeController.localPlayer;
    for(let i=0; i<this.buttonAvatar.length; i++)
    {
        this.buttonAvatar[i].button.on('click', function(event) {
            this.OnClickButtonAvatar(i+1);
        }, this);
        
        if(this.localPlayer.avatar == (i+1))
        {
            this.buttonAvatar[i].children[1].element.color = new pc.Color(0,1,0.87);
        }else {
            this.buttonAvatar[i].children[1].element.color = pc.Color.WHITE;
        }
    }

    for(let i=0; i<this.buttonAvatarBorderColor.length; i++)
    {
        this.buttonAvatarBorderColor[i].button.on('click', function(event) {
            this.OnClickButtonAvatarBorderColor(i+1);
        }, this);
        
        if(this.localPlayer.avatar_border_color == (i+1))
        {
            this.buttonAvatarBorderColor[i].element.color = new pc.Color(0,1,0.87,1);
            this.buttonAvatarBorderColor[i].element.opacity = 1;
        }else {
            this.buttonAvatarBorderColor[i].element.color = new pc.Color(0,0,0,0);
            this.buttonAvatarBorderColor[i].element.opacity = 0;
        }
    }

    for(let i=0; i<this.buttonCardDeck.length; i++)
    {
        this.buttonCardDeck[i].button.on('click', function(event) {
            this.OnClickButtonCardDeck(i+1);
        }, this);
        
        if(this.localPlayer.card_deck == (i+1))
        {
            this.buttonCardDeck[i].element.color = new pc.Color(0,1,0.87,1);
            this.buttonCardDeck[i].element.opacity = 1;
        }else {
            this.buttonCardDeck[i].element.color = new pc.Color(0,0,0,0);
            this.buttonCardDeck[i].element.opacity = 0;
        }
    }

    for(let i=0; i<this.buttonCardBack.length; i++)
    {
        this.buttonCardBack[i].button.on('click', function(event) {
            this.OnClickButtonCardBack(i+1);
        }, this);
        
        if(this.localPlayer.card_back == (i+1))
        {
            this.buttonCardBack[i].element.color = new pc.Color(0,1,0.87,1);
            this.buttonCardBack[i].element.opacity = 1;
        }else {
            this.buttonCardBack[i].element.color = new pc.Color(0,0,0,0);
            this.buttonCardBack[i].element.opacity = 0;
        }
    }
};


//private methods
SettingsGameController.prototype.createSprite = function(tmpFileName) {
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

//Events
SettingsGameController.prototype.OnClickButtonAvatar = function(tmpIdAvatar)
{
    console.log('----Avatar: '+tmpIdAvatar);
     

      pc.http.post(SERVER_HOST+"set_avatar",
        { token:localStorage.getItem('token'), idavatar:tmpIdAvatar },
        { "headers": { "Content-Type": "application/json"}}, 
        function (err, response) {
            if(err) {
                Window.alertWindowController.script.alertWindowController.setMessage("Connection error... 101");
                Window.alertWindowController.enabled = true;
                console.log("err: "+err);
            }else if(response.Success) {                
                this.createSprite("Avatar_"+tmpIdAvatar+".png");    
                this.homeController.script.homeController.localPlayer.avatar = tmpIdAvatar;
                this.localPlayer.avatar = tmpIdAvatar
                for(let i=0; i<this.buttonAvatar.length; i++)
                {
                    if(this.localPlayer.avatar == (i+1))
                    {
                        this.buttonAvatar[i].children[1].element.color = new pc.Color(0,1,0.87);
                    }else {
                        this.buttonAvatar[i].children[1].element.color = pc.Color.WHITE;
                    }
                }

                console.log("Response: ",response.Success);   
                localStorage.setItem('token',response.Token);    
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

SettingsGameController.prototype.OnClickButtonAvatarBorderColor = function(tmpIdBorder)
{
    console.log('----AvatarBorderColor: '+tmpIdBorder);
     

      pc.http.post(SERVER_HOST+"set_avatar_border_color",
        { token:localStorage.getItem('token'), idoption:tmpIdBorder },
        { "headers": { "Content-Type": "application/json"}}, 
        function (err, response) {
            if(err) {
                Window.alertWindowController.script.alertWindowController.setMessage("Connection error... 101");
                Window.alertWindowController.enabled = true;
                console.log("err: "+err);
            }else if(response.Success) {                    
                this.homeController.script.homeController.localPlayer.avatar_border_color = tmpIdBorder;
                this.localPlayer.avatar_border_color = tmpIdBorder
                for(let i=0; i<this.buttonAvatarBorderColor.length; i++)
                {
                    if(this.localPlayer.avatar_border_color == (i+1))
                    {
                        this.buttonAvatarBorderColor[i].element.color = new pc.Color(0,1,0.87,1);
                        this.buttonAvatarBorderColor[i].element.opacity = 1;
                    }else {
                        this.buttonAvatarBorderColor[i].element.color = new pc.Color(0,0,0,0);
                        this.buttonAvatarBorderColor[i].element.opacity = 0;
                    }
                }

                console.log("Response: ",response.Success);   
                localStorage.setItem('token',response.Token);    
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

SettingsGameController.prototype.OnClickButtonCardDeck = function(tmpIdCardDeck)
{
    console.log('----CardDeck: '+tmpIdCardDeck);
     

      pc.http.post(SERVER_HOST+"set_card_deck",
        { token:localStorage.getItem('token'), idoption:tmpIdCardDeck },
        { "headers": { "Content-Type": "application/json"}}, 
        function (err, response) {
            if(err) {
                Window.alertWindowController.script.alertWindowController.setMessage("Connection error... 101");
                Window.alertWindowController.enabled = true;
                console.log("err: "+err);
            }else if(response.Success) {                    
                this.homeController.script.homeController.localPlayer.card_deck = tmpIdCardDeck;
                this.localPlayer.card_deck = tmpIdCardDeck
                for(let i=0; i<this.buttonCardDeck.length; i++)
                {
                    if(this.localPlayer.card_deck == (i+1))
                    {
                        this.buttonCardDeck[i].element.color = new pc.Color(0,1,0.87,1);
                        this.buttonCardDeck[i].element.opacity = 1;
                    }else {
                        this.buttonCardDeck[i].element.color = new pc.Color(0,0,0,0);
                        this.buttonCardDeck[i].element.opacity = 0;
                    }
                }

                console.log("Response: ",response.Success);   
                localStorage.setItem('token',response.Token);    
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

SettingsGameController.prototype.OnClickButtonCardBack = function(tmpIdCardBack)
{
    console.log('----CardBack: '+tmpIdCardBack);
     

      pc.http.post(SERVER_HOST+"set_card_back",
        { token:localStorage.getItem('token'), idoption:tmpIdCardBack },
        { "headers": { "Content-Type": "application/json"}}, 
        function (err, response) {
            if(err) {
                Window.alertWindowController.script.alertWindowController.setMessage("Connection error... 101");
                Window.alertWindowController.enabled = true;
                console.log("err: "+err);
            }else if(response.Success) {                    
                this.homeController.script.homeController.localPlayer.card_deck = tmpIdCardBack;
                this.localPlayer.card_back = tmpIdCardBack
                for(let i=0; i<this.buttonCardBack.length; i++)
                {
                    if(this.localPlayer.card_back == (i+1))
                    {
                        this.buttonCardBack[i].element.color = new pc.Color(0,1,0.87,1);
                        this.buttonCardBack[i].element.opacity = 1;
                    }else {
                        this.buttonCardBack[i].element.color = new pc.Color(0,0,0,0);
                        this.buttonCardBack[i].element.opacity = 0;
                    }
                }

                console.log("Response: ",response.Success);   
                localStorage.setItem('token',response.Token);    
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

// swap method called for script hot-reloading
// inherit your script state here
// SettingsGameController.prototype.swap = function(old) { };

// to learn more about script anatomy, please read:
// https://developer.playcanvas.com/en/user-manual/scripting/