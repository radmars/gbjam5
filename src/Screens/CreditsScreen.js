"use strict";

GBGJ.CreditsScreen = me.ScreenObject.extend({
	init: function(startingLevel) {
		this._super(me.ScreenObject, 'init', []);
	},

	onResetEvent: function() {
		this.subscription = me.event.subscribe( me.event.KEYDOWN, this.keyHandler.bind(this));
		me.game.world.addChild(new me.ColorLayer("background", GBGJ.black, 0), 0);
		me.game.world.addChild(new GBGJ.CreditsRenderable());
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


GBGJ.CreditsRenderable = me.Renderable.extend({
	init: function() {
		this._super( me.Renderable, "init", [0, 0, me.video.renderer.getWidth(), me.video.renderer.getHeight()] );
		this.counter = 0;
		this.floating = true;

		this.pressStart = new me.Sprite(0, 0, {
			image: "pressstart",
		});
		this.pressStart.pos.x = this.width / 2;
		this.pressStart.pos.y = this.height - this.pressStart.height - 15;
	},

	draw: function(renderer) {
		if(this.counter < 10) {
			this.pressStart.draw(renderer);
		}
		else if(this.counter > 20 ) {
			this.counter = 0;
		}
		GBGJ.font.draw(renderer, "PROGRAMMIN': ",   0,  0);
		GBGJ.font.draw(renderer, "EMARCOTTE ",     30, 10);
		GBGJ.font.draw(renderer, "HECKBRINGER",    30, 20);
		GBGJ.font.draw(renderer, "ROUSHEY",        30, 30);
		GBGJ.font.draw(renderer, "GFX + LEVELS:",   0, 50);
		GBGJ.font.draw(renderer, "ROUSHEY",        30, 60);
		GBGJ.font.draw(renderer, "BRENDON",        30, 70);
		GBGJ.font.draw(renderer, "SOUND + MUSIC:",  0, 90);
		GBGJ.font.draw(renderer, "ADHESION",       30, 100);
	},

	update: function( dt ) {
		this.counter++;
		return true;
	}
});
