import Vue from 'vue'
import VueParticles from 'vue-particles'

if (process.client) {
    Vue.use(VueParticles)
}