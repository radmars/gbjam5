"use strict";

GBGJ.Bomb = me.Entity.extend({
	init: function(x, y, settings) {
		settings.image = 'powerup_bomb_16';
		settings.width = 16;
		settings.height = 16;
		this._super(me.Entity, 'init', [x, y, settings]);
		this.body.collisionType = me.collision.types.COLLECTABLE_OBJECT;
		this.body.setCollisionMask(me.collision.types.PLAYER_OBJECT);
		this.renderable.addAnimation("idle", [0, 1, 2] );
		this.renderable.setCurrentAnimation("idle");
		this.stillActive = true;
	},
	update: function(dt) {
		me.collision.check(this);
		this._super(me.Entity, 'update', [dt]);
		return true;
	},
	onCollision : function (response, other) {
		if(this.stillActive && other.body.collisionType == me.collision.types.PLAYER_OBJECT){
			this.stillActive = false;
			other.addBomb();
			me.audio.play("powerup");
			me.game.world.removeChild(this);
		}
		return false;
	},
});

GBGJ.Shotgun = me.Entity.extend({
	init: function(x, y, settings) {
		settings.image = 'powerup_triple_16';
		settings.width = 16;
		settings.height = 16;
		settings.framewidth = 16;
		settings.frameheight = 16;
		this._super(me.Entity, 'init', [x, y, settings]);
		this.body.collisionType = me.collision.types.COLLECTABLE_OBJECT;
		this.body.setCollisionMask(me.collision.types.PLAYER_OBJECT);
		this.renderable.addAnimation("idle", [0, 1, 2] );
		this.renderable.setCurrentAnimation("idle");
		this.stillActive = true;
	},
	update: function(dt) {
		me.collision.check(this);
		this._super(me.Entity, 'update', [dt]);
		return true;
	},
	onCollision : function (response, other) {
		if(this.stillActive && other.body.collisionType == me.collision.types.PLAYER_OBJECT){
			this.stillActive = false;
			other.addShotgun();
			me.game.world.removeChild(this);
		}
		return false;
	},
});
