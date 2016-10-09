"use strict";

GBGJ.BulletPlayer = GBGJ.Bullet.extend({
		init : function (x, y, settings) {
		settings = settings || {};

		settings.image = "bullet";
		settings.width = 15;
		settings.height = 8;
		settings.hurts = me.collision.types.ENEMY_OBJECT;

		this._super(GBGJ.Bullet, 'init', [x, y, settings]);
	}
});

GBGJ.BulletPlayerBig = GBGJ.Bullet.extend({
		init : function (x, y, settings) {
		settings = settings || {};

		settings.image = "bullet_player_big_16";
		settings.width = 16;
		settings.height = 16;
		settings.hurts = me.collision.types.ENEMY_OBJECT;

		this._super(GBGJ.Bullet, 'init', [x, y, settings]);
		this.damage = 2;
	}
});
