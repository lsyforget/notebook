class Publisher {
  constructor() {
    this.observers = []
    console.log('Publisher created')
  }
  add(observer) {
    this.observers.push(observer)
  }
  remove(observer) {
    this.observers.forEach((item, i) => {
      if(item === observer) {
        this.observers.splice(i, 1)
      }
    })
  }
  notify() {
    console.log('Publisher.notify invoked')
    this.observers.forEach(observer => {
      observer.update(this)
    })
  }
}

class Observer {
  constructor() {
    console.log('Observer created')
  }
  update() {
    console.log('Observer.update invoked')
  }
}

class PrdPublishser extends Publisher {
  constructor() {
    super()
    this.prdState = null
    this.observers = []
    console.log('PrdPublishser created')
  }
  getState() {
    console.log('PrdPublishser.getState invoked')
    return this.prdState
  }
  setState(state) {
    console.log('PrdPublishser.setState invoked')
    this.prdState = state
    this.notify()
  }
}

const subject = new PrdPublishser()
const observer = new Observer()
subject.add(observer)
subject.setState(1)