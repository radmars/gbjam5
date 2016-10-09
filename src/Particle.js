GBGJ.Particle = me.Entity.extend({
	init : function (x, y, settings) {
		settings = settings || {};
		settings.framewidth = settings.width;
		settings.frameheight = settings.height;
		this._super(me.Entity, 'init', [x, y, settings]);

		this.pos.z = 10;
		this.speed = settings.speed;
		this.body.collisionType = me.collision.types.USER;
		this.body.setVelocity(0, 0);
		this.body.setMaxVelocity(this.speed, this.speed);
		this.body.setFriction(0, 0);
		this.body.gravity = 0;
		this.setDirection(settings.dir);
		this.body.setCollisionMask(me.collision.types.NO_OBJECT);
		this.frameCount = settings.frameCount;
		this.renderable.addAnimation("loop", this.range(this.frameCount));
		this.renderable.setCurrentAnimation("loop", this.end.bind(this));
	},

	range: function(count) {
		return Array.apply(0, Array(count)).map(function (element, index) { return index; });
	},

	end: function() {
		this.renderable.setAnimationFrame(this.frameCount - 1);
		me.game.world.removeChild(this);
	},

	setDirection: function(dir) {
		this.body.vel.x = dir.x * this.speed;
		this.body.vel.y = dir.y * this.speed;
		this.renderable.angle = Math.atan2(dir.y, dir.x);
	},

	update : function (dt) {
		this.body.update(dt);
		return (this._super(me.Entity, 'update', [dt]) || this.body.vel.x !== 0 || this.body.vel.y !== 0);
	},
});

GBGJ.BombDebris = GBGJ.Particle.extend({
	init : function (x, y, settings) {
		settings = settings || {};
		settings.image = "explode_16";
		settings.width = 16;
		settings.height = 16;
		settings.speed = 5;
		settings.frameCount = 4;
		this._super(GBGJ.Particle, 'init', [x, y, settings]);
	},
});

GBGJ.BloodChunk = GBGJ.Particle.extend({
	init : function (x, y, settings) {
		settings = settings || {};
		settings.image = "blood_32";
		settings.width = 32;
		settings.height = 32;
		settings.frameCount = 5;
		this._super(GBGJ.Particle, 'init', [x, y, settings]);
		this.body.setCollisionMask(me.collision.types.NO_OBJECT);
	},
});
