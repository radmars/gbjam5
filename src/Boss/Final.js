"use strict";

GBGJ.FinalBoss = GBGJ.Boss.extend({
	init : function (x, y, settings) {
		settings = settings || {};
		settings.image = 'finalboss';
		settings.width = 128;
		settings.height = 160;
		this._super(GBGJ.Boss, 'init', [x, y, settings]);
		this.renderable.addAnimation("idle", [0, 1, 2, 3]);
		this.renderable.addAnimation("hit", [0, 4, 0, 4]);
		this.renderable.addAnimation("die", [0, 4]);
		this.changeAnimation("idle");
	},
});
