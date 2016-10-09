"use strict";

GBGJ.SkullBoss = GBGJ.Boss.extend({
	init : function (x, y, settings) {
		settings = settings || {};
		settings.image = 'skullboss';
		settings.width = 70;
		settings.height = 70;
		settings.shapes = [new me.Rect(10, 5, 40, 47)];
		this._super(GBGJ.Boss, 'init', [x, y, settings]);
		this.anchorPoint.set(.5, .60);
		this.renderable.addAnimation("idle", [0, 1, 2, 3]);
		this.renderable.addAnimation("hit", [0, 4, 0, 4]);
		this.renderable.addAnimation("die", [0, 4]);
		this.changeAnimation("idle");
	},
});
