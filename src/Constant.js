"use strict";

GBGJ.Constant = {
	speed: {
		slow: 0.2,
		medium: 0.5,
		fast: 1,
	},
	cooldown: {
		long: 3000,
		medium: 2000,
		short: 1000,
	},
	offset: {
		short: 300,
		// This is the delay used between an enemy appearing on screen and firing for the first time.
		medium: 600,
	},
	player: {
		speed: {
			// dt (as passed by update()) looks to be 16.6666, and we truncate the
			// decimal component off each update so as to achive pixel snapping.  As a
			// result, we want moveSpeed * dt to be _slightly_ higher than an integer,
			// or else we'll move faster up than we do down.
			normal: 0.12,
			shooting: 0.06,
		},
		cooldown: {
			normal: 250,
			shotgun: 350,
		},
	},
};
