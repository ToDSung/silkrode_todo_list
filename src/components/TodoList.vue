<template>
  <h1 class="title text-3xl text-center	my-5"> 
    THINGS TODO 
  </h1>

  <div
    class="todo grid grid-cols-1 gap-4 px-1 max-w-lg mx-auto"
  >
    <div class="todo__item flex items-center">
      <input 
        v-model="newTodoContent" 
        type="text" 
        class="
          todo__text-field w-full rounded-md bg-gray-100 border-transparent 
          focus:border-gray-500 focus:bg-white focus:ring-0
          mr-2
        "
        placeholder="Add Todo"
      >
      <template v-if="isEditStatus">
        <button 
          class="btn" 
          @click="modifyTodo"
        >
          Edit
        </button>
        <button 
          class="btn" 
          @click="cancelModifyTodo"
        >
          Cancel
        </button>
      </template>
      <button 
        v-else 
        class="btn" 
        @click="addTodo"
      >
        Add
      </button>
    </div>

    <div
      v-for="(todo, index) in todoList" 
      :key="index" 
      class="todo__item flex items-center"
    >
      <input 
        :id="index" 
        v-model="todo.status"
        class="todo__checkbox h-6 w-6 rounded bg-gray-200 border-transparent 
          focus:border-transparent focus:bg-green-200 text-green-700 
          focus:ring-1 focus:ring-offset-2 focus:ring-gray-500
        "
        type="checkbox" 
      >
      <label 
        class="todo__label ml-2 text-left flex-grow	font-semibold"
        :class="[
          todo.status ? finishClass : '',
        ]"
        :for="index"
      >
        {{ todo.content }}
      </label>
      <button 
        class="btn"
        @click="toggleModifyTodo(index)"
      >
        Edit
      </button>
      <button 
        class="btn"
        @click="deleteTodo(index)"
      >
        Delete
      </button>
    </div>
  </div>
</template>

<script>
import { ref, toRef, toRefs, computed } from 'vue'

export default {
  setup() {
    const todoList = ref([
      {
        status: false,
        content: 'Work'
      },
      {
        status: true,
        content: 'Exercise'
      },
    ])
    
    const newTodoContent = ref('')
    const indexPrepareToModify = ref(-1)
    const isEditStatus = computed(() => indexPrepareToModify.value >= 0)

    const finishClass = 'line-through text-gray-400'
    
    const addTodo = () => {
      if (!newTodoContent.value) return alert('Need todo content')
    
      todoList.value = [
        ...todoList.value,
        {
          status: false,
          content: newTodoContent.value
        }
      ]
      newTodoContent.value = ''
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
        todoList.value = newTodoList
        newTodoContent.value = ''
        indexPrepareToModify.value = -1
      }
    }

    const cancelModifyTodo = () => {
      indexPrepareToModify.value = -1
      newTodoContent.value = ''
    }
    
    const deleteTodo = (indexToDelete) => {
      todoList.value = todoList.value.filter((todo, index) => index !== indexToDelete)
    }

    return {
      newTodoContent,
      isEditStatus,
      todoList,
      finishClass,
      addTodo,
      toggleModifyTodo,
      modifyTodo,
      cancelModifyTodo,
      deleteTodo,
    }
  }
}

</script>

<style lang="scss" scoped>

.btn {
  min-width: 5rem;
  @apply bg-green-500 hover:bg-green-700 text-white font-bold mx-2 py-2 px-4 rounded-xl;
}
</style>
