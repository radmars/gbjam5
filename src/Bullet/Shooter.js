"use strict";

GBGJ.BulletShooter = GBGJ.Bullet.extend({
		init : function (x, y, settings) {
		settings = settings || {};

		settings.image = "bullet_baddie_circle";
		settings.width = 16;
		settings.height = 16;
		settings.hurts = me.collision.types.PLAYER_OBJECT;
		settings.shapes = [ new me.Rect(0, 0, 8, 8)];

		this._super(GBGJ.Bullet, 'init', [x, y, settings]);
	}
});
