export default class Section {
    constructor({ renderer, container }) {
      this._renderer = renderer;
      this._container = document.querySelector(container);
    }

    renderItems(renderingItems) {
      renderingItems.forEach((item) => this._renderer(item));
    }

    addItem(element, order = true) {
      if (order) {
        this._container.append(element);
      } else {
        this._container.prepend(element);
      }
    }
  }