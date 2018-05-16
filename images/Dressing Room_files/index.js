window.onload = function() {
  class Circle {
    constructor(elem) {
      this.elem = elem;
      this.angle = Math.random() * Math.PI * 2;
      this.x = 0;
      this.y = 0;
    }
    setPosition() {
      const a = this.elem.offsetLeft - this.x;
      const b = this.elem.offsetTop - this.y;
      if ((this.elem.style.left == 0 || this.elem.style.left == workingWidth) &&
          (this.elem.style.top == 0 || this.elem.style.top == workingHeight)) {
      }
      const c = Math.sqrt(Math.pow(a,2)+Math.pow(b,2))
      this.elem.style.transitionDuration = `${c/80}s`
      this.elem.style.top = `${this.y}px`;
      this.elem.style.left = `${this.x}px`;
    }
    flipAngle() {
      if (this.x == 0 && this.y == 0) {
        this.angle = Math.PI / 4
      } else if (this.x == 0 && this.y == workingHeight) {
        this.angle = Math.PI * 7 / 4
      } else if (this.x == workingWidth && this.y == 0) {
        this.angle = Math.PI * 3 / 4
      } else if (this.x == workingWidth && this.y == workingHeight) {
        this.angle = Math.PI * 5 / 4
      } else if (this.x == 0 || this.x == workingWidth) {
        this.angle = (Math.PI * 3 - this.angle) % ( 2 * Math.PI);
      } else {
        this.angle = Math.PI * 2 - this.angle;
      }
    }
    getIntersection() {
      let res;
      if (this.angle == 0) {
        res = [workingWidth, this.y];
      } else if (this.angle == Math.PI/2) {
        res = [this.x, workingHeight];
      } else if (this.angle == Math.PI) {
        res = [0, this.y];
      } else if (this.angle == Math.PI * 1.5) {
        res = [this.x, 0];
      } else {
        const m = Math.tan(this.angle)
        const n = this.y - m * this.x
        if (this.angle < Math.PI/2) {
          const yIntersection = m * workingWidth + n;
          if (yIntersection < workingHeight) {
            res = [workingWidth, yIntersection]
          } else {
            res = [(workingHeight-n) / m, workingHeight]
          }
        } else if (this.angle < Math.PI) {
          if (n < workingHeight) {
            res = [0, n]
          } else {
            res = [(workingHeight-n)/m, workingHeight]
          }
        } else if (this.angle < Math.PI * 1.5) {
          if (n > 0) {
            res = [0, n]
          } else {
            res = [-n/m, 0]
          }
        } else {
          const yIntersection = m * workingWidth + n;
          if (yIntersection > 0) {
            res = [workingWidth, yIntersection]
          } else {
            res = [-n/m, 0]
          }
        }
      }
      this.x = Math.floor(res[0])
      this.y = Math.floor(res[1])
    }
    updatePosition() {
      this.getIntersection();
      this.setPosition();
    }
  }

  const circleElems = document.querySelectorAll(".circle");
  const circles = [...circleElems].map(c => new Circle(c));
  const container = document.querySelector("#container");
  const circleD = circles[0].elem.offsetWidth;
  let contWidth;
  let contHeight;
  let workingWidth;
  let workingHeight;

  const set_dimentions = () => {
    contWidth = container.offsetWidth;
    contHeight = container.offsetHeight;
    workingWidth = contWidth - circleD;
    workingHeight = contHeight - circleD;
  };

  // start
  set_dimentions();
  circles.forEach(c => {
    c.y = Math.random() * workingHeight;
    c.x = Math.random() * workingWidth;
    c.setPosition();
    c.elem.addEventListener('transitionend', (e) => {
      if (c.x == c.elem.offsetLeft && c.y == c.elem.offsetTop) {
        c.flipAngle()
        c.updatePosition()
      }
    });
    setTimeout(
      () => {
        c.updatePosition()
      });
  });
  window.addEventListener('resize', () => {
    set_dimentions();
    circles.map(c => {
      c.updatePosition()
    });
  });

};
