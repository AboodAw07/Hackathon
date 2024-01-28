class Hero {
	constructor(_x, _y, _size) {
		this.x = _x;
		this.y = _y;
		this.size = width/14;
	}

	display(img) {
		textSize(20);
fill(255);
text(`HP: ${hpPlayer}`, this.x + this.size/2, this.y);

		image(img, this.x, this.y, this.size, this.size);
	}

	move(xd, yd) {
		let newX = this.x + xd * 20;
		let newY = this.y + yd * 20;

		// Check for collisions with EnemyZ instances
		for (let i = 0; i < enemiesZ.length; i++) {
			let distanceToEnemyZ = dist(newX, newY, enemiesZ[i].x, enemiesZ[i].y);
			if (distanceToEnemyZ < this.size / 2 + enemiesZ[i].size / 2) {
				return false;
			}
		}

		let DistanceNPC = dist(newX, newY, npc.x, npc.y);
		let Distanceenemy = dist(newX, newY, enemy.x, enemy.y);

		if (Distanceenemy >= this.size / 2 + enemy.size / 2 && DistanceNPC >= this.size / 2 + npc.size / 2) {

			this.x = constrain(newX, this.size / 2 + width / 10, width - this.size / 2 - width / 10);
			this.y = constrain(newY, this.size / 2 + height / 50, height - this.size / 2 - height / 5);
			return true;
		}

		return false;
	}

	distanceEX(xd, yd) {
		let newX = this.x + xd * 10;
		let newY = this.y + yd * 10;


		for (let i = 0; i < enemiesZ.length; i++) {
			let distanceToEnemyZ = dist(newX, newY, enemiesZ[i].x, enemiesZ[i].y);
			if (distanceToEnemyZ < this.size / 2 + enemiesZ[i].size / 2) {
				return false;
			}
		}
	}
	distanceE(xd, yd) {
		let newX = this.x + xd * 10;
		let newY = this.y + yd * 10;
		let distanceToenemy = dist(newX, newY, enemy.x, enemy.y);

		if (distanceToenemy <= this.size / 2 + enemy.size / 2 + 50) {
			return true;
		} else {
			return false;
		}
	}
	distanceEZ(xd, yd, enemyZ) {
		if (enemyZ) {
			let newX = this.x + xd * 10;
			let newY = this.y + yd * 10;


			let distanceToEnemyZ = dist(newX, newY, enemyZ.x, enemyZ.y);
			if (distanceToEnemyZ <= this.size / 2 + enemyZ.size / 2 + 50) {
				return true;
			}
		}
		return false;
	}



	remove() {
		this.x = -100000;
		this.y = -100000;
	}

	newWorld() {

		if (!hasEnteredNewRoom && this.x < width / 2.5 && this.x > width / 3.5) {
			if (this.y < height / 9 && this.y > -1000) {

				hasEnteredNewRoom = true;
				return true;
			}
		}
		return false;
	}
}


