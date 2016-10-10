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
				shoot: GBGJ.Constant.offset.medium,
			};

			this._super(GBGJ.Enemy, 'init', [x, y, settings]);
		},

		update: function(dt) {
			this.cooldown_remaining.shoot -= dt;
			if (this.cooldown_remaining.shoot <= 0) {
				var bulletCount = 3;
				var bulletSpread = Math.PI / 3;
				var angle = Math.PI - (bulletSpread / 2);

				for (var i = 0; i < bulletCount; i++) {
					this.shoot({
						angle: angle,
					});
					angle += bulletSpread / (bulletCount - 1);
				}

				this.cooldown_remaining.shoot = this.cooldown.shoot;
			}

			return (this._super(GBGJ.Enemy, 'update', [dt]));
		},

		getDeathSound: function() {
			return "enemy3death";
		}
	});
})();
