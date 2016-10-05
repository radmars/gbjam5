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
		this.moveSpeed = .1;
		this.scrollSpeed = .01;

		// floating point scroll distance.
		this.scrollX = 70;
		this.screenOffset = new me.Vector2d(this.pox, this.pos.y);

		this.renderable.anchorPoint.y = .5

		this.cameraTargetPos = new me.Vector2d(this.pos.x, this.pos.y);

		me.game.viewport.follow(this.cameraTargetPos, me.game.viewport.AXIS.BOTH);
		me.game.viewport.setDeadzone(10,10);
		this.alwaysUpdate = true;
		this.body.collisionType = me.collision.types.PLAYER_OBJECT;
		this.body.setMaxVelocity(0, 0);
		this.body.setFriction(0, 0);
		this.body.gravity = 0;

		this.shootSub = me.event.subscribe(me.event.KEYDOWN, this.tryToShoot.bind(this));
		this.shootTimer = 0;
	},

	tryToShoot: function(action, keyCode, edge) {
		if(action == 'shoot' && this.shootTimer <= 0) {
			this.shootTimer = 400;
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
		this.shootTimer = Math.max(0, this.shootTimer - dt);

		if(me.input.isKeyPressed('right')) {
			this.screenOffset.x += this.moveSpeed * dt;
		}
		if(me.input.isKeyPressed('left')) {
			this.screenOffset.x -= this.moveSpeed * dt;
		}
		if(me.input.isKeyPressed('down')) {
			this.screenOffset.y += this.moveSpeed * dt;
		}
		if(me.input.isKeyPressed('up')) {
			this.screenOffset.y -= this.moveSpeed * dt;
		}

		// TODO: Force auto scroll here...
		//if(me.game.viewport.pos.x <= me.game.viewport.bounds.width - me.game.viewport.width) {

		this.scrollX += this.scrollSpeed * dt;
		this.cameraTargetPos.x = ~~(this.scrollX);
		this.cameraTargetPos.y = ~~(this.pos.y);

		var offset = new me.Vector2d();
		me.game.viewport.updateTarget();
		me.game.viewport.localToWorld(0, 0, offset);
		this.pos.x = ~~(this.screenOffset.x) + ~~(offset.x);
		this.pos.y = ~~(this.screenOffset.y);

		// Keep on screen.
		if(this.pos.x < offset.x + 5) {
			this.pos.x = offset.x + 5;
		}

		var w = me.video.renderer.getWidth();
		if(this.pos.x > offset.x + w - 50) {
			this.pos.x = offset.x + w - 50;
		}

		me.collision.check(this);

		this._super(me.Entity, 'update', [dt]);
		return true;
	},

	onCollision : function (response, other) {
		this.screenOffset.y -= response.overlapV.y;
		return true;
	},
});
