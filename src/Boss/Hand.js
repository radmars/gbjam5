"use strict";

GBGJ.HandBoss = GBGJ.Boss.extend({
	init : function (x, y, settings) {
		settings = settings || {};
		settings.image = 'handboss';
		settings.width = 48;
		settings.height = 75;
		settings.shapes = [ new me.Rect(0, 0, 25, 55)];
		this._super(GBGJ.Boss, 'init', [x, y, settings]);
		this.renderable.addAnimation("idle", [0, 1, 2, 3]);
		this.renderable.addAnimation("hit", [0, 4, 0, 4]);
		this.renderable.addAnimation("die", [0, 4]);
		this.changeAnimation("idle");
	},
});
