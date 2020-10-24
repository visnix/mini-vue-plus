import MiniVue from './src/main.js'

const vm = new MiniVue({
  el: '#app',
  data: {
      age: 18,
      name: '小明',
      obj: {
          a:1
      }
  },
  methods: {
      increase() {
          this.age++
      },
      sayHi() {
          console.log('say hi')
      }
  },
  watch: {
      age() {
          console.log('年龄变成了' + this.age)
      }
  }
})