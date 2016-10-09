"use strict";

(function() {
	GBGJ.EnemyShooter = GBGJ.Enemy.extend({
		init: function(x, y, settings) {
			settings = settings || {};
			settings.image = 'enemy1';
			settings.shapes = [ new me.Rect( 0, 0, 24, 18) ];
			settings.speed = GBGJ.Constant.speed.medium;
			settings.hp = 3;

			this.bullet = {
				type: 'BulletShooter',
				speed: GBGJ.Constant.speed.slow,
			};
			this.cooldown = {
				shoot: GBGJ.Constant.cooldown.long,
			};
			this.cooldown_remaining = {
				shoot: 0,
			};

			this._super(GBGJ.Enemy, 'init', [x, y, settings]);
		},

		update: function(dt) {
			this.cooldown_remaining.shoot -= dt;
			if (this.cooldown_remaining.shoot <= 0) {
				this.shoot({
					angle: this.angleToPlayer(),
				});
				this.cooldown_remaining.shoot = this.cooldown.shoot;
			}

			return (this._super(GBGJ.Enemy, 'update', [dt]));
		},
	});
})();
