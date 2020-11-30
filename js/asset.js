(function(ns) {
	var asset = ns.Asset = Hilo.Class.create({
		Mixes: Hilo.EventMixin,
		queue: null,
		load: function() { //预加载图片资源
			var resources = [{
					id: 'f1',
					src: 'img/f1.png',
					msg: '精灵小鸟'
				},
				{
					id: 'f2',
					src: 'img/f2.png',
					msg: '精灵小鸟'
				},
				{
					id: 'k',
					src: 'img/k.png',
					msg: '播放按钮图'
				},
				{
					id: 'p',
					src: 'img/p.png',
					msg: '人物图片'
				},
				{
					id: 'r',
					src: 'img/r.png',
					msg: '兔子、萝卜图片'
				},
				{
					id: 'tu1',
					src: 'img/tu1.png',
					msg: '土壤精灵图片'
				}, {
					id: 'tu2',
					src: 'img/tu2.png',
					msg: '土壤精灵图片'
				},
				{
					id: 'ra',
					src: 'img/ra.png',
					msg: '兔子、萝卜图片'
				},
				{
					id: 'n',
					src: 'img/n.png',
					msg: '积分图片'
				},
				{
					id: 'x',
					src: 'img/x.png',
					msg: '红心精灵'
				},
			];
			for(let i = 1; i <= 9; i++) {
				let obj = {
					id: 'l' + i,
					src: 'img/l' + i + '.png',
					msg: '背景图片'
				}
				if(i === 2) obj.msg = "树木场景"
				if(i === 3) obj.msg = "房屋场景"
				if(i === 7) obj.msg = "天空场景"
				if(i === 9) obj.msg = "草地场景"
				resources.push(obj)
			}

			this.queue = new Hilo.LoadQueue();
			this.queue.add(resources);
			var loadingP = document.getElementById('loading-p')
			var loadingO = document.getElementById('loading-o')
			var len = resources.length
			let i = 0
			this.queue.on('load', function(e) {
				console.log(e, e.detail, '下载')
				i++

				loadingO.innerHTML = resources[i - 1].msg + ' 已完成'
				loadingP.innerHTML = "正在加载中" + Math.ceil(i * 100 / len) + "%"

			});
			this.queue.on('complete', this.onComplete.bind(this)); //资源加载完成后调用onComplete
			this.queue.start();
		},
		onComplete: function(e) {
			var loading = document.getElementById('loading')
				loading.remove()
			this.person = this.queue.get('p').content;
			this.startImg = this.queue.get('k').content;
			this.bird1 = this.queue.get('f1').content;
			this.bird2 = this.queue.get('f2').content;
			this.birdAtlas()
			this.radishAtlas()
			this.tuAtlas()
			this.rabbitAtlas()
			this.createNember()
			this.queue.off('complete');
			this.fire('complete');
		},

		birdAtlas: function(e) { //绘制小鸟纹理
			ns.birdAtlas2 = new Hilo.TextureAtlas({
				image: this.queue.get('f2').content,
				frames: [
					[24, 24, 80, 56],
					[24, 120, 80, 56],
				],
				sprites: {
					b2: [0, 1]
				}
			});
			ns.birdAtlas1 = new Hilo.TextureAtlas({
				image: this.queue.get('f1').content,
				frames: [
					[24, 24, 80, 56],
				],
				sprites: {
					b1: [0]
				}
			});
		},

		createNember: function() {
			var number = this.queue.get('n').content;
			ns.numberGlyphs = {
				0: {
					image: number,
					rect: [0, 0, 60, 91]
				},
				1: {
					image: number,
					rect: [61, 0, 60, 91]
				},
				2: {
					image: number,
					rect: [121, 0, 60, 91]
				},
				3: {
					image: number,
					rect: [191, 0, 60, 91]
				},
				4: {
					image: number,
					rect: [261, 0, 60, 91]
				},
				5: {
					image: number,
					rect: [331, 0, 60, 91]
				},
				6: {
					image: number,
					rect: [401, 0, 60, 91]
				},
				7: {
					image: number,
					rect: [471, 0, 60, 91]
				},
				8: {
					image: number,
					rect: [541, 0, 60, 91]
				},
				9: {
					image: number,
					rect: [611, 0, 60, 91]
				}
			};
		},
		radishAtlas: function() { //绘制萝卜纹理
			ns.radishAtlas = new Hilo.TextureAtlas({
				image: this.queue.get('r').content,
				frames: [
					[24, 8, 80, 88],
					[152, 8, 80, 88],
					[280, 8, 80, 88],
					[24, 104, 80, 88],
					[152, 104, 80, 88],
					[280, 104, 80, 88],
					[24, 200, 80, 88],
					[152, 200, 80, 88],
					[280, 200, 80, 88],
				],
				sprites: {
					r: [0, 1, 2, 3, 4, 5, 6, 7, 8]
				}
			});

		},
		tuAtlas: function() {
			ns.tuAtlas2 = new Hilo.TextureAtlas({
				image: this.queue.get('tu2').content,
				frames: [
					[24, 40, 102, 64],
					[24, 136, 102, 64],
				],
				sprites: {
					t2: [0, 1]
				}
			});
			ns.tuAtlas1 = new Hilo.TextureAtlas({
				image: this.queue.get('tu1').content,
				frames: [
					[16, 32, 102, 64],
					[16, 136, 102, 64],
				],
				sprites: {
					t1: [0, 1]
				}
			});

		},
		rabbitAtlas: function() {
			ns.rabbitAtlas = new Hilo.TextureAtlas({
				image: this.queue.get('ra').content,
				frames: [
					[0, 289, 120, 88],
					[128, 289, 120, 88],
				],
				sprites: {
					ra: [0, 1]
				}
			});

		}
	})

})(window.game)