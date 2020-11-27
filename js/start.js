(function(ns) {
	var ReadyScene = ns.ReadyScene = Hilo.Class.create({
		Extends: Hilo.Container,
		prop: {},
		person: null,
		playStart: null,
		bird1: null,
		bird2: null,
		constructor: function(properties) {
			ReadyScene.superclass.constructor.call(this, properties);
			this.prop = properties
			this.init();
		},
		init: function() {
			this.addPerson(this.prop)
			this.addStart(this.prop)
			this.addBird()
			this.addChild(this.person, this.playStart, this.bird1, this.bird2);
		},
		addStart: function() {
			this.playStart = new Hilo.Bitmap({ //创建一个北京图片
				id: 'start',
				width: 100,
				height: 100,
				x: this.prop.width / 2 - 100,
				y: this.prop.height / 2 - 100,
				image: this.prop.startImg,
			})

		},
		addBird: function() {
			let w = this.prop.width
			let h = this.prop.height
			this.bird1 = new game.Bird({
				id: 'bird1',
				y: h * 0.3,
				x: w * 0.2,
				trackArr: [{
					x: w * 0.2,
					y: h * 0.3,
					duration: 10,
					sx: -1
				}, {
					x: w * 0.7,
					y: h * 0.15,
					sx: -1
				}, {
					x: w * 1.3,
					y: h * 0.5,
					duration: 7000,
					sx: -1
				}, {
					x: w * 1.3,
					y: h * 0.5,
					duration: 100,
				}, {
					x: w * 1.3,
					y: h * 0.5,

					duration: 0
				}, {
					x: w * 0.8,
					y: h * 0.4,

				}, {
					x: w * 0.2,
					y: h * 0.3,
				}],
				interval: 10,
			}).addTo(ns.stage);
			this.bird2 = new game.Bird({
				id: 'bird2',
				y: h * 0.2,
				x: w * 0.6,

				trackArr: [{
					x: w * 0.2,
					y: h * 0.6,
					duration: 10,
					sx: -1
				}, {
					x: w * 0.9,
					y: h * 0.15,
					sx: -1
				}, {
					x: w * 1.3,
					y: h * 0.5,
					sx: -1
				}, {
					x: w * 1.3,
					y: h * 0.5,

					duration: 100
				}, {
					x: w * 0.8,
					y: h * 0.4,
					duration: 7000,

				}, {
					x: w * 0.2,
					y: h * 0.6,

				}],
				interval: 10,
			}).addTo(ns.stage);

		},
		addPerson: function() {
			this.person = new Hilo.Bitmap({ //创建一个北京图片
				id: 'person',
				width: 200,
				height: 200,
				x: this.prop.width / 2 - 100,
				y: this.prop.height - 250,
				image: this.prop.image,
			})

			var st = Hilo.Tween.to(this.person, { //草地动效
				y: this.prop.height - 300,
			}, {

				duration: 2000,
				reverse: true,
				loop: true
			});
		}
	})

})(window.game)