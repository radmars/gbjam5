"use strict";

(function() {
	GBGJ.EnemyTank = GBGJ.Enemy.extend({
		init: function(x, y, settings) {
			settings = settings || {};
			settings.image = 'enemy5';
			settings.shapes = [ new me.Rect( 0, 0, 24, 24) ];
			settings.speed = GBGJ.Constant.speed.slow;
			this._super(GBGJ.Enemy, 'init', [x, y, settings]);
		},
	});
})();
