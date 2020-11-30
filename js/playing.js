(function(ns) {
	var PlayingScene = ns.PlayingScene = Hilo.Class.create({
		Extends: Hilo.Container,
		radish: [],
		data: [],
		show: false, //兔子是否在场景
		visible: false,
		score: 0,
		speed: 2000, //土动的速度
		vanish: 3000, //兔子存在时间
		time: 30000, //总时间
		constructor: function(properties) {
			PlayingScene.superclass.constructor.call(this, properties);
			this.prop = properties
			this.init()
		},
		init: function() {
			this.addSkyBg()
			this.addGrassEndBg()
			this.addGrassBg()
			this.addHeart()
			this.addRadish() //追加9只萝卜进入场景
			this.showScore() //追加分数进入场景

			//this.addChild(this.radish);
		},
		addHeart: function() {
			let w = ns.width
			let h = ns.height
			let img = ns.asset.queue.get('x').content
			for(let i = 1; i <= 5; i++) {
				let xin = new Hilo.Bitmap({
					id: 'heart' + i,
					width: w * 0.1,
					height: w * 0.1,
					x: (0.12 + i * 0.11) * w,
					y: 0.83 * h,
					image: img
				})
				this.addChild(xin)
			}

		},
		addSkyBg: function() {
			let img = ns.asset.queue.get('l7').content
			let bit = new Hilo.Bitmap({
				id: 'pl7',
				width: ns.width,
				height: ns.height,
				x: 0,
				y: 0,
				image: img,
			})
			this.addChild(bit)
		},
		addGrassBg: function() {
			let img = ns.asset.queue.get('l9').content
			let bit = new Hilo.Bitmap({
				id: 'pl9',
				width: ns.width,
				height: ns.height * 0.8,
				x: 0,
				y: ns.height * 0.2,
				image: img,
			})
			this.addChild(bit)
		},
		addGrassEndBg: function() {
			let img = ns.asset.queue.get('l2').content
			let bit = new Hilo.Bitmap({
				id: 'pl2',
				width: ns.width,
				height: ns.height * 0.2,
				x: 0,
				y: ns.height * 0.1,
				image: img,
			})
			this.addChild(bit)
		},
		hideHeart: function(n) {
			this.getChildById('heart' + n).visible = false
		},
		start: function() {
			this.visible = true
			this.startTimer() //萝卜动起来
			this.changeHeart()

		},
		end: function() {
			this.visible = false
			clearTimeout(this.moveTimer)
		},
		changeHeart: function() {
			for(let i = 0; i <= 5; i++) {
				if(this.getChildById('heart' + i)) {
					this.getChildById('heart' + i).visible = true
				}
			}
			let self = this
			let num = 1
			let timer = setInterval(() => { //倒计时  减心心
				if(num > 5) {
					clearInterval(timer)
					self.score = 0
					self.currentScore.setText(0);
					self.fire('gameOver')
				} else {
					this.hideHeart(num)
				}
				num++
			}, this.time / 5)
		},
		startTimer: function() {
			this.moveTimer = setTimeout(() => { //萝卜开始动起来
				this.startTimer()
				this.radishMove()
			}, this.speed)
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
					this.rabbitCallback(r, ra, true)
				}
				readying = false
				console.log('选中了兔子')
			}.bind(this));
			let timer = setTimeout(() => { //删除事件和元素
				this.rabbitCallback(r, ra)
			}, this.vanish)
		},
		rabbitCallback: function(r, ra, c) {
			if(c) this.setScore() //加分
			this.show = false //兔子不在场景
			this.radish[r].visible = true //萝卜重新出现
			this.addTu(r, true) //土动效
			ra.off() //移除事件
			this.removeChild(ra)
		},
		radishMove: function() { //让萝卜动起来
			let num = Math.floor(Math.random() * 4) + 1;
			let obj = {}
			for(let i = 0; i < num; i++) {
				let r = Math.floor(Math.random() * 9); //随机选择一个萝卜动
				let isShow = Math.random() < 0.3 //20%动的萝卜出现兔子
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
			this.score = this.score + 1
			if(!localStorage.getItem('bigScore') || this.score > localStorage.getItem('bigScore')) {
				localStorage.setItem('bigScore', this.score)
			}
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