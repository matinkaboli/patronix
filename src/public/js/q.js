function $(el) {
  class QGen {
    constructor(el) {
      this.el = document.querySelector(el);
    }

    hide() {
      this.el.style.display = 'none';
    }

    show() {
      this.el.style.display = 'block';
    }

    append(child) {
      this.el.appendChild(child);
    }

    appendText(txt) {
      this.el.innerHTML += txt;
    }

    empty() {
      this.el.innerHTML = '';
    }

    attr(key, val) {
      if (val) {
        this.el.setAttribute(key, val);
      } else {
        return this.el.getAttribute(key);
      }
    }

    css(key, val) {
      if (val) {
        this.el.style[key] = val;
      } else {
        return this.el.style[key];
      }
    }

    get text() {
      return this.el.textContent;
    }

    get position() {
      return {
        l: this.el.offsetLeft,
        t: this.el.offsetTop
      };
    }

    prepend(child) {
      this.el.insertBefore(child, this.el.firstChild);
    }

    removeClass(cls) {
      this.el.classList.remove(cls);
    }

    addClass(cls) {
      this.el.classList.add(cls);
    }

    html(str = '') {
      this.el.innerHTML = str;
    }

    toggleClass(cls) {
      this.el.classList.toggle(cls);
    }

    off(e, fn) {
      this.el.removeEventListener(e, fn);
    }

    on(e, fn) {
      this.el.addEventListener(e, fn);
    }
  }

  let q = new QGen(el);

  return new Proxy(
    q,
    {
      get(target, name) {
        return name in target ? target[name] : target.el[name];
      }
    }
  );
}
