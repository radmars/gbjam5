"use strict";

GBGJ.ControlsScreen = me.ScreenObject.extend({
	init: function(startingLevel) {
		this._super(me.ScreenObject, 'init', []);
	},

	onResetEvent: function() {
		this.subscription = me.event.subscribe( me.event.KEYDOWN, this.keyHandler.bind(this));
		me.game.world.addChild(new GBGJ.ControlsRenderable());
	},

	keyHandler: function (action, keyCode, edge) {
		if( keyCode === me.input.KEY.ENTER ) {
			me.state.change(GBGJ.states.Title);
		}
	},
	onDestroyEvent: function() {
		me.event.unsubscribe(this.subscription);
	},
});


GBGJ.ControlsRenderable = me.Renderable.extend({
	init: function() {
		this._super( me.Renderable, "init", [0, 0, me.video.renderer.getWidth(), me.video.renderer.getHeight()] );
		this.counter = 0;
		this.floating = true;

		this.cx = this.width / 2;
		this.cy = this.height / 2;
		this.bg = new me.Sprite(0, 0, {
			image: "controls",
		});
		this.bg.pos.x = this.cx;
		this.bg.pos.y = this.cy;
		this.pressStart = new me.Sprite(0, 0, {
			image: "pressstart",
		});
		this.pressStart.pos.x = this.cx;
		this.pressStart.pos.y = this.height - this.pressStart.height - 15;
	},

	draw: function(renderer) {
		this.bg.draw(renderer);
		if(this.counter < 10) {
			this.pressStart.draw(renderer);
		}
		else if(this.counter > 20 ) {
			this.counter = 0;
		}
	},

	update: function( dt ) {
		this.counter++;
		return true;
	}
});
