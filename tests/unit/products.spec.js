import { expect } from 'chai'
import { shallowMount, createLocalVue } from '@vue/test-utils'
import dummyStore from './mocks/store'
import vuex from "vuex"

import Products from '@/components/Products.vue'

const localVue = createLocalVue()
localVue.use(vuex)
const store = new vuex.Store(dummyStore)

describe('Products.vue', () => {
  it('Muestra el titulo "Nuestros Productos"', () => {
    const title = 'Nuestros Productos'
    const wrapper = shallowMount(Products, {})
    expect(wrapper.text()).to.include(title)
  }),
    it('Muestra los productos', () => {
      const productName = 'Computadora'
      const wrapper = shallowMount(Products, {})
      wrapper.vm.products = [{
        name: 'Computadora',
        price: 100.0,
        qty: 1,
      }]
      expect(wrapper.text()).to.include(productName)
    }),
    it('Filtra los productos', () => {
      const productName = 'Computadora'
      const productSearch = 'Teclado'
      const wrapper = shallowMount(Products, {})
      const searchBox = wrapper.find('input')
      wrapper.vm.products = [{
        name: 'Computadora',
        price: 100.0,
        qty: 1,
      }]
      searchBox.setValue(productSearch)
      expect(wrapper.text()).to.not.include(productName)
    }),
    it('Encuentra los Productos', () => {
      const productName = 'Computadora'
      const wrapper = shallowMount(Products, {})
      const searchBox = wrapper.find('input')
      wrapper.vm.products = [{
        name: 'Computadora',
        price: 100.0,
        qty: 1,
      },
      {
        name: 'Teclado',
        price: 100.0,
        qty: 1,
      }]
      searchBox.setValue(productName)
      expect(wrapper.text()).to.include(productName)
      expect(wrapper.text()).to.not.include('Teclado')
    }),
    it('Añade los productos al carro', () => {
      

      const wrapper = shallowMount(Products, {store, localVue })
      
      wrapper.vm.products = [{
        name: 'Computadora',
        price: 100.0,
        qty: 1,
      }]
     
      const addButton = wrapper.find('.card .button')
      addButton.trigger('click')
      expect(store.state.shoppingCart.total).to.equal(100)
    })

})
