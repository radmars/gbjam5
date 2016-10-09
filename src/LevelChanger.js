"use strict";

(function() {
	GBGJ.LevelChanger = me.Entity.extend({
		init: function(x, y, settings) {
			this._super(me.Entity, 'init', [x, y, settings]);
			this.body.collisionType = me.collision.types.COLLECTABLE_OBJECT;
			this.nextLevel = settings.nextLevel;
		},
		update: function(dt) {
			me.collision.check(this);
		},
		onCollision : function (response, other) {
			if(other.body.collisionType == me.collision.types.PLAYER_OBJECT){
				me.state.current().goToNextLevel.defer(me.state.current(), this.nextLevel);
			}
			return false;
		},
	});
})();
