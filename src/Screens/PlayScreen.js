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
