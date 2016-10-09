"use strict";

GBGJ.SkullBoss = GBGJ.Boss.extend({
	init : function (x, y, settings) {
		settings = settings || {};
		settings.image = 'skullboss';
		settings.width = 50;
		settings.height = 67;
		this._super(GBGJ.Boss, 'init', [x, y, settings]);
	},
});
