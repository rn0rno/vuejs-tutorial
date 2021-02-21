<template>
<div>
<label v-for="label in options">
  <input type="radio" v-model="current_option" :value="label.value">
  {{ label.label }}
</label>

<p> {{ computedTodos.length }}件を表示中 </p>

<table>
  <thead>
    <tr>
      <th class="id">ID</th>
      <th class="comment">コメント</th>
      <th class="state">状態</th>
      <th class="button">-</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="item in computedTodos" v-bind:key="item.id">
      <th v-text="item.id"></th>
      <td v-text="item.comment"></td>
      <td class="state">
        <button @click="doChangeState(item)">{{ labels[item.state] }}</button>
      </td>
      <td class="button">
        <button @click="doRemove(item)">削除</button>
      </td>
    </tr>
  </tbody>
</table>

<h2>新しい作業の追加</h2>

<form class="add-form" @submit.prevent="doAdd">
  コメント <input type="text" ref="comment">
  <button type="submit">追加</button>
</form>
</div>
</template>

<script>
var STORAGE_KEY = 'todos-vuejs-demo'
var todoStorage = {
  fetch: function() {
    var todos = JSON.parse(
      localStorage.getItem(STORAGE_KEY) || '[]'
    )
    todos.forEach(function(todo, index) {
      todo.id = index
    })
    todoStorage.uid = todos.length
    return todos
  },
  save: function(todos) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
  }
}

export default {
  created() {
    this.todos = todoStorage.fetch();
  },
  data() {
    return {
      todos: [],
      options: [
        { value: -1, label: 'すべて' },
        { value: 0, label: '作業中' },
        { value: 1, label: '完了' },
      ],
      current_option: -1,
    }
  },
  watch: {
    todos: {
      handler: function(todos) {
        todoStorage.save(todos)
      },
      deep: true,
    }
  },
  computed: {
    computedTodos: function() {
      return this.todos.filter(function(el) {
        return this.current_option < 0 ? true : this.current_option === el.state
      }, this)
    },
    labels() {
      return this.options.reduce(function(a, b) {
        return Object.assign(a, { [b.value]: b.label })
      }, {})
    }
  },
  methods: {
    doAdd(event, value) {
      var comment = this.$refs.comment
      if (!comment.value.length) {
        return
      }

      this.todos.push({
        id: todoStorage.uid++,
        comment: comment.value,
        state: 0
      })
      comment.value = ''
    },
    doChangeState(item) {
      item.state = item.state ? 0: 1;
    },
    doRemove(item) {
      var index = this.todos.indexOf(item);
      this.todos.splice(index, 1)
    }
  }
}
</script>

<style scoped>
.center {
  color: red;
}
</style>
