class Bullets {
  constructor(_img, _x, _y) {
    this.x = _x;
    this.y = _y;
    this.size = width/19;
    this.mx = random(-2, 2);
    this.my = random(-2, 2);
    this.img = _img;  }

  display() {
    image(this.img, this.x, this.y, this.size * 2, this.size);
  }

  move() {
    this.x += this.mx;
    this.y += this.my;

    if (this.x < 0 || this.x > width) {
      this.mx = this.mx * -1;
    }

    if (this.y < 0 || this.y > height) {
      this.my = this.my * -1;
    }

    if (this.x + this.size / 2 > hero.x - hero.size / 2 &&this.x - this.size / 2 < hero.x + hero.size / 2 &&this.y + this.size / 2 > hero.y - hero.size / 2 &&this.y - this.size / 2 < hero.y + hero.size / 2) {

      hpPlayer -= 25;

      bullets.splice(bullets.indexOf(this), 1);
    }
  }
}