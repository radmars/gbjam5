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
			channels: 2,
		};
	}

	function _AddAudioArray( name, num, parent ) {
		for(var i = 1; i <= num; i++) {
			parent.push(_Audio(name + "-" + i));
		}
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
		_Audio("radboy"),

		// control screen
		GBGJ.Image("controls"),
		GBGJ.Image("pressstart"),

		// title screen
		GBGJ.Image("title"),

		//GameOver
		GBGJ.Image("gameover"),
		GBGJ.Image("gamewin"),

		// entities
		GBGJ.Image("player"),
		GBGJ.Image("enemy1"),
		GBGJ.Image("enemy2"),
		GBGJ.Image("enemy3"),
		GBGJ.Image("enemy4"),
		GBGJ.Image("enemy5"),
		GBGJ.Image("bullet"),
		GBGJ.Image("bullet_baddie_small"),
		GBGJ.Image("bullet_baddie_circle"),
		GBGJ.Image("handboss"),
		GBGJ.Image("skullboss"),
		GBGJ.Image("finalboss"),
		GBGJ.Image("explode_16"),
		GBGJ.Image("explode_32"),
		GBGJ.Image("blood_32"),
		GBGJ.Image("powerup_bomb_16"),
		GBGJ.Image("powerup_triple_16"),
		GBGJ.Image("powerup_rocket_16"),
		GBGJ.Image("bullet_player_big_16"),

		// levels
		GBGJ.Image("bio_bg"),
		GBGJ.Image("bg_stars"),
		GBGJ.Image("bg_tech"),
		GBGJ.Image("tilemap"),
		_Level("level1"),
		_Level("level2"),
		_Level("level3"),
		_Level("level4"),
		_Level("level5"),
		_Level("test"),

		_Audio("gbjam5-1"),
		_Audio("gbjam5-2"),
		_Audio("gbjam5-3"),
		_Audio("gbjam5-finalboss"),
		_Audio("gbjam5-gameover"),
		_Audio("gbjam5-title"),
		_Audio("gbjam5-win"),

		_Audio("bomb"),
		_Audio("boss1death"),
		_Audio("boss2death"),
		_Audio("enemy1death"),
		_Audio("enemy2death"),
		_Audio("enemy3death"),
		_Audio("enemyshoot"),
		_Audio("explosion"),
		_Audio("explosion2"),
		_Audio("finalbossdeath"),
		_Audio("hit"),
		_Audio("missile"),
		_Audio("playerdeath"),
		_Audio("playershoot"),
		_Audio("powerup"),
	];

	return GameResources;
})();
