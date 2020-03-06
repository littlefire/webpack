<template>
  <div class="main-todo">
    <input
      type="text"
      class="add-todo"
      placeholder="what to do?"
      autofocus
      v-model="content"
      @keyup.enter="addTodo"
    />
    <todo-item v-for="(item, index) in filterData" :key="index" :todo="item" @del="handleDeleteItem"></todo-item>
    <todo-info :total="total" @toggleState="handleToggleState" @clearCompleted="handleClear"></todo-info>
  </div>
</template>
<script>
import TodoItem from "./TodoItem.vue"
import TodoInfo from "./TodoInfo.vue"
export default {
    name: "MainTodo",
    components: {
      TodoItem,
      TodoInfo
    },
    data () {
        return {
            todoData: [],
            content: '',
            total: 0,
            filter: 'all'
        }
    },
    watch: {
        todoData: {
            deep: true,
            handler() {
            this.total = this.todoData.filter(
                item => item.completed == false
            ).length
            }
        }
    },
    computed: {
     filterData() {
       console.log(this.filter)
        switch (this.filter) {
          case 'all':
            this.total = this.todoData.length
            return this.todoData
            break
          case 'active':
            let newTodoData = this.todoData.filter(item => item.completed == false)
            this.total = newTodoData.length
            return newTodoData
            break
          case 'completed':
            let newData = this.todoData.filter(item => item.completed == true)
            this.total = newData.length
            return newData
            break
        }
      }
    },  
    methods: {
      addTodo() {
        if (this.content === '') return

        this.todoData.unshift({
          id: 2,
          content: this.content,
          completed: false
        })

        this.content = ''
      },
      handleDeleteItem(id) {
        this.todoData.splice(
          this.todoData.findIndex(item => item.id === id),
          1
        )
      },
      handleToggleState(state) {
        this.filter = state
      },
      handleClear() {
        this.todoData = this.todoData.filter(item => item.completed == false)
      }
    },
}
</script>
<style lang="stylus" scoped>
.main-todo
  margin: 0 auto
  width: 600px
  background-color: #fff
  box-shadow: 0 0 5px #666

  .add-todo
    padding: 16px 16px 16px 36px
    width: 100%
    font-size: 24px
    font-family: inherit
    font-weight: inherit
    color: inherit
    border: none
    outline: none
    box-sizing: border-box
</style>