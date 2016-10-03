"use strict";

GBGJ.PlayerEntity = me.Entity.extend({
	init : function (x, y, settings) {
		settings = settings || {};
		settings.image = "player";
		settings.width = 24;
		settings.height = 24;
		settings.frameheight = 24;
		settings.framewidth = 24;
		settings.shapes = [ new me.Rect(0, 0, 24, 24) ]

		this._super(me.Entity, 'init', [x, y, settings]);
		this.pos.z = 6;
		this.minSpeed = .1;
		this.scrollSpeed = .01;
		// floating point scroll distance.
		this.scrollX = 70;

		this.renderable.anchorPoint.y = .5
		me.game.viewport.setDeadzone(10,10);

		this.cameraTargetPos = new me.Vector2d(this.pos.x, this.pos.y);

		me.game.viewport.follow(this.cameraTargetPos, me.game.viewport.AXIS.BOTH);

		this.alwaysUpdate = true;
		this.maxSpeed = 1;
		this.body.collisionType = me.collision.types.PLAYER_OBJECT;
		this.body.setMaxVelocity(this.maxSpeed, this.maxSpeed);
		this.body.setFriction(0, 0);
		this.body.gravity = 0;

		this.shootSub = me.event.subscribe(me.event.KEYDOWN, this.tryToShoot.bind(this));
	},

	tryToShoot: function(action, keyCode, edge) {
		if(action == 'shoot') {
			var bullet = new GBGJ.Bullet(this.pos.x, this.pos.y, {
				dir: {
					x: 1,
					y: 0,
				}
			});
			me.game.world.addChild(bullet, bullet.pos.z);
		}
	},

	changeAnimation: function(dest, next) {
		if(!this.renderable.isCurrentAnimation(this.getAnimationName(dest))) {
			if(next) {
				next = next.bind(this);
			}
			this.renderable.setCurrentAnimation(this.getAnimationName(dest), next);
		}
	},

	onDeactivateEvent: function() {
		me.event.unsubscribe(this.shootSub);
		me.event.unsubscribe(this.dashSub);
	},

	// melon's default entity renderer seems to wiggle a lot at low resolution...
	draw : function (renderer) {
		// draw the renderable's anchorPoint at the entity's anchor point
		// the entity's anchor point is a scale from body position to body width/height
		var x = ~~( this.pos.x + this.body.pos.x + (this.anchorPoint.x * this.body.width));
		var y = ~~( this.pos.y + this.body.pos.y + (this.anchorPoint.y * this.body.height));

		renderer.translate(x, y);
		this.renderable.draw(renderer);
		renderer.translate(-x, -y);
	},

	update : function (dt) {
		this.body.update(dt);
		var offset = new me.Vector2d();
		me.game.viewport.localToWorld(0, 0, offset);
		if(me.input.isKeyPressed('right')) {
			this.body.vel.x += .1 * me.timer.tick;
		}
		if(me.input.isKeyPressed('left')) {
			this.body.vel.x -= .1 * me.timer.tick;
		}
		if(me.input.isKeyPressed('down')) {
			this.body.vel.y += .1 * me.timer.tick;
		}
		if(me.input.isKeyPressed('up')) {
			this.body.vel.y -= .1 * me.timer.tick;
		}

		// Keep on screen.
		if(this.pos.x < offset.x + 5) {
			this.body.vel.x = 0;
			this.pos.x = offset.x + 5;
		}

		var w = me.video.renderer.getWidth();
		if(this.pos.x > offset.x + w - 50) {
			this.pos.x = offset.x + w - 50;
		}

		// TODO: Force auto scroll here...
		this.scrollX += this.scrollSpeed * dt;
		this.cameraTargetPos.x = ~~(this.scrollX);
		this.cameraTargetPos.y = ~~(this.pos.y);
		me.collision.check(this);
		this._super(me.Entity, 'update', [dt]);
		return true;
	},

	onCollision : function (response, other) {
		return true;
	},
});
