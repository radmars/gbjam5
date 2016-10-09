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
		var screenHeight = renderer.getHeight();
		renderer.setColor(GBGJ.black);
		renderer.fillRect(0, screenHeight / 2 - 6, screenWidth, 10);
		
		var text = "UNKNOWN AREA"; 
		switch( this.level){
			case "level1":
				text = "SPACEMARS ORBIT"; 
				break;
			case "level2":
				text = "FACILITY ENTRANCE"; 
				break;
			case "level3":
				text = "FACILITY"; 
				break;
			case "level4":
				text = "CORRUPTED CORE"; 
				break;	
			case "level5":
				text = "LAIR OF THE TAINTED GOD"; 
				break;	
		}
		
		GBGJ.font.draw(renderer, text, screenWidth / 2 - this.width / 2-30, screenHeight / 2 - this.height / 2);
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
