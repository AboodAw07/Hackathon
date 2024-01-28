class EnemyZ {
	constructor(_img) {
		this.img = _img;
		this.x = random(width / 10, width - width / 10);
		this.y = random(height / 50, height - height / 5);
		this.size = width/14;
		this.hp = 100;
		this.timer = 0; // Add this line
	}

	shoot() {
		bullets.push(new Bullets(bulletImg, this.x, this.y));
	}

	display() {
		image(this.img, this.x, this.y, this.size, this.size);

		fill(255);
		textAlign(CENTER, BOTTOM);
		textSize(16);
		text(`HP: ${this.hp}`, this.x + this.size / 2, this.y);
	}

	remove() {
		this.x = -10000;
		this.y = -10000;
	}
}

