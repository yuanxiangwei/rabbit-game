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
			this.initImgConfig()
			this.addPerson()
			this.addPlayStart()
			this.addBird()
			let arr = ['l7', 'l3', 'l2','l5', 'l4','l8', 'l1']
			arr.forEach(item => {
				this.addLoadingImgToScenes(item)
			})

			this.addChild(this.person, this.playStart, this.bird1, this.bird2);
			this.showScore()
		},
		show:function(){
			this.visible = true
			this.showScore()
		},
		showScore: function() { //出现积分
			let bigScore = localStorage.getItem('bigScore') ? localStorage.getItem('bigScore') : 0
			let currentScore = new Hilo.BitmapText({ //创建积分文本
				id: 'score',
				glyphs: ns.numberGlyphs,
				x: 10 + ns.width * 0.15,
				y: ns.height * 0.65,
				textAlign: 'center'
			})
			this.addChild(currentScore);
			currentScore.setText(bigScore);
		},
		initImgConfig: function() { //初始化背景图片数据
			this.img = {
				l1: {
					w: 0.8 * ns.width,
					h: 0.2 * ns.height,
					x: 0.1 * ns.width,
					y: 0.1 * ns.height,

				},
				l2: {
					w: ns.width,
					h: 0.2 * ns.height,
					x: 0,
					y: ns.height * 0.7,

				},
				l3: {
					w: ns.width,
					h: 0.4 * ns.height,
					x: 0,
					y: ns.height * 0.6,

				},
				l4: {
					w: 0.3 * ns.width,
					h: 0.3 * 0.82 * ns.width,
					x: 10,
					y: ns.height * 0.6,

				},
				l5:{
					w: 0.1 * ns.width,
					h: 0.1 * ns.width,
					x:  ns.width*0.85,
					y: ns.height * 0.03,
				},
				l8:{
					w: 0.1 * ns.width,
					h: 0.1 * ns.width,
					x:  ns.width*0.85,
					y: ns.height * 0.03,
					v:false
				},
				l7: {
					w: ns.width,
					h: ns.height
				}

			}
		},
		addLoadingImgToScenes: function(id) { //增加背景图片
			let img = ns.asset.queue.get(id).content
			let config = this.img[id]
			if(config) {
				let bit = new Hilo.Bitmap({
					id: id,
					width: config.w,
					height: config.h,
					x: config.x,
					y: config.y,
					visible:config.v===false?false:true,
					image: img,
				})
				this.addChild(bit)
			}

		},
		addPlayStart: function() {
			this.playStart = new Hilo.Bitmap({ //创建一个开始的图片
				id: 'start',
				width: this.prop.width * 0.2,
				height: this.prop.width * 0.2,
				x: this.prop.width * 0.4,
				y: this.prop.height * 0.45,
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
			this.person = new Hilo.Bitmap({ //创建一个人物背景图片
				id: 'person',
				width: this.prop.width * 0.3,
				height: this.prop.width * 0.3,
				x: this.prop.width * 0.35,
				y: this.prop.height - this.prop.width * 0.4,
				image: this.prop.image,
			})

			var st = Hilo.Tween.to(this.person, { //人物动效
				y: this.prop.height - this.prop.width * 0.5,
			}, {

				duration: 3000,
				reverse: true,
				loop: true
			});
		}
	})

})(window.game)