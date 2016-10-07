"use strict";

GBGJ.LevelDisplay = me.Renderable.extend({
	init : function (settings) {
		this._super(me.Renderable, 'init', [0, 0, 10, 10]);
		this.level = settings.level;
		this.floating = true;
		this.time = 4500;
		this.pos.z = 20;
		this.width = GBGJ.font.measureText("OMG: " + this.level.toUpperCase()).width;
	},

	draw: function(renderer) {
		var screenWidth = renderer.getWidth();
		renderer.setColor(GBGJ.black);
		renderer.fillRect(0, 0, screenWidth, 9);
		GBGJ.font.draw(renderer, "OMG: " + this.level.toUpperCase(), screenWidth / 2 - this.width / 2, 0);
		renderer.setColor(GBGJ.white);
	},

	update : function (dt) {
		this.time -= dt;
		if(this.time <= 0) {
			me.game.world.removeChild(this);
		}
		return true;
	},
});
