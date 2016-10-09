"use strict";

(function() {
	GBGJ.EnemyBasic = GBGJ.BaseEnemyEntity.extend({
		init: function(x, y, settings) {
			settings = settings || {};
			settings.image = 'enemy4';
			settings.shapes = [ new me.Rect( 0, 0, 16, 10) ];
			settings.speed = GBGJ.Constant.speed.fast;
			this._super(GBGJ.BaseEnemyEntity, 'init', [x, y, settings]);
		},
	});
})();
