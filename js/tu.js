(function(ns) {
	var Tu = ns.Tu = Hilo.Class.create({
		Extends: Hilo.Sprite,
		visible: true,
		x: 0,
		y: 0,
		constructor: function(properties) {
			Tu.superclass.constructor.call(this, properties);
			this.addFrame(ns.tuAtlas1.getSprite('t1'));
			this.addFrame(ns.tuAtlas2.getSprite('t2'));
			this.setFrameCallback(3, this.complete)
			this.props = properties

		},
		complete: function() {
			this.visible = false
			this.props.cb()
			console.log('jieshul')
		
		}

	})
})(window.game)