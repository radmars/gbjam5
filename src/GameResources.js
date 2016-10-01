"use strict";
/**
 * @param {String} name file name relative to data/ without extension.
 */
GBGJ.Image = function( name ) {
	return {
		name: name,
		type: "image",
		src: "data/image/" + name + ".png"
	};
}

GBGJ.GameResources = (function() {

	/**
	 * @param {String} name file name relative to data/audio.
	 */
	function _Audio( name ) {
		return {
			name: name,
			type: "audio",
			src: "data/audio/",
			channels: 2 };
	}

	function _AddAudioArray( name, num, parent ) {
		for(var i = 1; i <= num; i++) {
			parent.push(_Audio(name + "-" + i));
		}
	}

	function _GetRandomIndexString(max) {
		var index = Math.floor(Math.random() * max) + 1;
		return "-" + index;
	}

	/**
	 * @param {String} name file name relative to data/ without extension.
	 */
	function _Level( name ) {
		return {
			name: name,
			type: "tmx",
			src: "data/level/" + name + ".tmx"
		};
	}

	var GameResources = [
		/* Radmars Logo */
		GBGJ.Image("intro_bg"),
		GBGJ.Image("intro_glasses1"),
		GBGJ.Image("intro_glasses2"),
		GBGJ.Image("intro_glasses3"),
		GBGJ.Image("intro_glasses4"),
		GBGJ.Image("intro_mars"),
		GBGJ.Image("intro_radmars1"),
		GBGJ.Image("intro_radmars2"),
	];

	return GameResources;
})();
