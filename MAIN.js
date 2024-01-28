let hero;
let walkingDown = [];
let walkingUp = [];
let walkingLeft = [];
let walkingRight = [];
let attackingDown = [];
let attackingUp = [];
let attackingLeft = [];
let attackingRight = [];
let imageFrame = 0;
let frameCounter = 0;
const frameDelay = 10;
let inventory = []
let hasSword = false
let timer = 0
let hp = 100;
let newERoom = false
let backgroundImage2
let enemiesZ = []
let pressT = false
let hasEnteredNewRoom = false;
let bullets = []
let hpPlayer = 125
let timer2 = 0
let score = 0


function preload() {
	backgroundimagedefine = loadImage("d7in5r6-3b25a779-bbb8-4f79-9a8f-167aad662da1.jpg")
	backgroundImage2 = loadImage("GIFF.gif")
	for (let i = 1; i <= 3; i++) {
		walkingDown.push(loadImage("WALKDOWN" + i + ".png"));
		walkingUp.push(loadImage("WALKUP" + i + ".png"));
		walkingLeft.push(loadImage("WALKLEFT" + i + ".png"));
		walkingRight.push(loadImage("WALKRIGHT" + i + ".png"));
		attackingDown.push(loadImage("ATTACKDOWN" + i + ".png"));
		attackingUp.push(loadImage("ATTACKUP" + i + ".png"));
		attackingLeft.push(loadImage("ATTACKLEFT" + i + ".png"));
		attackingRight.push(loadImage("ATTACKRIGHT" + i + ".png"));
	}
	bulletImg = loadImage("Screenshot_2023-12-19_182936-removebg-preview.png");

	npcImage = loadImage("NPC.png");
	enemyImage = loadImage("PROTO.png");
	enemyZImage = loadImage("ENEMYZ.png");
	swordSound = loadSound("sword-hit-7160.mp3")
}

function setup() {
	createCanvas(windowWidth, windowHeight);
	backgroundImage2.play();
	hero = new Hero(width / 2, height / 2, 130);
	npc = new NPC(npcImage, width / 4, height / 4);
	enemy = new Proto(enemyImage, width / 1.5, height / 4);


	console.log("Move: WASD or  ↑ ↓ → ←. Please walk to the person on the top left.")
}




