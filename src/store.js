import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        components: []
    },
    mutations: {
        components: (state, payload) => {
            state.components = [...state.components, payload]
        },
        delComponent: (state, payload) => {
            state.components = payload
        }
    },
    actions: {
        delComponent({
            commit,
            state: {
                components
            }
        }, id) {
            console.log(2, id)
            commit('delComponent', components.filter(item => item.id !== id))
        }
    }
});