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
			bomb:  [me.input.KEY.K, me.input.KEY.SHIFT],
			OK:    [me.input.KEY.ENTER],
		};

		Object.keys(keys).forEach(function(k) {
			keys[k].forEach(function(code) {
				me.input.bindKey(code, k);
			})
		})

		this.loadNextLevel();
	},

	levelLoaded: function() {
		me.game.world.addChild(new GBGJ.BombDisplay());
		this.player.setBombs(3);
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
