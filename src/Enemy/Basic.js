"use strict";

(function() {
	GBGJ.EnemyBasic = GBGJ.Enemy.extend({
		init: function(x, y, settings) {
			settings = settings || {};
			settings.image = 'enemy4';
			settings.shapes = [ new me.Rect( 0, 0, 16, 10) ];
			settings.speed = GBGJ.Constant.speed.fast;
			settings.hp = 1;

			this._super(GBGJ.Enemy, 'init', [x, y, settings]);
		},
	});
})();
