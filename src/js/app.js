import Vue from 'vue'
import TodoApp from './components/todoapp'

const app = new Vue({
  el: '#app',
  render: h => h(TodoApp),
});
