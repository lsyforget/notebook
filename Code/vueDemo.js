class Vue {
    constructor(options) {
        this.$options = options
        this._data = options.data
        this.initData()
    }
    initData () {
        let data = this._data
        let keys = Object.keys(data)
        keys.forEach(key => {
            Object.defineProperty(this, key , {
                enumerable: true,
                configurable: true,
                get: function proxyGetter () {
                    return data[key]
                },
                set: function proxySetter (value) {
                    data[key] = value
                    console.log('数据改变了');
                }
             })
        })
    }
}