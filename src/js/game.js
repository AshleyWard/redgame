/** @type {import("../../typings/phaser")} */

class GameScene extends Phaser.Scene {
    constructor() {
        super( { key: 'GameScene' } );
    }

    preload ()
    {	
        this.load.spritesheet('sqrl', './src/img/SQORL.png', { frameWidth:48, frameHeight:48 } );  //48 x 48
        this.load.spritesheet('acorn', './src/img/acorn.png', { frameWidth:48, frameHeight:48 } );  //48 x 48
        this.load.image('stump', './src/img/stump.png') ;  //48 x 48
        this.load.image('shadow', './src/img/shadow.png') ;  //48 x 48
    }

    create ()
    {	
        var width = config.width;
        var height = config.height;

        controls = {
            jump: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE),
            attack: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q)
        }

        gameState.keyboard = this.input.keyboard.keys
        gameState.cursors = this.input.keyboard.createCursorKeys(); //  Input Events	

        //player
        //#region
        //squirrel & shadow
        var sqrl    = this.physics.add.sprite(game.config.width/2, game.config.height-100, 'sqrl')
        var shadow  = this.add.sprite(game.config.width/2, game.config.height-100, 'shadow')

        sqrl.speed  = 220;
        shadow.y    = sqrl.y+25;
        
        //sq+sh become player
        var player = this.physics.add.group([sqrl, shadow]);
        
        gameState.player = player;

        gameState.player.onGround = true;
        gameState.player.squirrel = sqrl;
        gameState.player.shadow = shadow;
        //#endregion
        
        //anims
        //#region
        this.anims.create({
            key: 'sqrl-left',
            frames: this.anims.generateFrameNumbers('sqrl', { frames: [12, 13, 14] }),
            frameRate: 5,
            repeat: -1
        });
        this.anims.create({
            key: 'sqrl-right',
            frames: this.anims.generateFrameNumbers('sqrl', { frames: [24, 25, 26] }),
            frameRate: 5,
            repeat: -1
        });
        this.anims.create({
            key: 'sqrl-up',
            frames: this.anims.generateFrameNumbers('sqrl', { frames: [36, 37, 38] }),
            frameRate: 5,
            repeat: -1
        });
        this.anims.create({
            key: 'sqrl-down',
            frames: this.anims.generateFrameNumbers('sqrl', { frames: [0, 1, 2] }),
            frameRate: 5,
            repeat: -1
        });
        this.anims.create({
            key: 'acornRotate',
            frames: this.anims.generateFrameNumbers('acorn', {start: 0, end: 9}),
            frameRate: 10,
            repeat: -1
        });
        //#endregion

        //actions
        //#region
        gameState.actions.jumpHelper = this.physics.add.sprite(0, 0)
        gameState.actions.jumpHelper.yChanged = false;
        gameState.actions.jumpHelper.lastY = 0;
        gameState.actions.jump = () => {
        

            let jumpTween = this.tweens.add({
                paused:     false,
                targets:    gameState.actions.jumpHelper,
                y:          gameState.actions.jumpHelper.y - 100,
                ease:       'Sine',
                duration:   400,
                repeat:     0,
                yoyo:       true,
                onComplete: function () {
                    gameState.player.jumping = false;
                }
            });

            let jumpShadeTween = this.tweens.add({
                paused:     false,
                targets:    gameState.player.shadow,
                scaleX:     1.3,
                ease:       'Sine',
                duration:   400,
                repeat:     0,
                yoyo:       true,
                onComplete: function () {
                    gameState.player.jumping = false;
                }
            });
        }


        

        var basicWeapon = {
            name: 'acorn',
            delay:  '500'
        }

        gameState.weapons = {};
        gameState.weapons.currentWeapon = basicWeapon;

        gameState.actions.attack = () => {};
        gameState.actions.attack.disabled = false;

        gameState.actions.attack = () => {
            if(!gameState.actions.attack.disabled) {
                //Vars
                var proj = gameState.weapons.currentWeapon;
                var squirrel = gameState.player.squirrel;

                //Attack!
                console.log(`I shoot a ${proj.name} at you! pew!`)

                var facing = gameState.player.facing;

                let facingOffsetX = 0;
                let facingOffsetY = 0;

                if (facing === 'left')  { facingOffsetX = -25 }
                if (facing === 'right') { facingOffsetX = 25 }
                if (facing === 'up')    { facingOffsetY = -25 }
                if (facing === 'down')  { facingOffsetY = 25 }

                var attackNut = this.physics.add.sprite(squirrel.x + facingOffsetX, squirrel.y + facingOffsetY, 'acorn')
                attackNut.setScale(0.5);
                attackNut.anims.play('acornRotate',true);
                var nutCol = this.physics.add.collider(attackNut, stumps, () => {
                    console.log('contact');
                });

                let acornTweenY = this.tweens.add({
                    paused:     true,
                    targets:    attackNut,
                    y:          squirrel.y - 100,
                    ease:       'Sine',
                    duration:   400,
                    repeat:     0,
                    yoyo:       true,
                    onComplete: function () {
                        attackNut.destroy();
                    }
                });
                let acornTweenX = this.tweens.add({
                    paused:     true,
                    targets:    attackNut,
                    x:          squirrel.x + facingOffsetX * 15,
                    ease:       'Linear',
                    duration:   800,
                    repeat:     0,
                    yoyo:       false
                });

                acornTweenY.play()
                acornTweenX.play()


                //Attack delay timer:
                gameState.actions.attack.disabled = true;
                gameState.actions.attack.lastAttack = this.time.delayedCall(proj.delay, () => {
                    gameState.actions.attack.disabled = false;
                    console.log('Attack ready');
                });
            }
        }

        
        //#endregion
        

        // ===WORLD===
        //bgFloors
        //#region
        var bgFloor1     = this.add.rectangle(width/2, height*1.1, width*2, height, 0x00FF00, 1);
        var bgFloor2     = this.add.rectangle(width/2, height*1.1, width*2, height, 0x00FF00, 1);
        bgFloor1.setRotation(-0.1);
        bgFloor2.setRotation(0.1);

        var bgFloors = this.physics.add.staticGroup([bgFloor1, bgFloor2])
        //#endregion

        //Floors
        //#region
        var platforms = this.physics.add.staticGroup();
        var floor1 = platforms.create(game.config.width/2, game.config.height, 'floor').setScale(25,1).refreshBody();
        var floor2 = platforms.create(0, game.config.height-150, 'floor').setScale(.25,10).refreshBody();
        var floor3 = platforms.create(game.config.width, game.config.height-150, 'floor').setScale(.25,10).refreshBody();
        //#endregion

        //Roofs
        //#region
        var roofs = this.physics.add.staticGroup();
        var roof1 = roofs.create(400, 150,   'floor').setScale(25,10).refreshBody();
        var roof1 = roofs.create(400, 160,   'floor').setScale(20,10).refreshBody();
        var roof1 = roofs.create(400, 170,   'floor').setScale(15,10).refreshBody();
        var roof1 = roofs.create(400, 180,   'floor').setScale(10,10).refreshBody();
        var roof1 = roofs.create(400, 190,   'floor').setScale( 5,10).refreshBody();

        roofs.setVisible(false);
        //#endregion

        //stumps
        //#region
        var stumps = this.physics.add.group({ allowGravity: false });
        var s1 = stumps.create(225,490, 'stump');
        var s2 = stumps.create(0,game.config.height, 'stump');
        //#endregion

        //world colliders
        //#region
        var plCol = this.physics.add.collider(gameState.player.squirrel, platforms, () => {

        });
        var roCol = this.physics.add.collider(gameState.player.squirrel, roofs, () => {
            gameState.player.touchingRoof = true;
        });
        var flCol = this.physics.add.collider(gameState.player.squirrel, bgFloors, () => {
            gameState.player.touchingRoof = false;
        });
        flCol.overlapOnly = true;
        var stCol = this.physics.add.collider(gameState.player.squirrel, stumps, () => {

        });
        //#endregion

        //layers
        //#region
        var charLayer = this.add.layer([ sqrl,
                                        shadow ]);

        var midLayer = this.add.layer([ s1,
                                        s2  ])

        var bgLayer = this.add.layer([  floor1,
                                        floor2,
                                        floor3,
                                        bgFloor1,
                                        bgFloor2])
        
        charLayer.setDepth(0);
        midLayer.setDepth(1);
        bgLayer.setDepth(-2);
        //#endregion

        //debug
        //#region 
        this.physics.world.drawDebug = !this.physics.world.drawDebug;
        this.physics.world.debugGraphic.visible = this.physics.world.drawDebug;
        this.input.on('pointerdown', () => {
            this.physics.world.drawDebug = !this.physics.world.drawDebug;
            this.physics.world.debugGraphic.visible = this.physics.world.drawDebug;
        })
        //#endregion
    }

    update ()
    {	
        let left    = gameState.cursors.left.isDown;
        let right   = gameState.cursors.right.isDown;
        let up      = gameState.cursors.up.isDown;
        let down    = gameState.cursors.down.isDown;

        let jump = controls.jump.isDown;
        let attack = controls.attack.isDown;

        let horizontalInput = (left || right);
        let verticalInput = (up || down);
        let anyDirection   = (horizontalInput || verticalInput);

        let player = gameState.player;
        let squirrel = gameState.player.squirrel;
        let shadow = gameState.player.children.entries[1];

        if (attack) {
            gameState.actions.attack();
        }

        if (jump) {
            if(!player.jumping) {
                player.jumping = true;
                gameState.actions.jump();
            }
        }

        if (left)
        {
            player.setVelocityX(-squirrel.speed);
            squirrel.anims.play('sqrl-left', true);
            player.facing = 'left';
        }
        if (right)
        {			
            player.setVelocityX(squirrel.speed);
            squirrel.anims.play('sqrl-right', true);
            player.facing = 'right';
        }
        if (up && player.onGround && !player.touchingRoof)
        {
            player.setVelocityY(-squirrel.speed/2);
            if (!horizontalInput) { 
                squirrel.anims.play('sqrl-up', true)
                player.facing = 'up'; 
            }
        }
        if (down)
        {
            player.setVelocityY(squirrel.speed/2);
            if (!horizontalInput) { 
                squirrel.anims.play('sqrl-down', true)
                player.facing = 'down';  
            }
        }

        if (!anyDirection)
        {
            squirrel.anims.pause();
        } else {
            shadow.x = squirrel.x;
            if(!player.jumping){
                shadow.y = squirrel.y+25;
            }
        }

        //#region ==> Multiple controls at once...
        if (!left && !right || left && right)
        {
            player.setVelocityX(0);
        }
        if (!up && !down || up && down)
        {
            player.setVelocityY(0);
        }
        //#endregion
        if (gameState.actions.jumpHelper.y != gameState.actions.jumpHelper.lastY){
            let diff = gameState.actions.jumpHelper.lastY - gameState.actions.jumpHelper.y
            //squirrel.height = squirrel.height + diff
            squirrel.y -= diff;
            //console.log(squirrel.height);
            gameState.actions.jumpHelper.lastY = gameState.actions.jumpHelper.y
        }
        

    }
}


var gameState = {
    player: {},
    actions: {}
};
var controls = {};


var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 650,
	backgroundColor: 0x80AADC,
    physics: {
        default: 'arcade',
        arcade: {
            //gravity:    { y: 500 },
            enableBody: true,
            debug: true
        }
    },
    scene: [GameScene]
};


let game = new Phaser.Game(config);