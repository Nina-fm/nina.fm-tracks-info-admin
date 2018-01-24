import Vue from 'vue'
import Router from 'vue-router'
import MixtapeList from '@/components/MixtapeList'
import Mixtape from '@/components/Mixtape'
import AddMixtape from '@/components/AddMixtape'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/mixtapes/list'
    },
    {
    	path: '/mixtapes/list',
    	name: 'MixtapeList',
    	component: MixtapeList
    },
    {
      path: '/mixtape/add',
      name: 'AddMixtape',
      component: AddMixtape
    },
    {
      path: '/mixtape/:id',
      name: 'Mixtape',
      component: Mixtape
    }
  ]
});