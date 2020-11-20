function ssh() {
  function onload() {
    const size = {
      height: 300,
      width: 300,
    };
    const position = {
      x: 0,
      y: 0,
    };
    const pet = document.createElement('div');
	const otherPet = document.createElement('div');
	const button = document.createElement("button");
	button.innerHTML = "JOIN ZOOM";
    updatePosition(1030, 450);
    pet.classList.add('ssh-pet');
	pet.classList.add('ssh-pet.alert');
	button.classList.add('button');
	
	button.addEventListener("click", joinZoom);

    document.body.appendChild(pet);
	document.body.appendChild(otherPet);
	document.body.appendChild(button);

    scheduleSomething();
    watchMouse();

	//pet.classList.add('alert');

    function animateRest() {
	  console.log("printed");
      return animateClass('rest');
    }

	function joinZoom() {
		window.open("https://ucmerced.zoom.us/j/94586704466?pwd=V05vb3lDZGthaHVvQTVLS3dPd0I2QT09", '_blank');
	}

    function watchMouse() {
      pet.addEventListener('mousemove', async event => {
        if (!animating) {
          animating = true;
          await shiftAway();
          animating = false;
        }
      });
      const buttons = document.querySelectorAll('button, input[type="submit"], [role="button"]');
      buttons.forEach(button =>
        button.addEventListener('mousemove', mouseMove)
      );
    }

    function mouseMove(event) {
      debounceByElement(event.currentTarget, removeTheElement, 600, event.currentTarget);
    }

    function scheduleSomething() {
      setTimeout(async () => {
        const choices = 10;
        const random = ~~(Math.random() * choices);
        await doSomething(random);
        scheduleSomething();
      }, 800 + Math.random() * 1000);
    }

    function offsetPosition(x, y) {
      updatePosition(position.x + x, position.y + y);
    }
    function updatePosition(x, y) {
      pet.style.left = (position.x = x) + 'px';
      pet.style.top = (position.y = y) + 'px';
    }
    function onPet(x, y) {
      return within(
        x,
        y,
        position.x + size.width / 2,
        position.y + size.height / 2,
        size.width,
        size.height
      );
    }
    function within(x, y, cx, cy, w, h) {
      return x >= cx - w && x <= cx + w && y >= cy - h && y < cy + h;
    }
    function within_2(x, y, cx, cy, w, h) {
      return x >= cx && x <= cx + w && y >= cy && y < cy + h;
    }
    function debounce(fn, timeout = 200) {
      let _id;
      return function(...args) {
        clearTimeout(_id);
        _id = setTimeout(() => {
          fn(...args);
          _id = null;
        }, timeout);
      };
    }
    const _debounceMap = new Map();
    function debounceByElement(elem, fn, timeout, ...args) {
      if (!_debounceMap.has(elem)) {
        _debounceMap.set(elem, debounce(fn, timeout));
      }
      _debounceMap.get(elem)(...args);
    }

    function leftSideOf(elem, outer) {
      const { x, y, width, height } = elem.getBoundingClientRect();
      const to_x =
        x - size.width + (outer ? -marginLeft(elem) : paddingLeft(elem));
      const to_y = y + height / 2 - size.height / 2;
      if (position.x !== to_x || position.y !== to_y) {
        return [to_x, to_y];
      }
    }

    function paddingLeft(elem) {
      return (
        Number(
          window
            .getComputedStyle(elem)
            .getPropertyValue('padding-left')
            .replace(/px|r?em/, '')
        ) || 0
      );
    }

    function marginLeft(elem) {
      return (
        Number(
          window
            .getComputedStyle(elem)
            .getPropertyValue('margin-left')
            .replace(/px|r?em/, '')
        ) || 0
      );
    }
    function timeout(time) {
      return new Promise(resolve => setTimeout(resolve, time));
    }
  }
  window.addEventListener('load', onload);
}

let script = document.createElement('script');
script.type = 'text/javascript';
script.text = `(${ssh.toString()})()`;
script.onload = function() {
  this.parentNode.removeChild(this);
};
(document.head || document.documentElement).appendChild(script);
