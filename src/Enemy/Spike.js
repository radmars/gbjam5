"use strict";

(function() {
	GBGJ.EnemySpike = GBGJ.BaseEnemyEntity.extend({
		init: function(x, y, settings) {
			settings = settings || {};
			settings.image = 'enemy3';
			settings.shapes = [ new me.Rect( 0, 0, 16, 10) ];
			this._super(GBGJ.BaseEnemyEntity, 'init', [x, y, settings]);
		},
	});
})();
