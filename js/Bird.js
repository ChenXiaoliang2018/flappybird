function Bird(imgArr, x, y) {
	this.imgArr = imgArr;
	this.idx = parseInt(Math.random() * imgArr.length);
	this.img = this.imgArr[this.idx];
	this.x = x;
	this.y = y;
	this.state = 'D';
	this.speed = 0;
}

Bird.prototype.Up = function() {
	this.state = 'U';
	this.speed = 20;
}

Bird.prototype.Down = function() {
	if (this.state === 'D') {
		this.speed++;
		this.y += Math.sqrt(this.speed);
	} else {
		this.speed--;
		if (this.speed === 0) {
			this.state = 'D'
			return;
		}
		this.y -= Math.sqrt(this.speed);
	}
}

Bird.prototype.Rotate  = function() {
	this.idx ++;
	if(this.idx === this.imgArr.length) {
		this.idx = 0;
	}
	this.img = this.imgArr[this.idx];
}