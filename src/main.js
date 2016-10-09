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

	// Load URL parameters
	window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
		GBGJ.data.options[key] = value;
	});

	// Initialize the video.
	if (!me.video.init(160, 144, {
		wrapper: null,
		scale: GBGJ.data.options.scale || 'auto',
		scaleMethod: 'fit',
	})) {
		alert("Your browser doesn't like MelonJS :(");
		return;
	}
	me.audio.init("mp3,m4a,ogg");

	me.loader.load(GBGJ.Image("8x8_font"), GBGJ.onload.bind(GBGJ));
};

GBGJ.onload = function() {
	GBGJ.font = new me.BitmapFont("8x8_font", 8);


	// add "?debug=1" to the URL to enable the debug Panel
	if(GBGJ.data.options.debug) {
		var imported = document.createElement('script');
		imported.src = 'libs/debugPanel-3.1.0.js';
		imported.onreadystatechange = imported.onload = function() {
			me.plugin.register.defer(GBGJ, me.debug.Panel, "debug", me.input.KEY.V);
			me.debug.renderHitBox = true;
		};
		document.head.appendChild(imported);
	}

	if(GBGJ.data.options.mute) {
		me.audio.muteAll();
	}

	Object.keys(GBGJ.states).forEach(function(key) {
		var ctor = GBGJ[key + "Screen"];
		if(!ctor) {
			throw "Missing constructor for " + key + " screen";
		}
		me.state.set(
			GBGJ.states[key],
			// some sort of javascript magick
			new (Function.prototype.bind.call(ctor))()
		);
	});

	me.pool.register("Player", GBGJ.PlayerEntity);
	[
		"Boss",
		"Path",
		"LevelChanger",
		"HandBoss",
		"FinalBoss",
		"SkullBoss",
		"EnemyBasic",
		"EnemyBoomer",
		"EnemyShooter",
		"EnemySpike",
		"EnemyTank",
		"BulletPlayer",
		"BulletSpike",
	 ].forEach(function(type) {
		 me.pool.register(type, GBGJ[type], true);
	});

	me.loader.preload( GBGJ.GameResources, GBGJ.loaded.bind(GBGJ), false );
	me.state.change(GBGJ.states.Loading);
};

GBGJ.states = {
	Loading:  0 + me.state.USER,
	Intro:    1 + me.state.USER,
	Play:     2 + me.state.USER,
	Title:    3 + me.state.USER,
	Controls: 4 + me.state.USER,
};

GBGJ.loaded = function() {
	console.log("Loaded all assets");
	me.state.change(GBGJ.states.Intro);
}
