"use strict";

GBGJ.Boss = me.Entity.extend({
	init : function (x, y, settings) {
		settings = settings || {};
		this._super(me.Entity, 'init', [x, y, settings]);

		this.body.setMaxVelocity(1, 1);
		this.body.gravity = 0;
		this.hp = settings.hp || 4;
		this.nextLevel = settings.nextLevel;

		this.pos.z = 5;
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
		me.state.current().goToNextLevel(this.nextLevel);
	},

	damage: function() {
		this.hp -= 1;
		if(this.hp <= 0) {
			me.game.world.removeChild(this);
			me.timer.setTimeout(this.die.bind(this), 1000);
		}
	},

	onCollision : function (response, other) {
		if(other.body.collisionType == me.collision.types.PROJECTILE_OBJECT) {
			this.damage();
			return false;
		}
		if(other.body.collisionType == me.collision.types.ENEMY_OBJECT){
			return false;
		}
		if(other.body.collisionType == me.collision.types.PLAYER_OBJECT){
			return false;
		}
		return false;
	}
});
