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

		var song = "";
		if (this.nextLevel == "level1") {
			song = "gbjam5-1";
		}
		else if (this.nextLevel == "level3") {
			song = "gbjam5-2";
		}
		else if (this.nextLevel == "level5") {
			song = "gbjam5-3";
		}
		else if (this.nextLevel == "level6") {
			song = "gbjam5-finalboss";
		}
		if (song != "") {
			me.audio.stopTrack();
			me.audio.playTrack(song, 0.8);
		}
	},

	loadNextLevel: function() {
		me.levelDirector.loadLevel(this.nextLevel, {
			onLoaded: this.levelLoaded.bind(this),
		});
	},

	onDestroyEvent: function() {
		me.audio.stopTrack();
	},

	onModeChange: function(oldMode, newMode) {
	},
});
