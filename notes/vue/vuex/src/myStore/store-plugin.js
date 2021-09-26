export const install = {
    install(app, options) {
        app.mixin({
            created() {
                console.log(app)
                console.log(options)
                console.log(this)
                debugger
                if (this.$options.store) {
                    _Vue.prototype.store = this.$options.store
                }
            }
        })
    }
}