"use strict";

(function() {
	GBGJ.LevelChanger = me.Entity.extend({
		init: function(x, y, settings) {
			this._super(me.Entity, 'init', [x, y, settings]);
			this.nextLevel = settings.nextLevel;
		},
		update: function(dt) {
			me.collision.check(this);
		},
		onCollision : function (response, other) {
			if(other.body.collisionType == me.collision.types.PLAYER_OBJECT){
				me.state.current().setNextLevel(this.nextLevel);
				me.state.current().loadNextLevel();
			}
			return false;
		},
	});
})();
