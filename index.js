const objd = {
    bind() {
        console.log('bind')
    },
    update(value) {
        console.log('update' + value)
    },
    unbind() {
        console.log('unbind')
    }
}

// 注册全局指令
MiniVue.directive('my-directive', objd)

MiniVue.mixin({
    methods: {
        mix() {
            console.log('一个测试函数')
        }
    }
})

const obj = {
    props: ['name'],
    data() {
        return {
            content: '这是一个子组件'
        }
    },
    directives: {
        'my-directive': objd
    },
    template: '\
                <div class="blog-post">\
                    <p @click="test">{{content}}</p>\
                    <p>{{name.a.msg}}</p>\
                    <slot name="header"></slot>\
                    <p v-my-directive="content">新指令</p>\
                    <slot></slot>\
                </div>',
    methods: {
        test() {
            this.$emit('send', 'haha')
        }
    }
}


MiniVue.filter('endding', function(value) {
    return value + ' endding'
})

const MyPlugin = {}

MyPlugin.install = function (MiniVue, options) {
      // 1. 添加全局方法或属性
      MiniVue.myGlobalMethod = function () {
          console.log('这是一个插件')
      }

      // 2. 添加全局资源
        MiniVue.directive('my-plugin', {
            bind() {
                console.log('这是一个插件指令')
            },
            update(value) {
                console.log('新插件' + value)
            },
            unbind() {
                console.log('unbind')
            }
        })
    }

MiniVue.use(MyPlugin)

const vm = new MiniVue({
    el: '#app',
    data: {
        newAge: 20,
        age: 18,
        name: '小马',
        obj: {
            a: {
                msg: 'abc'
            }
        },
        select: ['v1', 2, 3, 4],
        pick: '',
        checkedNames: [],
        address: ['中国', '天津', '南开'],
        html: '<span style="color:red">这是一段v-html</span>',
        show: 'a',
        newAddress: ['银河', '太阳', '地球'],
        if: true
    },
    // 五个生命周期函数
    init() {
        console.log('init')
    },
    created() {
        console.log('created')
    },
    beforeCompile() {
        console.log('beforeCompile')
    },
    compiled() {
        console.log('compiled')
    },
    destroyed() {
        console.log('destroyed')
    },
    directives: {
        'my-directive': objd
    },
    methods: {
        increase() {
            this.age++
        },
        reset() {
            this.address = ['中国', '天津', '南开']
        },
        sayHi() {
            console.log('父组件有一个自己的sayHi方法')
        },
        sayTest(msg) {
            console.log('hi, '  + msg)
        }
    },
    computed: {
        comTest() {
            return this.age + ' ' + this.name
        }
    },
    filters: {
        capitalize(value) {
            if (!value) {
                return ''
            }
            value = value.toString()
            return value.charAt(0).toUpperCase() + value.slice(1)
        }
    },
    components: {
        'my-component': obj
    },
    mixin: {
        methods: {
            newMixin() {
                console.log('newMixin')
            }
        }
    },
    computed: {
        comTest() {
            return this.age + ' ' + this.name
        }
    }
})
