"use strict";

GBGJ.SkullBoss = GBGJ.Boss.extend({
	init : function (x, y, settings) {
		settings = settings || {};
		settings.image = 'skullboss';
		settings.width = 70;
		settings.height = 70;
		settings.shapes = [new me.Rect(10, 5, 40, 47)];
		this._super(GBGJ.Boss, 'init', [x, y, settings]);
		this.anchorPoint.set(.5, .60);
		this.renderable.addAnimation("idle", [0, 1, 2, 3]);
		this.renderable.addAnimation("hit", [0, 4, 0, 4]);
		this.renderable.addAnimation("die", [0, 4]);
		this.changeAnimation("idle");
		this.bulletTimer = 0;
		this.rotator = 0;
	},

	bossUpdate: function(dt) {
		if(this.bulletTimer > 400) {
			var angle = this.rotator++ / 10 * Math.PI / 2;
			if(this.rotator > 4) {
				this.rotator = 0;
			}
			me.game.world.addChild(
				new GBGJ.BulletShooter(this.pos.x + 25, this.pos.y+6, {
					speed: 1,
					dir: (new me.Vector2d(-1, 1)).rotate(angle).normalize(),
				})
			);
			me.game.world.addChild(
				new GBGJ.BulletShooter(this.pos.x + 25, this.pos.y+6, {
					speed: 1,
					dir: (new me.Vector2d(-1, -1)).rotate(angle).normalize(),
				})
			);
			this.bulletTimer = 0;
		}

		this.bulletTimer += dt;
	}
});
