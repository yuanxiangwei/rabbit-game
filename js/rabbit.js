(function(ns) {
	var Rabbit = ns.Rabbit = Hilo.Class.create({
		Extends: Hilo.Sprite,
		props: {},
		timer: 0,
		paused: true,
		loop: true,
		currentFrame: 0,
		constructor: function(properties) {
			Rabbit.superclass.constructor.call(this, properties);
			this.addFrame(ns.rabbitAtlas.getSprite('ra'));

			this.props = properties
		
		},
		run: function() {

		}

	})
})(window.game)