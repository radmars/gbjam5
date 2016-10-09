"use strict";

(function() {
	GBGJ.Path = me.Entity.extend({
		init: function(x, y, settings) {
			this._super(me.Entity, 'init', [x, y, {height: settings.height, width: settings.width}]);
			this.points = settings.points.map(function(e) {return new me.Vector2d(~~(x + e.x), ~~(y + e.y))});
			this.body.setCollisionMask(me.collision.types.NO_OBJECT);

			var enemy = me.pool.pull(settings.type, this.points[0].x, this.points[0].y, {path: this});
			me.state.current().addEnemy(enemy);
		},
	});

	GBGJ.BaseEnemyEntity = me.Entity.extend({
		init : function (x, y, settings) {
			settings = settings || {};
			settings.width = settings.width || 32;
			settings.height = settings.height || 32;
			settings.framewidth = settings.framewidth || 32;
			settings.frameheight =  settings.frameheight || 32;
			settings.speed =  settings.speed || 1;

			this._super(me.Entity, 'init', [x, y, settings]);
			this.pos.z = 5;

			this.body.setMaxVelocity(settings.speed, settings.speed);
			this.body.gravity = 0;

			if(!settings.path) {
				throw "Can't find a path property!";
			}
			this.path = settings.path;
			this.currentPoint = 0;

			this.renderable.addAnimation("idle", [0, 1, 2]);
			this.renderable.addAnimation("hit", [2]);
			this.changeAnimation("idle");
		},

		update : function (dt) {
			var points = this.path.points;
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

		shoot: function(args) {
			args = args || {};

			var type = args.type || this.bullet.type;
			var speed = args.speed || this.bullet.speed;
			var angle = args.angle || Math.PI;
			var x = args.x || this.pos.x;
			var y = args.y || this.pos.y;

			var bullet = me.pool.pull(type, x, y, {
				// Default to straight left
				dir : (new me.Vector2d(speed, 0)).rotate(angle),
			});
			bullet.add();
		},

		changeAnimation: function(dest, next) {
			if(!this.renderable.isCurrentAnimation(dest)) {
				if(next) {
					next = next.bind(this);
				}
				this.renderable.setCurrentAnimation(dest, next);
			}
		},

		die: function() {
			me.state.current().removeEnemy(this);
		},

		onCollision : function (response, other) {
			if(other.body.collisionType == me.collision.types.PROJECTILE_OBJECT) {
				this.die();
			}
			if(other.body.collisionType == me.collision.types.ENEMY_OBJECT){
				return false;
			}
			if(other.body.collisionType == me.collision.types.PLAYER_OBJECT){
				return false;
			}
			return true;
		},

		getPlayer: function () {
			return me.state.current().player;
		},

		angleToPlayer: function() {
			return this.angleTo(this.getPlayer());
		},
	});
})();
