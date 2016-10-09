"use strict";

GBGJ.FinalBoss = GBGJ.Boss.extend({
	init : function (x, y, settings) {
		settings = settings || {};
		settings.image = 'finalboss';
		settings.width = 96;
		settings.height = 142;
		this._super(GBGJ.Boss, 'init', [x, y, settings]);
	},
	onCollision: function() {
		return false;
	},
});
