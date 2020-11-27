(function(ns) {
	var asset = ns.Asset = Hilo.Class.create({
		Mixes: Hilo.EventMixin,
		queue: null,
		load: function() { //预加载图片资源
			var resources = [{
					id: 'f1',
					src: 'img/f1.png'
				},
				{
					id: 'f2',
					src: 'img/f2.png'
				},
				{
					id: 'k',
					src: 'img/k.png'
				},
				{
					id: 'p',
					src: 'img/p.png'
				},
				{
					id: 'r',
					src: 'img/r.png'
				},
				{
					id: 'tu1',
					src: 'img/tu1.png'
				}, {
					id: 'tu2',
					src: 'img/tu2.png'
				},
				 {
					id: 'ra',
					src: 'img/ra.png'
				},
				 {
					id: 'n',
					src: 'img/n.png'
				},
			];

			this.queue = new Hilo.LoadQueue();
			this.queue.add(resources);
			this.queue.on('complete', this.onComplete.bind(this)); //资源加载完成后调用onComplete
			this.queue.start();

		},
		onComplete: function(e) {
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
		createNember:function(){
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