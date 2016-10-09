"use strict";

(function() {
	GBGJ.EnemySpike = GBGJ.BaseEnemyEntity.extend({
		init: function(x, y, settings) {
			settings = settings || {};
			settings.image = 'enemy3';
			settings.shapes = [ new me.Rect( 0, 0, 16, 10) ];
			settings.speed = GBGJ.Constant.speed.slow;
	
			this.bullet = {
				type: 'BulletSpike',
				speed: GBGJ.Constant.speed.slow,
			};
			this.cooldown = {
				shoot: GBGJ.Constant.cooldown.long,
			};
			this.cooldown_remaining = {
				shoot: 0,
			};
			
			this.shots =2;
			
			this._super(GBGJ.BaseEnemyEntity, 'init', [x, y, settings]);
		},

		update: function(dt) {
			this.cooldown_remaining.shoot -= dt;
			if (this.cooldown_remaining.shoot <= 0 && this.shots> 0) {
				this.shots--;
				this.shoot();
				this.cooldown_remaining.shoot = this.cooldown.shoot;
			}

			return (this._super(GBGJ.BaseEnemyEntity, 'update', [dt]));
		},
	});
})();
