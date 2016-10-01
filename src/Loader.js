"use strict"

GBGJ.ProgressBar = me.Renderable.extend({
	init: function (x, y, w, h) {
		this._super(me.Renderable, "init", [x, y, w, h]);
		this.invalidate = false;
		this.barHeight = 4;
		this.progress = 0;
	},
	onProgressUpdate : function (progress) {
		this.progress = ~~(progress * this.width);
		this.invalidate = true;
	},
	update : function () {
		if (this.invalidate === true) {
			this.invalidate = false;
			return true;
		}
		return false;
	},

	draw : function (renderer) {
		GBGJ.font.draw(renderer, "LOADING...", 0, 0);
		renderer.setColor(GBGJ.black);
		renderer.fillRect(
			0,
			(this.height / 2) - (this.barHeight / 2),
			this.width,
			this.barHeight
		);

		renderer.setColor(GBGJ.light);
		renderer.fillRect(
			0,
			(this.height / 2) - (this.barHeight / 2),
			this.progress,
			this.barHeight
		);

		renderer.setColor(GBGJ.white);
	}
});

GBGJ.LoadingScreen = me.ScreenObject.extend({
	onResetEvent : function () {
		me.game.world.addChild( new me.ColorLayer("background", GBGJ.dark, 0), 0 );

		var w = me.video.renderer.getWidth();
		var h = me.video.renderer.getHeight();

		var progressBar = new GBGJ.ProgressBar( 0, 0, w, h );

		this.loaderHdlr = me.event.subscribe(
			me.event.LOADER_PROGRESS,
			progressBar.onProgressUpdate.bind(progressBar)
		);

		this.resizeHdlr = me.event.subscribe(
			me.event.VIEWPORT_ONRESIZE,
			progressBar.resize.bind(progressBar)
		);

		me.game.world.addChild(progressBar, 1);
	},

	// destroy object at end of loading
	onDestroyEvent : function () {
		// cancel the callback
		me.event.unsubscribe(this.loaderHdlr);
		me.event.unsubscribe(this.resizeHdlr);
		this.loaderHdlr = this.resizeHdlr = null;
	}
});
