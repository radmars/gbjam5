"use strict";

(function() {
	GBGJ.EnemyBoomer = GBGJ.Enemy.extend({
		init: function(x, y, settings) {
			settings = settings || {};
			settings.image = 'enemy2';
			settings.shapes = [ new me.Rect( 0, 0, 16, 18) ];
			settings.speed = GBGJ.Constant.speed.slow;
			settings.hp = 3;

			this.bullet = {
				type: 'BulletShooter',
				speed: GBGJ.Constant.speed.slow,
			};
			this.bulletCount = 10;

			this._super(GBGJ.Enemy, 'init', [x, y, settings]);
		},

		chooseDirection: function() {
			// Always move in the direction of the player.
			return new me.Vector2d(this.speed, 0).rotate(this.angleToPlayer());
		},

		die: function() {
			for (var i = 0; i < this.bulletCount; i++) {
				var angle = i * (Math.PI * 2) / this.bulletCount;

				this.shoot({
					angle: angle,
				});
			}
			this._super(GBGJ.Enemy, 'die', []);
		},

		getDeathSound: function() {
			return "enemy2death";
		}
	});
})();
