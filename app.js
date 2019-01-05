//import all modules
import Vue from 'vue'
import App from './src/App.vue';



// render all vue compoonents in index.html
new Vue({
    el: '#app',
    render: h => h(App)
})