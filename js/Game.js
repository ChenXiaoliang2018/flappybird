function Game(ctx, bird, pipe, land, mountain) {
	this.ctx = ctx;
	this.bird = bird;
	this.land = land;
	this.mountain = mountain;
	this.pipeArr = [pipe];
	this.timer = null;
	this.iframe = 0;
	this.init();
}

// 渲染背景
Game.prototype.renderMountain = function() {
	var img = this.mountain.img;
	this.ctx.drawImage(img, this.mountain.x, this.mountain.y);
	this.ctx.drawImage(img, this.mountain.x + img.width, this.mountain.y);	
	this.ctx.drawImage(img, this.mountain.x + img.width * 2, this.mountain.y);	
	//背景山运动
	this.mountain.x -= this.mountain.step;
	if(this.mountain.x <= -img.width) {
		this.mountain.x = 0;
	}
}

Game.prototype.renderLand = function() {
	var img = this.land.img;
	this.ctx.drawImage(img, this.land.x, this.land.y);
	this.ctx.drawImage(img, this.land.x + img.width, this.land.y);	
	this.ctx.drawImage(img, this.land.x + img.width * 2, this.land.y);	
	//背景地面运动
	this.land.x -= this.land.step;
	if(this.land.x <= -img.width) {
		this.land.x = 0;
	}
}

// 渲染鸟
Game.prototype.renderBird = function() {
	this.ctx.save();
	this.ctx.translate(this.bird.x, this.bird.y);
	var deg = this.bird.state === 'D'? this.bird.speed * Math.PI / 180 : -this.bird.speed * Math.PI / 180;
	this.ctx.rotate(deg);
	var img = this.bird.img;
	this.ctx.drawImage(img, -img.width / 2, -img.height / 2);
	// 鸟头旋转
	this.ctx.restore();
}

// 渲染管子
Game.prototype.renderPipe = function() {
	var me = this;
	me.pipeArr.forEach(function(value, index) {
		// 绘制上管子
		var up_img = value.pipe_down; 
		var up_x = 0;
		var up_y = up_img.height - value.up_height;
		var up_w = up_img.width;
		var up_h = value.up_height;
		var canvas_x = me.ctx.canvas.width - value.step * value.count;
		var canvas_y = 0;
		var canvas_w = up_w;
		var canvas_h = up_h;
		me.ctx.drawImage(up_img, up_x, up_y, up_w, up_h, canvas_x, canvas_y, canvas_w, canvas_h);
		var down_img = value.pipe_up;
		var down_x = 0;
		var down_y = 0;
		var down_w = up_w;
		var down_h = 250 - up_h;
		var down_canvas_x = me.ctx.canvas.width - value.step * value.count;
		var down_canvas_y = up_h + 150;
		var down_canvas_w = up_w;
		var down_canvas_h = value.down_height;
		me.ctx.drawImage(down_img, down_x, down_y, down_w, down_h, down_canvas_x, down_canvas_y, down_canvas_w, down_canvas_h);
	})
}

// 游戏开始
Game.prototype.start = function() {
	var me = this;
    this.timer = setInterval(function() {
	    me.iframe ++;
    	me.clear();
    	me.renderMountain();
    	me.renderLand();
    	me.renderBird();
    	if(me.iframe % 10 == 0) {
    	    me.bird.Rotate();	
    	}
    	me.bird.Down();
    	me.renderPipe();
    	me.movePipe();
    }, 20)
}

// 初始化
Game.prototype.init = function() {
	this.start();
	this.bindEvent();
}

// 清屏
Game.prototype.clear = function() {
    this.ctx.clearRect(0, 0, 360, 512);
}

// 鸟上升
Game.prototype.bindEvent = function() {
	var me = this;
	this.ctx.canvas.onclick = function() {
        me.bird.Up();
	}
}

// 管子移动
Game.prototype.movePipe = function() {
	this.pipeArr.forEach(function(value, index) {
		value.count ++;
	})
}