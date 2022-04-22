import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {

        authenticated: true
    },
    mutations: {
        changeAuthenticatedTrue ( state ) {
            state.authenticated = true
        },
        changeAuthenticatedFalse ( state ) {
            state.authenticated = false
        }
    },
    actions: {
        changeAuthenticatedTrueAction ( context ) {
            context.commit('changeAuthenticatedTrue');
        },
        changeAuthenticatedFalseAction ( context ) {
            context.commit('changeAuthenticatedFalse');
        }
    }
})