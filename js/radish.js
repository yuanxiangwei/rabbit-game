(function(ns) {
	var Radish = ns.Radish = Hilo.Class.create({
		Extends: Hilo.Sprite,
		props: {},
		timer: 0,
		paused: true,
		loop: true,
		currentFrame: 0,
		constructor: function(properties) {
			Radish.superclass.constructor.call(this, properties);
			this.addFrame(ns.radishAtlas.getSprite('r'));
			//			this.addFrame(ns.birdAtlas2.getSprite('b2'));
			this.props = properties
			//			this.run(this.timer)
		},
		run: function() {
			this.currentFrame = Math.floor(Math.random() * 3)
			this.paused = false
			setTimeout(() => {
				this.paused = true
				this.currentFrame = 0
			}, 2000)
		}

	})
})(window.game)