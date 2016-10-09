"use strict";

GBGJ.PlayScreen = me.ScreenObject.extend({
	init: function() {
		this._super(me.ScreenObject, 'init', []);
		this.setNextLevel(GBGJ.data.options.level || "level1");
	},

	setNextLevel: function(name) {
		this.nextLevel = name;
	},

	goToNextLevel: function(level) {
		this.setNextLevel(level);
		this.loadNextLevel()
	},

	onResetEvent: function() {
		me.game.world.autoSort = true;
		me.game.world.autoDepth = false;

		var keys = {
			left:  [me.input.KEY.LEFT, me.input.KEY.A],
			right: [me.input.KEY.RIGHT, me.input.KEY.D],
			up:    [me.input.KEY.UP, me.input.KEY.W],
			down:  [me.input.KEY.DOWN, me.input.KEY.S],

			shoot: [me.input.KEY.SPACE, me.input.KEY.J],
			dash:  [me.input.KEY.K, me.input.KEY.SHIFT],
			OK:    [me.input.KEY.ENTER],
		};

		Object.keys(keys).forEach(function(k) {
			keys[k].forEach(function(code) {
				me.input.bindKey(code, k);
			})
		})

		if(me.input.GAMEPAD) {
			me.input.bindGamepad(0,
				{type: 'button', code: me.input.GAMEPAD.BUTTONS.FACE_2},
				 keys.dash[0]
			 );
			me.input.bindGamepad(0,
				{type: 'button', code:  me.input.GAMEPAD.BUTTONS.FACE_1},
				keys.shoot[0]
			 );
			me.input.bindGamepad(0,
				{type: 'button', code: me.input.GAMEPAD.BUTTONS.UP},
				keys.up[0]
			);
			me.input.bindGamepad(0,
				{type: 'button', code: me.input.GAMEPAD.BUTTONS.DOWN},
				keys.down[0]
			);
			me.input.bindGamepad(0,
				{type: 'button', code: me.input.GAMEPAD.BUTTONS.LEFT},
				keys.left[0]
			);
			me.input.bindGamepad(0,
				{type: 'button', code: me.input.GAMEPAD.BUTTONS.RIGHT},
				keys.right[0]
			);
		}

		this.loadNextLevel();
	},

	levelLoaded: function() {
		me.game.world.addChild(new GBGJ.LevelDisplay({
			level: this.nextLevel,
		}));
	},

	loadNextLevel: function() {
		me.levelDirector.loadLevel(this.nextLevel, {
			onLoaded: this.levelLoaded.bind(this),
		});
	},

	onDestroyEvent: function() {
	},

	onModeChange: function(oldMode, newMode) {
	},
});
