<template>
<tr>
  <th v-text="item.id"></th>
  <td>
    <input type="text" v-model.lazy="item.comment" />
  </td>
  <td class="state">
    <button @click="$emit('doChangeState', item)">{{ labels[item.state] }}</button>
  </td>
  <td class="button">
    <button @click="$emit('doRemove', item)">削除</button>
  </td>
</tr>
</template>

<script>
export default {
  name: 'TodoTr',
  props: {
    item: Object,
  },
  computed: {
    labels() {
      return this.$parent.options.reduce(function(a, b) {
        return Object.assign(a, { [b.value]: b.label })
      }, {})
    }
  },
}
</script>
