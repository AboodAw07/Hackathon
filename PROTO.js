class Proto {
	constructor(_enemyImage, _x, _y) {
		this.x = _x;
		this.y = _y;
		this.size = width/14;
		this.enemyImage = _enemyImage
		this.hp = 100
	}

	display() {
		image(this.enemyImage, this.x, this.y, this.size, this.size);
		fill(255);
		textAlign(CENTER, BOTTOM);
		textSize(16);
		text(`HP: ${this.hp}`, this.x + this.size / 2, this.y);
	}

	remove() {
		this.x = -10000
		this.y = -10000
	}

}
