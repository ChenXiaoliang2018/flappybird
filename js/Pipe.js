function Pipe(pipe_up, pipe_down, step, x) {
	this.pipe_up = pipe_up;
	this.pipe_down = pipe_down;
	this.step = step;
	this.x = x;
	this.up_height = parseInt(Math.random() * 250);
	this.down_height = 250 -this.up_height;
	this.count = 0;
}