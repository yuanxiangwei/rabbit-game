(function(ns) {
	var Bird = ns.Bird = Hilo.Class.create({
		Extends: Hilo.Sprite,
		props: {},
		timer: 0,
		constructor: function(properties) {
			Bird.superclass.constructor.call(this, properties);
			this.addFrame(ns.birdAtlas1.getSprite('b1'));
			this.addFrame(ns.birdAtlas2.getSprite('b2'));
			this.props = properties
			this.run(this.timer)
		},
		run: function() {
			if(this.timer >= this.props.trackArr.length) this.timer = 0
			let obj = this.props.trackArr[this.timer]
			let self = this
			var st = Hilo.Tween.to(this, { //草地动效
				x: obj.x,
				y: obj.y,
				scaleX: obj.sx ? obj.sx : 1,
			}, {
				duration: obj.duration ? obj.duration : 5000,
				onComplete: function() {
					self.timer++
						self.run()
				}
			});

		}
	})
})(window.game)