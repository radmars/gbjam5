"use strict";

(function() {
	GBGJ.EnemySpike = GBGJ.Enemy.extend({
		init: function(x, y, settings) {
			settings = settings || {};
			settings.image = 'enemy3';
			settings.shapes = [ new me.Rect( 0, 0, 16, 10) ];
			settings.speed = GBGJ.Constant.speed.slow;
			settings.hp = 2;
	
			this.bullet = {
				type: 'BulletSpike',
				speed: GBGJ.Constant.speed.slow,
			};
			this.cooldown = {
				shoot: GBGJ.Constant.cooldown.medium,
			};
			this.cooldown_remaining = {
				shoot: [
					// Separate cooldowns for two separate shots.
					GBGJ.Constant.offset.medium,
					GBGJ.Constant.offset.medium + GBGJ.Constant.offset.short,
				],
			};
			
			this._super(GBGJ.Enemy, 'init', [x, y, settings]);
		},

		update: function(dt) {
			for (var i = 0; i < this.cooldown_remaining.shoot.length; i++) {
				this.cooldown_remaining.shoot[i] -= dt;
				if (this.cooldown_remaining.shoot[i] <= 0) {
					this.shoot();
					this.cooldown_remaining.shoot[i] = this.cooldown.shoot;
				}
			}

			return (this._super(GBGJ.Enemy, 'update', [dt]));
		},

		getDeathSound: function() {
			return "enemy2death";
		}
	});
})();
