"use strict";

(function() {
	GBGJ.EnemyTank = GBGJ.BaseEnemyEntity.extend({
		init: function(x, y, settings) {
			settings = settings || {};
			settings.image = 'enemy5';
			settings.shapes = [ new me.Rect( 0, 0, 24, 24) ];
			settings.speed = 0.2;
			this._super(GBGJ.BaseEnemyEntity, 'init', [x, y, settings]);
		},
	});
})();
