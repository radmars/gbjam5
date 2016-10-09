"use strict";

(function() {
	GBGJ.EnemyShooter = GBGJ.BaseEnemyEntity.extend({
		init: function(x, y, settings) {
			settings = settings || {};
			settings.image = 'enemy1';
			settings.shapes = [ new me.Rect( 0, 0, 24, 18) ];
			settings.speed = GBGJ.Constant.speed.medium;

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

			this._super(GBGJ.BaseEnemyEntity, 'init', [x, y, settings]);
		},

		update: function(dt) {
			this.cooldown_remaining.shoot -= dt;
			if (this.cooldown_remaining.shoot <= 0) {
				this.shoot({
					angle: this.angleToPlayer(),
				});
				this.cooldown_remaining.shoot = this.cooldown.shoot;
			}

			return (this._super(GBGJ.BaseEnemyEntity, 'update', [dt]));
		},
	});
})();
