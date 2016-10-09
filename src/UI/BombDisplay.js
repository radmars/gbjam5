"use strict";

GBGJ.BombDisplay = me.Renderable.extend({
	init : function (settings) {
		var size = GBGJ.font.measureText("BOMBS: 1");
		this._super(
			me.Renderable,
			'init',
			[
				0, me.video.renderer.getHeight() - size.height + 1,
				size.width - 10, size.height - 1
			]
		);
		this.floating = true;
		this.pos.z = 20;
		this.bombGet = me.event.subscribe('somebody set us up the bomb', this.updateBombs.bind(this));
	},

	updateBombs: function(player) {
		var b = this.bombs;
		this.bombs = player.bombs;
		this.dirty = this.bombs != b;
	},

	onDeactivateEvent: function() {
		me.event.subscribe(this.bombGet);
	},

	draw: function(renderer) {
		this.dirty = false;
		var screenWidth = renderer.getWidth();
		var screenHeight = renderer.getHeight();
		renderer.save();
		renderer.setColor(GBGJ.black);
		renderer.fillRect(this.pos.x, this.pos.y, this.width, this.height);
		GBGJ.font.draw(renderer, "BOMBS: " + this.bombs, this.pos.x - 1, this.pos.y);
		renderer.restore();
	},

	update : function (dt) {
		return this.dirty;
	},
});
