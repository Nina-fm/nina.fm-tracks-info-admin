import Vue from 'vue'
import Router from 'vue-router'
import MixtapeList from '@/components/MixtapeList'
import ViewMixtape from '@/components/ViewMixtape'
import AddEditMixtape from '@/components/AddEditMixtape'

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
      component: AddEditMixtape
    },
    {
      path: '/mixtape/:id/edit',
      name: 'EditMixtape',
      component: AddEditMixtape
    },
    {
      path: '/mixtape/:id',
      name: 'ViewMixtape',
      component: ViewMixtape
    }
  ]
});