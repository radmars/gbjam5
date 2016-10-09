"use strict";

(function() {
	GBGJ.EnemyBoomer = GBGJ.Enemy.extend({
		init: function(x, y, settings) {
			settings = settings || {};
			settings.image = 'enemy2';
			settings.shapes = [ new me.Rect( 0, 0, 16, 18) ];
			settings.speed = GBGJ.Constant.speed.slow;
			settings.hp = 3;

			this._super(GBGJ.Enemy, 'init', [x, y, settings]);
		},
	});
})();