function draw() {

	if (score >= 500) {
		background(0, 255, 0)
		textSize(200)
		text("You won!", width / 2, height / 2)

	} else {
		if (!newERoom) {
			background(backgroundimagedefine);
			for (let i = 0; i < enemiesZ.length; i++) {
				ez = enemiesZ[i];
				ez.display();

				// Check if it's time for the enemies to shoot
				if (millis() >= 5000 + ez.timer) {
					ez.shoot();
					ez.timer = millis();
				}

				for (let j = 0; j < bullets.length; j++) {
					let bullet = bullets[j];
					bullet.display();
					bullet.move();
				}

				if (ez.hp <= 0) {
					enemiesZ.splice(i, 1);
					i--;
				}
			}

			if (keyIsDown(UP_ARROW) || keyIsDown(87)) {
				hero.move(0, -1);
				hero.distanceE(0, -1);
				hero.distanceEZ(0, -1);
				currentImage = walkingUp[imageFrame];
				if (mouseIsPressed && hasSword == true) {
					currentImage = attackingUp[imageFrame];
					swordSound.play();
					if (hero.distanceE(0, -1) == true) {
						enemy.hp -= 1;
					}
					// Check for attacking EnemyZ separately
					for (let i = 0; i < enemiesZ.length; i++) {
						if (hero.distanceEZ(0, -1, enemiesZ[i]) == true) {
							enemiesZ[i].hp -= 1;
							score += 1
						}
					}
				}
			} else if (keyIsDown(DOWN_ARROW) || keyIsDown(83)) {
				hero.move(0, 1);
				hero.distanceE(0, 1);
				hero.distanceEZ(0, 1);
				currentImage = walkingDown[imageFrame];
				if (mouseIsPressed && hasSword == true) {
					currentImage = attackingDown[imageFrame]
					swordSound.play()
					if (hero.distanceE(0, 1) == true) {
						enemy.hp -= 1;

					}
					for (let i = 0; i < enemiesZ.length; i++) {
						if (hero.distanceEZ(0, 1, enemiesZ[i]) == true) {
							enemiesZ[i].hp -= 1;
							score += 1
						}
					}
				}
			} else if (keyIsDown(LEFT_ARROW) || keyIsDown(65)) {
				hero.move(-1, 0);
				hero.distanceE(-1, 0);
				hero.distanceEZ(-1, 0);
				currentImage = walkingLeft[imageFrame];
				if (mouseIsPressed && hasSword == true) {
					currentImage = attackingLeft[imageFrame]
					swordSound.play()
					if (hero.distanceE(-1, 0) == true) {
						enemy.hp -= 1;
					}
					for (let i = 0; i < enemiesZ.length; i++) {
						if (hero.distanceEZ(-1, 0, enemiesZ[i]) == true) {
							enemiesZ[i].hp -= 1;
							score += 1
						}
					}
				}
			} else if (keyIsDown(RIGHT_ARROW) || keyIsDown(68)) {
				hero.move(1, 0);
				hero.distanceE(1, 0);
				hero.distanceEZ(1, 0); // Corrected
				currentImage = walkingRight[imageFrame];
				if (mouseIsPressed && hasSword == true) {
					currentImage = attackingRight[imageFrame];
					swordSound.play();
					if (hero.distanceE(1, 0) == true) {
						enemy.hp -= 1;
					}
					for (let i = 0; i < enemiesZ.length; i++) {
						if (hero.distanceEZ(1, 0, enemiesZ[i]) == true) {
							enemiesZ[i].hp -= 1;
							score += 1
						}
					}
				}
			} else {
				currentImage = walkingDown[0];
				if (mouseIsPressed && hasSword == true) {
					currentImage = attackingDown[imageFrame]
					swordSound.play()


				}
			}

			hero.display(currentImage);
			npc.display();

			if (enemy.hp > 0) {
				enemy.display();
			} else {
				enemy.remove()
			}
			if (hpPlayer <= 0) {
				background(255, 0, 0)
				textSize(200)
				text("You lost!", width / 2, height / 2)
			}

			if (dist(hero.x, hero.y, npc.x, npc.y) < 200) {
				if (!pressT) {
					console.log("press T to talk")
				}
				if (keyIsDown(84) && timer + 1000 < millis()) {
					console.log("Hello Hero, I am an enchanter. I see your sword is wethered, I will fix it for you, free of charge! To check it in your inventory, press i. To attack with your sword, move while clicking the mouse. You see that enemy? It won't attack you, kill it! After that go out the forest(top left), beware though, since enemies won't be so peaceful there")
					append(inventory, 'FIXED SWORD');
					hasSword = true
					timer = millis();
					pressT = false
				} else {
					pressT = true
				}
			}

			if (keyIsDown(73) && timer + 1000 < millis()) {
				for (let i = 0; i < inventory.length; i++) {
					print(inventory[i]);
					timer = millis();
				}
			}



			if (hero.newWorld() == true) {
				backgroundimagedefine = backgroundImage2









				enemy.remove()
				hero.remove()
				npc.remove()
				for (let i = 0; i < 5; i++) {
					enemiesZ.push(new EnemyZ(enemyZImage));
				}

				hero = new Hero(width / 2, height, 130);
				hero.display(currentImage);

			}
			frameCounter = (frameCounter + 1) % frameDelay; // runs once framecounter goes up 10 times

			if (frameCounter == 0) { // once framcecounter is 10 n module 10 = 0, 10 frames
				imageFrame = (imageFrame + 1) % 3; // 1,2,0,1,2,0,1...
			}


		}

	}
}