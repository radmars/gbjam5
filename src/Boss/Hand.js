"use strict";

GBGJ.HandBoss = GBGJ.Boss.extend({
	init : function (x, y, settings) {
		settings = settings || {};
		settings.image = 'handboss';
		settings.width = 35;
		settings.height = 63;
		this._super(GBGJ.Boss, 'init', [x, y, settings]);
	},
});
