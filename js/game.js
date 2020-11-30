(function() {
	window.onload = function() {
		game.init();
	}
	var game = window.game = {
		state: 0,
		width: 0,
		height: 0,
		init: function() {
			this.asset = new game.Asset();
			this.loadAudio()
			this.asset.on('complete', function(e) {
				this.asset.off('complete');
				console.log('资源加载完成', )
				this.initStage()
			}.bind(this));
			this.asset.load();
		},
		loadAudio: function() {
			let self = this
			this.audio = Hilo.WebSound.getAudio({
				src: './img/m5.ogg',
				loop: true,
				volume: 1
			}, true);
			this.audio.on("load", function() {
				console.log('音乐加载完成')

				self.audio.play()

			})
			this.audio.load()
		},
		initStage: function() {
			this.width = Math.min(innerWidth, 450) * 2;
			this.height = Math.min(innerHeight, 750) * 2;
			this.scale = 0.5;
			//舞台
			this.stage = new Hilo.Stage({ //创建舞台画布并追加到body中
				renderType: 'canvas',
				width: this.width,
				background: '#ccc',
				height: this.height,
				scaleX: this.scale,
				scaleY: this.scale
			});
			document.body.appendChild(this.stage.canvas);

			//启动计时器
			this.ticker = new Hilo.Ticker(60);
			this.ticker.addTick(Hilo.Tween);
			this.ticker.addTick(this.stage);
			this.ticker.start(true);

			//绑定交互事件
			this.stage.enableDOMEvent(Hilo.event.POINTER_START, true);
			this.initScenes()

		},
		initScenes: function() { //准备场景
			let self = this
			this.gameStartScene = new game.ReadyScene({ //开始页
				id: 'readyScene',
				image: this.asset.person,
				startImg: this.asset.startImg,
				bird1: this.asset.bird1,
				bird2: this.asset.bird2,
				width: this.width,
				height: this.height,
			}).addTo(this.stage);
			
			this.gamePlayingScene = new game.PlayingScene({ //游戏中页面
				id: 'playingScene',
				width: this.width,
				height: this.height,
			}).addTo(this.stage);
			
			  this.gamePlayingScene.on('gameOver', function(e) {
               		this.gameStartScene.show()
               		this.gamePlayingScene.end() 
            }.bind(this));
			
			
			this.gameStartScene.getChildById('start').on(Hilo.event.POINTER_START, function(e) { //点击
				this.gameStartScene.visible = false
				this.gamePlayingScene.start()
			}.bind(this));
			let audioPlayDom = this.gameStartScene.getChildById('l5')
			let audioStopDom = this.gameStartScene.getChildById('l8')
			audioPlayDom.on(Hilo.event.POINTER_START, function(e) { //点击关闭播放音乐
				this.visible = false
				self.audio.play()
				audioStopDom.visible = true
				self.audio.setMute(true)

			});
			audioStopDom.on(Hilo.event.POINTER_START, function(e) { //点击开始播放音乐
				self.audio.setMute(false)
				this.visible = false
				audioPlayDom.visible = true
			});

		},
		startPlaying: function() {
			this.gamePlayingScene.start()
			//	setTimeout()
		}

	}
})()