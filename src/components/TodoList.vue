<template>
  <h1 class="title"> THINGS TODO </h1>

  <div class="todo">
    <input 
      v-model="newTodoContent" 
      class="todo__text-field"
      placeholder="Add Todo"
    >
    <button v-if="isEditStatus" @click="modifyTodo">
      Edit
    </button>
    <button v-else @click="addTodo">
      Add
    </button>
  </div>

  <div
    v-for="(todo, index) in todoList" 
    :key="index" 
    class="todo"
  >
    <input 
      class="todo__checkbox"
      type="checkbox" 
      :id="index" 
      v-model="todo.status"
    >
    <label 
      class="todo__label"
      :for="index"
    >
      {{ todo.content }}
    </label>
    <button @click="toggleModifyTodo(index)">
      Edit
    </button>
    <button @click="deleteTodo(index)">
      Delete
    </button>
  </div>
</template>

<script>
import { ref, toRef, toRefs, computed } from 'vue'

export default {
  setup() {
    const todoList = ref([
      {
        status: false,
        content: 1
      },
      {
        status: true,
        content: 2
      },
    ])
    
    const newTodoContent = ref('')
    const indexPrepareToModify = ref(-1)
    const isEditStatus = computed(() => indexPrepareToModify.value >= 0)
    
    const addTodo = () => {
      if (!newTodoContent.value) return alert('Need todo content')
    
      todoList.value = [
        ...todoList.value,
        {
          status: false,
          content: newTodoContent.value
        }
      ]
    }
    
    const toggleModifyTodo = (indexToModify) => {
      indexPrepareToModify.value = indexToModify
      newTodoContent.value = todoList.value.find((todo, index) => index === indexToModify).content
    }
    
    const modifyTodo = () => {
      if (isEditStatus.value) {
        const newTodoList = todoList.value.map((todo, index) => {
          if (index === indexPrepareToModify.value) {
            // 研究解構賦的 ref 會怎麼樣
            return {
              ...todo,
              content: newTodoContent.value
            }
          }
    
          return todo
        })
        newTodoContent.value = ''
        indexPrepareToModify.value = -1
        return todoList.value = newTodoList
      }
    }
    
    const deleteTodo = (indexToDelete) => {
      todoList.value = todoList.value.filter((todo, index) => index !== indexToDelete)
    }

    return {
      newTodoContent,
      isEditStatus,
      todoList,
      addTodo,
      toggleModifyTodo,
      modifyTodo,
      deleteTodo,
    }
  }
}

</script>

<style scoped>
.todo {
  display: flex;
  align-items: center;
  margin: 0 auto;
  max-width: 24rem;
}

.todo__label {
  text-align: left;
  flex-grow: 1;
}

.todo__text-field {
  flex-grow: 1;
}

button {
  border-radius: 1rem;
  margin: .25rem;
  padding: .25rem .5rem;
  min-width: 4rem;
}
</style>
