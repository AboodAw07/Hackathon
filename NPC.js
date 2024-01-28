
class NPC {
	constructor(_npcImage, _x, _y) {
		this.x = _x;
		this.y = _y;
		this.size = width/14;
		this.npcImage = _npcImage
	}

	display() {
		image(this.npcImage, this.x, this.y, this.size, this.size);
	}

	move() {

	}

	remove() {
		this.x = -10000
		this.y = -10000
	}
}



