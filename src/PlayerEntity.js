"use strict";

GBGJ.PlayerEntity = me.Entity.extend({
	init : function (x, y, settings) {
		settings = settings || {};
		settings.image = "player";
		settings.width = 32;
		settings.height = 32;
		settings.frameheight = 32;
		settings.framewidth = 32;
		settings.shapes = [ new me.Rect(0, 0, 16, 16) ]

		this._super(me.Entity, 'init', [x, y, settings]);
		this.pos.z = 6;
		this.moveSpeed = .1;
		this.scrollSpeed = .01;
		this.bombs = 3;
		this.bombTimer = 0;

		// floating point scroll distance.
		this.scrollX = 70;
		this.screenOffset = this.pos.x;

		this.cameraTargetPos = new me.Vector2d(this.pos.x, this.pos.y);

		me.game.viewport.follow(this.cameraTargetPos, me.game.viewport.AXIS.BOTH);
		me.state.current().player = this; // Probably a better way to expose this, but I don't know it yet.
		me.game.viewport.setDeadzone(10,10);

		this.alwaysUpdate = true;
		this.body.collisionType = me.collision.types.PLAYER_OBJECT;
		this.body.setMaxVelocity(0, 0);
		this.body.setFriction(0, 0);
		this.body.gravity = 0;

		this.shootSub = me.event.subscribe(me.event.KEYDOWN, this.tryToShoot.bind(this));
		this.shootSub = me.event.subscribe(me.event.KEYDOWN, this.tryToBomb.bind(this));
		this.shootTimer = 0;

		this.renderable.addAnimation("idle", [0, 1, 2]);
		this.renderable.addAnimation("shoot", [3, 4]);

		this.changeAnimation("idle");
	},

	tryToBomb: function(action, keyCode, edge) {
		if(action == 'bomb' && this.bombs > 0 && this.bombTimer <= 0) {
			var numChunks = 8;
			for(var i = 0; i < numChunks; i++) {
				var angle = i * 2 * Math.PI / numChunks;
				me.game.world.addChild(
					new GBGJ.BombDebris(this.pos.x, this.pos.y, {
						dir: {
							x: Math.cos(angle),
							y: Math.sin(angle),
						}
					})
				);
			}
			this.bombTimer = 500;
			this.bombs--;
			me.state.current().getBullets().slice().forEach(function(b) {
				b.remove();
			});
			me.state.current().getEnemies().slice().forEach(function(e) {
				if(me.game.viewport.isVisible(e)) {
					e.die();
				}
			});
		}
	},


	tryToShoot: function(action, keyCode, edge) {
		if(action == 'shoot' && this.shootTimer <= 0) {
			this.shootTimer = 400;
			var bullet = new GBGJ.BulletPlayer(this.pos.x, this.pos.y, {
				dir: {
					x: 1,
					y: 0,
				}
			});
			bullet.add();
			this.changeAnimation("shoot", this.changeAnimation.bind(this, "idle"));
		}
	},

	changeAnimation: function(dest, next) {
		if(!this.renderable.isCurrentAnimation(dest)) {
			if(next) {
				next = next.bind(this);
			}
			this.renderable.setCurrentAnimation(dest, next);
		}
	},

	onDeactivateEvent: function() {
		me.event.unsubscribe(this.shootSub);
	},

	update : function (dt) {
		this.shootTimer = Math.max(0, this.shootTimer - dt);
		this.bombTimer = Math.max(0, this.bombTimer- dt);

		if(me.input.isKeyPressed('right')) {
			this.screenOffset -= this.moveSpeed * dt;
		}
		if(me.input.isKeyPressed('left')) {
			this.screenOffset += this.moveSpeed * dt;
		}
		if(me.input.isKeyPressed('down')) {
			this.pos.y += this.moveSpeed * dt;
		}
		if(me.input.isKeyPressed('up')) {
			this.pos.y -= this.moveSpeed * dt;
		}

		// TODO: Force auto scroll here...
		if(me.game.viewport.pos.x < me.game.viewport.bounds.width - me.game.viewport.width) {
			this.scrollX += this.scrollSpeed * dt;
		}

		this.cameraTargetPos.x = ~~(this.scrollX);
		this.cameraTargetPos.y = ~~(this.pos.y);

		// Screen offset is from the center, going LEFT. Smaller number = further right.
		this.screenOffset = this.screenOffset.clamp(-25, me.video.renderer.getWidth() / 2 + 5);

		this.pos.x = ~~(this.scrollX) - ~~(this.screenOffset);
		this.pos.y = ~~(this.pos.y);


		me.collision.check(this);

		this._super(me.Entity, 'update', [dt]);
		return true;
	},

	onCollision : function (response, other) {
		return true;
	},
});

GBGJ.BombDebris = me.Entity.extend({
		init : function (x, y, settings) {
		settings = settings || {};
		settings.image = "explode_16";
		settings.width = 16;
		settings.height = 16;
		settings.framewidth = settings.width;
		settings.frameheight = settings.height;
		this._super(me.Entity, 'init', [x, y, settings]);

		this.pos.z = 10;
		this.speed = settings.speed || 5;
		this.body.collisionType = me.collision.types.USER;
		this.body.setVelocity(0, 0);
		this.body.setMaxVelocity(this.speed, this.speed);
		this.body.setFriction(0, 0);
		this.body.gravity = 0;
		this.setDirection(settings.dir);
		this.body.setCollisionMask(me.collision.types.NO_OBJECT);
		this.renderable.addAnimation("loop", [0, 1, 2, 3]);
		this.renderable.setCurrentAnimation("loop", this.end.bind(this));
	},

	end: function() {
		me.game.world.removeChild(this);
	},

	setDirection: function(dir) {
		this.body.vel.x = dir.x * this.speed;
		this.body.vel.y = dir.y * this.speed;
		this.renderable.angle = Math.atan2(dir.y, dir.x);
	},

	onDeactivateEvent: function() {
	},

	update : function (dt) {
		this.body.update(dt);
		if(!me.game.viewport.isVisible(this)) {
			me.game.world.removeChild(this);
		}
		return (this._super(me.Entity, 'update', [dt]) || this.body.vel.x !== 0 || this.body.vel.y !== 0);
	},
});
