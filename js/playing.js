(function(ns) {
	var PlayingScene = ns.PlayingScene = Hilo.Class.create({
		Extends: Hilo.Container,
		radish: [],
		data: [],
		show: false,
		visible: false,
		score: 0,
		constructor: function(properties) {
			PlayingScene.superclass.constructor.call(this, properties);
			this.prop = properties
			this.init()
		},
		init: function() {
			this.addRadish() //追加9只萝卜进入场景
			this.showScore() //追加分数进入场景
			//this.addChild(this.radish);

		},
		start: function() {
			this.visible = true
			setInterval(() => { //萝卜开始动起来
				this.radishMove()
			}, 2000)
		},
		addRadish: function() { //添加萝卜进入场景
			let w = this.prop.width
			let h = this.prop.height

			for(let i = 0; i < 9; i++) {
				let r = i % 3
				let p = parseInt(i / 3)
				let x = (r * 0.333 + 0.033) * w //x开始坐标
				let y = ((p + 1) * 0.2) * h
				this.data[i] = [x, y, r * w / 3 + 0.167 * w, y + h * 0.2]
				this.radish[i] = new game.Radish({
					id: 'radish' + i,
					x: x,
					y: y,
					width: w * 0.2666,
					height: h * 0.2,
					interval: 5,
				}).addTo(ns.stage);
				this.addChild(this.radish[i]);
			}
		},
		addTu: function(r, b) { //实例化一个土    
			let w = this.prop.width
			let h = this.prop.height
			let self = this
			let tu = new game.Tu({
				id: 'tu' + r,
				interval: 10,
				width: w * 0.2,
				height: h * 0.15,
				x: this.data[r][2] - w * 0.1,
				y: this.data[r][3] - h * 0.13,
				cb: function() {
					self.removeChild(tu)
					if(!b) self.addRabbit(r)
				}
			}).addTo(ns.stage);
			this.addChild(tu);

		},
		addRabbit: function(r) { //添加土之后添加兔子实例
			let w = this.prop.width
			this.radish[r].visible = false
			let h = this.prop.height
			let ra = new game.Rabbit({
				id: 'ra' + r,
				interval: 15,
				width: w * 0.3,
				height: h * 0.25,
				x: this.data[r][2] - w * 0.15,
				y: this.data[r][3] - h * 0.27
			}).addTo(ns.stage);
			this.addChild(ra);
			let readying = true
			ra.on(Hilo.event.POINTER_START, function(e) { //点击兔子事件
				if(readying) {
					clearTimeout(timer)
					this.rabbitCallback(r, ra)
				}
				readying = false
				console.log('选中了兔子')
			}.bind(this));
			let timer = setTimeout(() => { //删除事件和元素
				this.rabbitCallback(r, ra)
			}, 3000)
		},
		rabbitCallback: function(r, ra) {
			this.setScore()
			this.show = false
			this.radish[r].visible = true
			this.addTu(r, true)
			ra.off()
			this.removeChild(ra)
		},
		radishMove: function() { //让萝卜动起来
			let num = Math.floor(Math.random() * 4) + 1;
			let obj = {}
			for(let i = 0; i < num; i++) {
				let r = Math.floor(Math.random() * 9); //随机选择一个萝卜动
				let isShow = Math.random() < 0.2 //20%动的萝卜出现兔子
				if(!obj[r]) {
					obj[r] = r + 1
					this.radish[r].run()
					if(isShow && !this.show) {
						this.show = true
						this.addTu(r)
					}
				}
			}
			num = null
			obj = null
		},
		setScore: function() {
			this.score = this.score + 10
			this.currentScore.setText(this.score);
		},
		showScore: function() { //出现兔子
			this.currentScore = new Hilo.BitmapText({ //创建积分文本
				id: 'score',
				glyphs: game.numberGlyphs,
				x: this.prop.width * 0.5,
				y: 0.05 * this.prop.height,
				textAlign: 'center'
			})
			this.addChild(this.currentScore);
			this.currentScore.setText(this.score);
		}
	})

})(window.game)