var ChangePasswordController = pc.createScript('changePasswordController');

//////////Objects
//text
ChangePasswordController.attributes.add('inputCurrentPassword', { type: "entity"});
ChangePasswordController.attributes.add('inputNewPassword', { type: "entity"});
ChangePasswordController.attributes.add('inputConfirmPassword', { type: "entity"});
ChangePasswordController.attributes.add('buttonChange', { type: "entity"});

// initialize code called once per entity
ChangePasswordController.prototype.initialize = function() {
    this.buttonChange.button.on('click',this.onClickButtonChange, this);
};


ChangePasswordController.prototype.onClickButtonChange = function() {
                
    var tmpCurrentPass = this.inputCurrentPassword.script.uiInputField.value;
    var tmpNewPass = this.inputNewPassword.script.uiInputField.value;
    var tmpConfirmPass = this.inputConfirmPassword.script.uiInputField.value;

    if(tmpCurrentPass.length <= 0)
    {
        Window.alertWindowController.script.alertWindowController.setMessage("Current password is require");
        Window.alertWindowController.enabled = true;
    }else if(tmpNewPass.length <= 0 || tmpNewPass.length < 8)
    {
        Window.alertWindowController.script.alertWindowController.setMessage("New password is require");
        Window.alertWindowController.enabled = true;
    }else if(tmpConfirmPass.length <= 0 || tmpConfirmPass.length < 8)
    {
        Window.alertWindowController.script.alertWindowController.setMessage("Confirm password is require");
        Window.alertWindowController.enabled = true;
    }else if(tmpNewPass != tmpConfirmPass)
    {
        Window.alertWindowController.script.alertWindowController.setMessage("The confirm password is diferent");
        Window.alertWindowController.enabled = true;
    }

    pc.http.post(SERVER_HOST+"set_password",
        { token:localStorage.getItem('token'), 
        password:tmpCurrentPass,
        newpassword:tmpNewPass },
        { "headers": { "Content-Type": "application/json"}}, 
        function (err, response) {
            if(err) {
                Window.alertWindowController.script.alertWindowController.setMessage("Connection error... 101");
                Window.alertWindowController.enabled = true;
                console.log("err: "+err);
            }else if(response.Success) {                    
                Window.alertWindowController.script.alertWindowController.setMessage("New Password Changed!");
                console.log("Response: ",response.Success);   
                localStorage.setItem('token',response.Token);    
                this.inputCurrentPassword.script.uiInputField.initialize();
                this.inputNewPassword.script.uiInputField.initialize();
                this.inputConfirmPassword.script.uiInputField.initialize();
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