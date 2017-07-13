'use strict'

class CommandQueue {
  constructor (stack = []) {
    this.stack = stack
    this.delay = CommandQueue.DELAY
  }

  push (action) {
    this.stack.push(action)
  }

  execute () {
    this._process()
  }

  _process () {
    const currentAction = this.stack.shift()

    if (!currentAction) {
      return
    }

    const currentActionAsyncWrap = () => {
      currentAction()
      this._process()
    }

    setTimeout(currentActionAsyncWrap, this.delay)
  }
}

CommandQueue.DELAY = 1000

module.exports = CommandQueue
