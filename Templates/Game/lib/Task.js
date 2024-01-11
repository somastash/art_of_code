let state = {
  KILL: 100,
  DEAD: 101,
  DONE: 102,
  PAUSE: 103,
  ACTIVE: 104,
  DELAYED: 105,
};
class Task {
  constructor(span, fn) {
    this.fn = fn;
    this._span = span;
    this._delay = 0;
    this.time = 0;
    this.state = {
      curr: state.ACTIVE,
      next: 0,
    };
    this.nextTask = null;
    this._name = '';
  }
  name(str) {
    this._name = str;
    return this;
  }
  update() {
    let done = false;

    switch (this.state.curr) {
     case state.DELAYED:
      this._delay--;
      if (this._delay <= 0) {
        this.state.next = state.ACTIVE;
      }
      break;
     case state.ACTIVE:
      this.fn(this);
      this.time++;
      if (this._span > 0 && this.time >= this._span) {
        this.state.next = state.DONE;
      }
      break;
    }

    if (this.state.next) {
      this.state.curr = this.state.next;
      this.state.next = 0;

      switch (this.state.curr) {
       case state.DONE:
        if (this.nextTask) { // chain
          this.fn = this.nextTask.fn;
          this.time = this.nextTask.time;
          this._span = this.nextTask._span;
          this._delay = this.nextTask._delay;
          this.state = this.nextTask.state;
          this.nextTask = this.nextTask.nextTask;
        } else {
          done = true;
        }
        break;
       case state.KILL:
        done = true;
        break;
      }
    }
    return done;
  }
  span(time) {
    this._span = time;
    return this;
  }
  delay(time) {
    this._delay = time;
    return this;
  }
  pause() {
    if (this.state.curr != state.ACTIVE) return warn(`task is not ACTIVE`);
    this.state.next = state.PAUSE;
  }
  resume() {
    if (this.state.curr != state.PAUSE) return warn(`task is not PAUSE`);
    this.state.next = state.ACTIVE;
  }
  done() {
    this.state.next = state.DONE;
  }
  kill() {
    this.state.next = state.KILL;
  }
  then(...args) {
    if (this.nextTask) return this.nextTask.then(...args);
    this.nextTask = new Task(...args);
    return this.nextTask;
  }
}

class TaskMan {
  constructor() {
    this.tasks = [];
    this.nTasks = 0;
    this.rooms = [];
    this.que = [];
  }
  kill() {
    for (let i = 0; i < this.tasks.length; i++) {
      this.tasks[i].kill();
    }
  }
  add(...args) {
    let t = new Task(...args);
    this.que.push(t);
    return t;
  }
  flush() {
    if (!this.que.length) return;
    if (this.rooms.length) {
      for (let i = 0; i < this.que.length; i++) this.tasks[this.rooms.pop()] = this.que[i];
    } else {
      for (let i = 0; i < this.que.length; i++) this.tasks.push(this.que[i]);
    }
    this.nTasks += this.que.length;
    this.que.length = 0;
  }
  update() {
    let t;
    for (let i = 0; i < this.tasks.length; i++) {
      t = this.tasks[i];
      if (t.update()) {
        this.rooms.push(i);
        this.nTasks--;
      }
    }
  }
  gc() {
    let t;
    for (let i = 0; i < this.tasks.length; i++) {
      t = this.tasks[i];
    }
  }
}
