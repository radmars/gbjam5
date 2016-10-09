"use strict";

(function() {
	GBGJ.Path = me.Entity.extend({
		init: function(x, y, settings) {
			this._super(me.Entity, 'init', [x, y, {height: settings.height, width: settings.width}]);
			this.points = settings.points.map(function(e) {return new me.Vector2d(~~(x + e.x), ~~(y + e.y))});
			this.body.setCollisionMask(me.collision.types.NO_OBJECT);

			var enemy = me.pool.pull(settings.type, this.points[0].x, this.points[0].y, {path: this});
			me.game.world.addChild(enemy);
		},
	});
})();
