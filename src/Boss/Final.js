"use strict";

GBGJ.FinalBoss = GBGJ.Boss.extend({
	init : function (x, y, settings) {
		settings = settings || {};
		settings.image = 'finalboss';
		settings.width = 128;
		settings.height = 160;
		settings.shapes = [
			new me.Rect(0, 0, 34, 60),
			new me.Rect(30, 30, 34, 60),
		];
		this._super(GBGJ.Boss, 'init', [x, y, settings]);
		this.anchorPoint.set(.25, .5);
		this.renderable.addAnimation("idle", [0, 1, 2, 3]);
		this.renderable.addAnimation("hit", [0, 4, 0, 4]);
		this.renderable.addAnimation("die", [0, 4]);
		this.changeAnimation("idle");
		this.rotator = 0;
		this.eyePos = this.pos.clone().add(new me.Vector2d(4, 10));
		this.gutPos = this.pos.clone().add(new me.Vector2d(26, 80));
		this.shots = 0;
		this.shootDelay = 0;
		this.shotTimer = 0;
		this.states = [
			{
				eye: 1,
				shots: 5,
				gut: 0,
			},
			{
				eye: 1,
				shots: 10,
				gut: 1,
			},
			{
				gut: 1,
				shots: 5,
				eye: 0,
			},
		];
		this.rotateState();
	},

	rotateState: function() {
		this.currentState = this.states.pop();
		this.states.unshift(this.currentState);
	},

	shoot: function(pos, dir) {
		me.game.world.addChild(
			new GBGJ.BulletShooter(pos.x, pos.y, { speed: 1, dir: dir })
		);
	},

	shootFromEye: function() {
		var angle = this.shots / this.currentState.shots * Math.PI / 2;
		var dir = new me.Vector2d(-1, 0);
		dir.rotate(angle);

		this.shoot(this.eyePos, dir);
	},

	shootFromGut: function() {
		var angle = this.shots / this.currentState.shots * Math.PI / 2;
		var dir = new me.Vector2d(-1, 0);
		dir.rotate(angle);
		this.shoot(this.gutPos, dir);
	},

	die: function() {
		me.state.change(GBGJ.states.Win);
	},

	bossUpdate: function(dt) {
		// Start pumping shots out in a burst.
		if(this.shootDelay <= 0 && this.shots <= this.currentState.shots ) {
			this.shotTimer += dt;
			if(this.shotTimer >= 150) {
				if(this.currentState.eye) {
					this.shootFromEye();
				}
				if(this.currentState.gut) {
					this.shootFromGut();
				}
				this.rotator++;
				this.shots ++;
				this.shotTimer = 0;
				if(this.shots >= this.currentState.shots) {
					this.shootDelay = 1500;
					this.shots = 0;
					this.rotateState();
				}
			}
		}
		else {
			this.shootDelay -= dt;
		}
	},
});
