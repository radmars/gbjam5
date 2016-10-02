"use strict";
(function() {
	var pathCache = {};

	GBGJ.PathEntity = me.Entity.extend({
		init: function(x, y, settings) {
			this._super(me.Entity, 'init', [x, y, {height: settings.height, width: settings.width}]);
			this.points = settings.points.map((e) => {return new me.Vector2d(~~(x + e.x), ~~(y + e.y))});
			this.id = settings.id;
			pathCache[this.id] = this;
		},
		onDeactivateEvent: function() {
			console.log("Deleting path")
			delete pathCache[this.id];
		},
	});

	GBGJ.EnemyEntity = me.Entity.extend({
		init : function (x, y, settings) {
			settings = settings || {};
			settings.image = 'enemy';
			settings.width = 16;
			settings.height = 16;
			this._super(me.Entity, 'init', [x, y, settings]);

			this.body.setMaxVelocity(1, 1);
			this.body.gravity = 0;
			if(!settings.path) {
				throw "Can't find a path property!";
			}
			this.pathID = settings.path;

			this.path = pathCache[settings.path];
			this.pos.z = 5;
			this.currentPoint = 0;
		},

		getPath: function() {
			return pathCache[this.pathID];
		},

		update : function (dt) {
			var points = this.getPath().points;
			var point = points[this.currentPoint];
			if(point) {
				var dir = point.clone().sub(this.pos);
				if(dir.length() < 2) {
					this.currentPoint++;
				}
				point = points[this.currentPoint];
				if(point) {
					dir = point.clone().sub(this.pos).normalize();
				}
				else {
					dir.x = 0;
					dir.y = 0;
				}

				this.body.vel.x = dir.x * me.timer.tick;
				this.body.vel.y = dir.y * me.timer.tick;

				this.body.update(dt);
			}

			me.collision.check(this);

			return (this._super(me.Entity, 'update', [dt]) || this.body.vel.x !== 0 || this.body.vel.y !== 0);
		},

		changeAnimation: function(dest, next) {
			if(!this.renderable.isCurrentAnimation(dest)) {
				if(next) {
					next = next.bind(this);
				}
				this.renderable.setCurrentAnimation(dest, next);
			}
		},

		onCollision : function (response, other) {
			if(other.body.collisionType == me.collision.types.ENEMY_OBJECT){
				return false;
			}
			if(other.body.collisionType == me.collision.types.PLAYER_OBJECT){
				return false;
			}
			return true;
		}
	});
})();
