// 创建型：工厂模式
// 工厂模式即将创建对象的过程单独封装
function User(name, age, career, work) {
  this.name = name
  this.age = age
  this.career = career
  this.work = work
}
function Factory (name, age, career) {
  let work = []
  switch (career) {
    case 'coder':
      work = ['写代码', '写系分', '修Bug']
      break;
    case 'productManager':
      work = ['订会议室', '写PRD', '催更']
      break;
    case 'boss':
      work = ['喝茶', '看报', '见客户']
      break;
  }
  return new User(name, age, career, work)
}

console.log(Factory('小明', 25, 'coder'));

// 抽象工厂模式
// 抽象工厂是围绕一个超级工厂创建其他工厂，该超级工厂又称为其他工厂的工厂
class MobilePhoneFactory {
  createOs() {
    throw new Error('抽象工厂方法不允许直接调用，你需要将我重写！')
  }
  createHardWare() {
    throw new Error('抽象工厂方法不允许直接调用，你需要将我重写！')
  }
}
// 具体工厂继承抽象工厂
class SumSungFactory extends MobilePhoneFactory {
  createOs() {
    return new AndroidOS()
  }
  createHardWare() {
    return new SumSungHardWare()
  }
}

class Os {
  controlHardWare() {
    throw new Error('抽象产品方法不允许直接调用，你需要将我重写！')
  }
}

class AndroidOs extends Os {
  controlHardWare () {
    console.log('我会用安卓的方式去操作系统')
  }
}

class AppleOs extends Os {
  controlHardWare () {
    console.log('我会用苹果的方式去操作系统')
  }
}

class HardWare {
  operateByOrder () {
    throw new Error('抽象产品方法不允许直接调用，你需要将我重写！')
  }
}

class QualcommHardWare extends HardWare {
  operateByOrder () {
    console.log('我会用高通的方式去运转')
  }
}

class SumSungHardWare extends HardWare {
  operateByOrder () {
    console.log('我会用三星的方式去运转')
  }
}

const myPhone = new SumSungFactory()
const myOs = myPhone.createOs()
const myHardWare = myPhone.createHardWare()
myyOs.controlHardWare()
