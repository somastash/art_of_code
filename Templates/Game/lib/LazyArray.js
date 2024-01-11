class LazyArray {
  constructor(size = 0, limit = -1) {
    this._items = new Array(size);
    this._nItems = 0;
    this._rooms = new Array(size);
    this._nRooms = 0;
    this._limit = limit;
  }
  add(item) {
    if (this._limit >= 0 && this._nItems >= this._limit) {
      throw `exceeds limit`;
    }
    if (this._nRooms > 0) {

    }
    if (this._items.length <= this._nItems) {
      this._items.push(item);
    }
    this._nItems++;
  }
}