"use strict";

(function() {
	GBGJ.EnemyBoomer = GBGJ.BaseEnemyEntity.extend({
		init: function(x, y, settings) {
			settings = settings || {};
			settings.image = 'enemy2';
			settings.shapes = [ new me.Rect( 0, 0, 16, 18) ];
			settings.speed = GBGJ.Constant.speed.slow;
			this._super(GBGJ.BaseEnemyEntity, 'init', [x, y, settings]);
		},
	});
})();
