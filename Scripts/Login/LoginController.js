var LoginController = pc.createScript('loginController');

//Attributes
//PlayerController.attributes.add('frontSpeed', { type: "number"});
//PlayerController.attributes.add('rotateSpeed', { type: "number"});
//PlayerController.attributes.add('templateBullet', { type: "asset", assetType: "template"});
//Objects
LoginController.attributes.add('inputUser', { type: "entity"});
LoginController.attributes.add('inputPassword', { type: "entity"});
LoginController.attributes.add('buttonLogin', { type: "entity"});
LoginController.attributes.add('alertWindowController', { type: "entity"});

// initialize code called once per entity
LoginController.prototype.initialize = function() {
    this.buttonLogin.button.on('click',this.onClickLogin, this);
    //console.log('--TOKEN: '+localStorage.getItem('token'));

   /* this.onHome({
        iduser: 1, 
        username: 'Felipito', 
        chip_balance: 0,
        chip_inplay: 0,
        avatar: 1,
        avatar_border_color: 1,
        card_deck: 1,
        card_back: 1
    });*/
    this.location = {
        ip:null,
        city:null,
        country:null
    }

    pc.http.get('https://ipapi.co/json/',  { "headers": { "Content-Type": "application/json"}},
    function (err, response) {
            if(err) {
                console.log("Error: "+err);         
            }else {
                this.location.ip = response.ip;
                this.location.city = response.city;
                this.location.country = response.country_name;
                //console.log("Response: ",response);
            }
    }.bind(this));


};

// update code called every frame
LoginController.prototype.update = function(dt) {

};

//Public Methods
LoginController.prototype.onClickLogin = function(event) {
    /*console.log("---User: "+ this.inputUser.script.uiInputField.value);
    console.log("---PassWord: "+ this.inputPassword.script.uiInputField.value);*/
    var tmpUser = this.inputUser.script.uiInputField.value;
    var tmpPass = this.inputPassword.script.uiInputField.value;
    tmpUser = "Machetico";
    tmpPass = "admin"

    let tmpPlatform = "Other";
    if(pc.platform.android)
        tmpPlatform = "Android";
    else if(pc.platform.ios)
        tmpPlatform = "IOS";
    else if(pc.platform.windows)
        tmpPlatform = "Windows";
    else if(pc.platform.browser)
        tmpPlatform = "Browser";

    let tmpData = { 
        user:tmpUser, 
        password:tmpPass,
        ip_address:this.location.ip,
        location:this.location.country+" - "+this.location.city,
        device:tmpPlatform
    };

    pc.http.post(SERVER_HOST+"login", tmpData,
        { "headers": { "Content-Type": "application/json"}}, 
        function (err, response) {
            if(err) {
                this.alertWindowController.script.alertWindowController.setMessage("Connection error... 101");
                this.alertWindowController.enabled = true;
                console.log("err: "+err);
            }else if(response.Player) {
                //console.log("Response: ",response.Player);   
                localStorage.setItem('token',response.Token);
                this.onHome(response.Player);             
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
};


LoginController.prototype.onHome = function(tmpData) {
    var oldSceneRootEntity = this.app.root.findByName('Root');
    this.app.scenes.changeScene('Home', function (err, loadedSceneRootEntity) {//entity
        if (err) {
            console.error(err);
        } else {
            oldSceneRootEntity.destroy();
            //console.log("---change: ",loadedSceneRootEntity.findByName("HomeController").script.homeController.test);
            loadedSceneRootEntity.findByName("HomeController").script.homeController.loadedSceneHomeRootEntity(tmpData);
        }
    }.bind(this));
};


// swap method called for script hot-reloading
// inherit your script state here
// LoginController.prototype.swap = function(old) { };

// to learn more about script anatomy, please read:
// https://developer.playcanvas.com/en/user-manual/scripting/