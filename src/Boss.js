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

	damage: function(pos) {
		this.hp -= 1;
		if(this.hp <= 0) {
			this.changeAnimation("die")
			var bounds = this.body.shapes[0].getBounds();
			var center = this.pos.clone()
				.add(
					new me.Vector2d(
						this.anchorPoint.x * bounds.width,
						this.anchorPoint.y * bounds.height
					)
				);
			me.game.world.addChild( new GBGJ.BloodGenerator( center, bounds ) );
			me.game.viewport.shake(4, 5000, me.game.viewport.AXIS.BOTH, this.die.bind(this));
		}
		else {
			var numChunks = (1).random(4);
			for(var i = 0; i < numChunks; i++) {
				var angle = (0).randomFloat(Math.PI * 2);
				var ca = Math.cos(angle);
				var sa = Math.sin(angle);
				me.game.world.addChild(
					new GBGJ.BloodChunk(
						pos.x + ca * (1).random(4),
						pos.y - 13 + sa * (1).random(4),
						{
							speed: (0).randomFloat(2),
							dir: {
								x: ca,
								y: sa,
							},
						}
					)
				);
			}
			this.changeAnimation("hit", this.changeAnimation.bind(this, "idle"))
		}
	},

	onCollision : function (response, other) {
		if(other.body.collisionType == me.collision.types.PROJECTILE_OBJECT) {
			this.damage(other.pos);
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

// TODO Should be particle
GBGJ.BloodGenerator = me.Renderable.extend({
	init : function (basePos, spawnRect) {
		this._super(me.Renderable, 'init', [0, 0, 0, 0]);
		this.alwaysUpdate = true;
		this.spawnRect = spawnRect;
		this.pos.set(basePos.x, basePos.y, 0);
	},

	update : function (dt) {
		var numChunks = (0).random(2);
		for(var i = 0; i < numChunks; i++) {
			var angle = (0).randomFloat(Math.PI * 2);
			var ca = Math.cos(angle);
			var sa = Math.sin(angle);
			var x = this.pos.x + (this.spawnRect.right - this.spawnRect.left) / 2 * ca * (0).randomFloat(1);
			var y = this.pos.y + (this.spawnRect.bottom - this.spawnRect.top) / 2 * sa * (0).randomFloat(1);
			me.game.world.addChild(
				new GBGJ.BloodChunk(
					~~(x),
					~~(y),
					{
						speed: (0).randomFloat(1),
						dir: {
							x: ca,
							y: sa,
						},
					}
				)
			);
		}
		return false;
	},
});
