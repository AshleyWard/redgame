// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"src/js/game.js":[function(require,module,exports) {
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

/** @type {import("../../typings/phaser")} */
var GameScene = /*#__PURE__*/function (_Phaser$Scene) {
  _inherits(GameScene, _Phaser$Scene);

  var _super = _createSuper(GameScene);

  function GameScene() {
    _classCallCheck(this, GameScene);

    return _super.call(this, {
      key: 'GameScene'
    });
  }

  _createClass(GameScene, [{
    key: "preload",
    value: function preload() {
      this.load.spritesheet('sqrl', './src/img/SQORL.png', {
        frameWidth: 48,
        frameHeight: 48
      }); //48 x 48

      this.load.spritesheet('acorn', './src/img/acorn.png', {
        frameWidth: 48,
        frameHeight: 48
      }); //48 x 48

      this.load.image('stump', './src/img/stump.png'); //48 x 48

      this.load.image('shadow', './src/img/shadow.png'); //48 x 48
    }
  }, {
    key: "create",
    value: function create() {
      var _this = this;

      var width = config.width;
      var height = config.height;
      controls = {
        jump: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE),
        attack: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q)
      };
      gameState.keyboard = this.input.keyboard.keys;
      gameState.cursors = this.input.keyboard.createCursorKeys(); //  Input Events	
      //player
      //#region
      //squirrel & shadow

      var sqrl = this.physics.add.sprite(game.config.width / 2, game.config.height - 100, 'sqrl');
      var shadow = this.add.sprite(game.config.width / 2, game.config.height - 100, 'shadow');
      sqrl.speed = 220;
      shadow.y = sqrl.y + 25; //sq+sh become player

      var player = this.physics.add.group([sqrl, shadow]);
      gameState.player = player;
      gameState.player.onGround = true;
      gameState.player.squirrel = sqrl;
      gameState.player.shadow = shadow; //#endregion
      //anims
      //#region

      this.anims.create({
        key: 'sqrl-left',
        frames: this.anims.generateFrameNumbers('sqrl', {
          frames: [12, 13, 14]
        }),
        frameRate: 5,
        repeat: -1
      });
      this.anims.create({
        key: 'sqrl-right',
        frames: this.anims.generateFrameNumbers('sqrl', {
          frames: [24, 25, 26]
        }),
        frameRate: 5,
        repeat: -1
      });
      this.anims.create({
        key: 'sqrl-up',
        frames: this.anims.generateFrameNumbers('sqrl', {
          frames: [36, 37, 38]
        }),
        frameRate: 5,
        repeat: -1
      });
      this.anims.create({
        key: 'sqrl-down',
        frames: this.anims.generateFrameNumbers('sqrl', {
          frames: [0, 1, 2]
        }),
        frameRate: 5,
        repeat: -1
      });
      this.anims.create({
        key: 'acornRotate',
        frames: this.anims.generateFrameNumbers('acorn', {
          start: 0,
          end: 9
        }),
        frameRate: 10,
        repeat: -1
      }); //#endregion
      //actions
      //#region

      gameState.actions.jumpHelper = this.physics.add.sprite(0, 0);
      gameState.actions.jumpHelper.yChanged = false;
      gameState.actions.jumpHelper.lastY = 0;

      gameState.actions.jump = function () {
        var jumpTween = _this.tweens.add({
          paused: false,
          targets: gameState.actions.jumpHelper,
          y: gameState.actions.jumpHelper.y - 100,
          ease: 'Sine',
          duration: 400,
          repeat: 0,
          yoyo: true,
          onComplete: function onComplete() {
            gameState.player.jumping = false;
          }
        });

        var jumpShadeTween = _this.tweens.add({
          paused: false,
          targets: gameState.player.shadow,
          scaleX: 1.3,
          ease: 'Sine',
          duration: 400,
          repeat: 0,
          yoyo: true,
          onComplete: function onComplete() {
            gameState.player.jumping = false;
          }
        });
      };

      var basicWeapon = {
        name: 'acorn',
        delay: '500'
      };
      gameState.weapons = {};
      gameState.weapons.currentWeapon = basicWeapon;

      gameState.actions.attack = function () {};

      gameState.actions.attack.disabled = false;

      gameState.actions.attack = function () {
        if (!gameState.actions.attack.disabled) {
          //Vars
          var proj = gameState.weapons.currentWeapon;
          var squirrel = gameState.player.squirrel; //Attack!

          console.log("I shoot a ".concat(proj.name, " at you! pew!"));
          var facing = gameState.player.facing;
          var facingOffsetX = 0;
          var facingOffsetY = 0;

          if (facing === 'left') {
            facingOffsetX = -25;
          }

          if (facing === 'right') {
            facingOffsetX = 25;
          }

          if (facing === 'up') {
            facingOffsetY = -25;
          }

          if (facing === 'down') {
            facingOffsetY = 25;
          }

          var attackNut = _this.physics.add.sprite(squirrel.x + facingOffsetX, squirrel.y + facingOffsetY, 'acorn');

          attackNut.setScale(0.5);
          attackNut.anims.play('acornRotate', true);

          var nutCol = _this.physics.add.collider(attackNut, stumps, function () {
            console.log('contact');
          });

          var acornTweenY = _this.tweens.add({
            paused: true,
            targets: attackNut,
            y: squirrel.y - 100,
            ease: 'Sine',
            duration: 400,
            repeat: 0,
            yoyo: true,
            onComplete: function onComplete() {
              attackNut.destroy();
            }
          });

          var acornTweenX = _this.tweens.add({
            paused: true,
            targets: attackNut,
            x: squirrel.x + facingOffsetX * 15,
            ease: 'Linear',
            duration: 800,
            repeat: 0,
            yoyo: false
          });

          acornTweenY.play();
          acornTweenX.play(); //Attack delay timer:

          gameState.actions.attack.disabled = true;
          gameState.actions.attack.lastAttack = _this.time.delayedCall(proj.delay, function () {
            gameState.actions.attack.disabled = false;
            console.log('Attack ready');
          });
        }
      }; //#endregion
      // ===WORLD===
      //bgFloors
      //#region


      var bgFloor1 = this.add.rectangle(width / 2, height * 1.1, width * 2, height, 0x00FF00, 1);
      var bgFloor2 = this.add.rectangle(width / 2, height * 1.1, width * 2, height, 0x00FF00, 1);
      bgFloor1.setRotation(-0.1);
      bgFloor2.setRotation(0.1);
      var bgFloors = this.physics.add.staticGroup([bgFloor1, bgFloor2]); //#endregion
      //Floors
      //#region

      var platforms = this.physics.add.staticGroup();
      var floor1 = platforms.create(game.config.width / 2, game.config.height, 'floor').setScale(25, 1).refreshBody();
      var floor2 = platforms.create(0, game.config.height - 150, 'floor').setScale(.25, 10).refreshBody();
      var floor3 = platforms.create(game.config.width, game.config.height - 150, 'floor').setScale(.25, 10).refreshBody(); //#endregion
      //Roofs
      //#region

      var roofs = this.physics.add.staticGroup();
      var roof1 = roofs.create(400, 150, 'floor').setScale(25, 10).refreshBody();
      var roof1 = roofs.create(400, 160, 'floor').setScale(20, 10).refreshBody();
      var roof1 = roofs.create(400, 170, 'floor').setScale(15, 10).refreshBody();
      var roof1 = roofs.create(400, 180, 'floor').setScale(10, 10).refreshBody();
      var roof1 = roofs.create(400, 190, 'floor').setScale(5, 10).refreshBody();
      roofs.setVisible(false); //#endregion
      //stumps
      //#region

      var stumps = this.physics.add.group({
        allowGravity: false
      });
      var s1 = stumps.create(225, 490, 'stump');
      var s2 = stumps.create(0, game.config.height, 'stump'); //#endregion
      //world colliders
      //#region

      var plCol = this.physics.add.collider(gameState.player.squirrel, platforms, function () {});
      var roCol = this.physics.add.collider(gameState.player.squirrel, roofs, function () {
        gameState.player.touchingRoof = true;
      });
      var flCol = this.physics.add.collider(gameState.player.squirrel, bgFloors, function () {
        gameState.player.touchingRoof = false;
      });
      flCol.overlapOnly = true;
      var stCol = this.physics.add.collider(gameState.player.squirrel, stumps, function () {}); //#endregion
      //layers
      //#region

      var charLayer = this.add.layer([sqrl, shadow]);
      var midLayer = this.add.layer([s1, s2]);
      var bgLayer = this.add.layer([floor1, floor2, floor3, bgFloor1, bgFloor2]);
      charLayer.setDepth(0);
      midLayer.setDepth(1);
      bgLayer.setDepth(-2); //#endregion
      //debug
      //#region 

      this.physics.world.drawDebug = !this.physics.world.drawDebug;
      this.physics.world.debugGraphic.visible = this.physics.world.drawDebug;
      this.input.on('pointerdown', function () {
        _this.physics.world.drawDebug = !_this.physics.world.drawDebug;
        _this.physics.world.debugGraphic.visible = _this.physics.world.drawDebug;
      }); //#endregion
    }
  }, {
    key: "update",
    value: function update() {
      var left = gameState.cursors.left.isDown;
      var right = gameState.cursors.right.isDown;
      var up = gameState.cursors.up.isDown;
      var down = gameState.cursors.down.isDown;
      var jump = controls.jump.isDown;
      var attack = controls.attack.isDown;
      var horizontalInput = left || right;
      var verticalInput = up || down;
      var anyDirection = horizontalInput || verticalInput;
      var player = gameState.player;
      var squirrel = gameState.player.squirrel;
      var shadow = gameState.player.children.entries[1];

      if (attack) {
        gameState.actions.attack();
      }

      if (jump) {
        if (!player.jumping) {
          player.jumping = true;
          gameState.actions.jump();
        }
      }

      if (left) {
        player.setVelocityX(-squirrel.speed);
        squirrel.anims.play('sqrl-left', true);
        player.facing = 'left';
      }

      if (right) {
        player.setVelocityX(squirrel.speed);
        squirrel.anims.play('sqrl-right', true);
        player.facing = 'right';
      }

      if (up && player.onGround && !player.touchingRoof) {
        player.setVelocityY(-squirrel.speed / 2);

        if (!horizontalInput) {
          squirrel.anims.play('sqrl-up', true);
          player.facing = 'up';
        }
      }

      if (down) {
        player.setVelocityY(squirrel.speed / 2);

        if (!horizontalInput) {
          squirrel.anims.play('sqrl-down', true);
          player.facing = 'down';
        }
      }

      if (!anyDirection) {
        squirrel.anims.pause();
      } else {
        shadow.x = squirrel.x;

        if (!player.jumping) {
          shadow.y = squirrel.y + 25;
        }
      } //#region ==> Multiple controls at once...


      if (!left && !right || left && right) {
        player.setVelocityX(0);
      }

      if (!up && !down || up && down) {
        player.setVelocityY(0);
      } //#endregion


      if (gameState.actions.jumpHelper.y != gameState.actions.jumpHelper.lastY) {
        var diff = gameState.actions.jumpHelper.lastY - gameState.actions.jumpHelper.y; //squirrel.height = squirrel.height + diff

        squirrel.y -= diff; //console.log(squirrel.height);

        gameState.actions.jumpHelper.lastY = gameState.actions.jumpHelper.y;
      }
    }
  }]);

  return GameScene;
}(Phaser.Scene);

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
var game = new Phaser.Game(config);
},{}],"../../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "1044" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","src/js/game.js"], null)
//# sourceMappingURL=/game.55ae202d.js.map