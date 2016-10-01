"use strict";

var GBGJ = {};

GBGJ.black = new me.Color().parseCSS("#1f1f1f");
GBGJ.dark  = new me.Color().parseCSS("#4d533c");
GBGJ.light = new me.Color().parseCSS("#8b956d");
GBGJ.white = new me.Color().parseCSS("#c4cfa1");

GBGJ.colors = [GBGJ.black, GBGJ.dark, GBGJ.light, GBGJ.white];

GBGJ.data = {
	options: {},
};

/* Get the bare essentials ready (so we can have a loading screen!) */
GBGJ.preload = function() {
	// Initialize the video.
	if (!me.video.init(160, 144, {
		wrapper: null,
		scale: 'auto',
		scaleMethod: 'fit',
	})) {
		alert("Your browser doesn't like MelonJS :(");
		return;
	}
	me.audio.init("m4a,ogg");

	me.loader.load(GBGJ.Image("8x8_font"), GBGJ.onload.bind(GBGJ));
};

GBGJ.onload = function() {
	GBGJ.font = new me.BitmapFont("8x8_font", 8);

	// Load URL parameters
	window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
		GBGJ.data.options[key] = value;
	});

	// add "?debug=1" to the URL to enable the debug Panel
	if(GBGJ.data.options.debug) {
		window.onReady(function() {
			me.plugin.register.defer(GBGJ, me.debug.Panel, "debug", me.input.KEY.V);
		});
	}

	if(GBGJ.data.options.mute) {
		me.audio.muteAll();
	}

	me.state.set(me.state.LOADING, new GBGJ.LoadingScreen());
	me.state.set(me.state.INTRO, new GBGJ.RadmarsScreen());

	me.loader.onload = GBGJ.loaded.bind(GBGJ);
	me.loader.preload( GBGJ.GameResources );
};

GBGJ.loaded = function() {
	console.log("Loaded all assets");
	me.state.change(me.state.INTRO);
}
