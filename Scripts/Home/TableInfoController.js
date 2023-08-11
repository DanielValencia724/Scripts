var TableInfoController = pc.createScript('tableInfoController');

//Objects
TableInfoController.attributes.add('imageIcon', { type: "entity"});
TableInfoController.attributes.add('textTableName', { type: "entity"});
TableInfoController.attributes.add('textGameDescription', { type: "entity"});
TableInfoController.attributes.add('modeType', {
    type: 'entity',
    array: true
});

TableInfoController.attributes.add('textPlayerSeat', {
    type: 'entity',
    array: true
});

TableInfoController.attributes.add('buttonPlayerSeat', {
    type: 'entity',
    array: true
});

TableInfoController.attributes.add('buttonOpenTable', { type: "entity"});

// initialize code called once per entity
TableInfoController.prototype.initialize = function() {

};

// update code called every frame
/*TableInfoController.prototype.update = function(dt) {

};
*/

//private methods
TableInfoController.prototype.createSprite = function(idicon) {
    const avatar = this.app.assets.find("Table_Icons.png", "texture");
    avatar.ready(function (asset) {
        // asset loaded
        //console.log("--Load Avatar: ",asset); 
        //this.imageAvatar.element.sprite = asset.resource;
        var texture = asset.resource;
        texture.addressU = pc.ADDRESS_CLAMP_TO_EDGE;
        texture.addressV = pc.ADDRESS_CLAMP_TO_EDGE;
        texture.minFilter = pc.FILTER_NEAREST;
        texture.magFilter = pc.FILTER_NEAREST;

        var atlas = new pc.TextureAtlas();
        atlas.frames = {
            "0": {
                rect: new pc.Vec4(idicon * 64, 0, 64, 64),
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

        this.imageIcon.element.sprite = sprite; 
    }, this);
    this.app.assets.load(avatar);
    //console.log('--TOKEN: '+localStorage.getItem('token'));
};

//Public Methods
TableInfoController.prototype.init = function(tmpIdTable, tmpImageIcon, tmpTextTableName, tmpTextGameDescription, tmpModeTypes) {
    this.createSprite(tmpImageIcon-1);
    this.textTableName.element.text = tmpTextTableName;
    this.textGameDescription.element.text = tmpTextGameDescription;
/*
    for(let j=0; j<this.modeType.length; j++) {
        this.modeType[j].enabled = false;
    } */

    for(let j=0; j<this.modeType.length; j++) {
        this.modeType[j].enabled = false;

        if(tmpModeTypes.length > j)
        if((tmpModeTypes[j].idmode_type - 1) == j)
            this.modeType[tmpModeTypes[j].idmode_type - 1].enabled = true;
    }   
};