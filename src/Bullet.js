"use strict";

GBGJ.Bullet = me.Entity.extend({
		init : function (x, y, settings) {
		settings = settings || {};

		settings.framewidth = settings.width;
		settings.frameheight = settings.height;

		this._super(me.Entity, 'init', [x, y, settings]);

		this.pos.z = 10;
		this.speed = settings.speed || 5;
		this.body.collisionType = me.collision.types.PROJECTILE_OBJECT;
		this.body.setVelocity(0, 0);
		this.body.setMaxVelocity(this.speed, this.speed);
		this.body.setFriction(0, 0);
		this.body.gravity = 0;
		this.setDirection(settings.dir);
		this.setMask(settings.hurts);
		this.damage = 1;

		this.bombSub = me.event.subscribe("drop da bomb", this.checkBomb.bind(this));

	},

	checkBomb: function() {
		if(me.game.viewport.isVisible(this)) {
			this.remove();
		}
	},

	onDeactivateEvent: function() {
		me.event.unsubscribe(this.bombSub);
	},

	setMask: function(add) {
		this.body.setCollisionMask( 0
			| me.collision.types.WORLD_SHAPE
			| me.collision.types.COLLECTABLE_OBJECT
			| me.collision.types.ACTION_OBJECT
			| add
		)
	},

	setDirection: function(dir) {
		this.body.vel.x = dir.x * this.speed;
		this.body.vel.y = dir.y * this.speed;
	//	this.renderable.angle = Math.atan2(dir.y, dir.x);
	},

	add: function() {
		me.game.world.addChild(this);
	},

	remove: function() {
		me.game.world.removeChild(this);
	},

	update : function (dt) {
		this.body.update(dt);
		if(!me.game.viewport.isVisible(this)) {
			this.remove();
		}
		me.collision.check(this);
		return (this._super(me.Entity, 'update', [dt]) || this.body.vel.x !== 0 || this.body.vel.y !== 0);
	},
	
	die : function (response, other) {
		var x = this.pos.x + (3).randomFloat(3);
		var y = this.pos.y + (1).randomFloat(2);
		me.game.world.addChild(
			new GBGJ.BulletExplode(
				~~(x),
				~~(y),
				{
					speed: 0,
					dir: { x: 0, y: 0, },
				}
			)
		);
		
		// Bullets never respond to collisions other than with destruction.
		this.body.setCollisionMask(me.collision.types.NO_OBJECT);
		this.remove();
	},
	
	onCollision : function (response, other) {
		if(other.body.collisionType == me.collision.types.PLAYER_OBJECT) {
			//other.damage();
		}
		
		this.die();

		return false;
	}
});
