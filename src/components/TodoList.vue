<template>
  <h1 class="title text-3xl text-center	my-5"> 
    THINGS TODO 
  </h1>

  <h2 class="title text-2xl text-center	my-5"
    role="todo-status "
  >
    {{ todoFinishStatusText }}
  </h2>

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
        role="text-field"
        placeholder="Add Todo"
      >
      <template v-if="isEditStatus">
        <button 
          class="btn" 
          role="modify-btn"
          @click="modifyTodo"
        >
          Modify
        </button>
        <button 
          class="btn"
          role="cancel-btn"
          @click="cancelModifyTodo"
        >
          Cancel
        </button>
      </template>
      <button 
        v-else 
        class="btn" 
        role="add-btn"
        @click="addTodo"
      >
        Add
      </button>
    </div>

    <div
      v-for="(todo) in todoList" 
      :key="todo.ID" 
      class="todo__item flex items-center"
    >
      <input 
        :id="todo.ID" 
        v-model="todo.status"
        class="todo__checkbox h-6 w-6 rounded bg-gray-200 border-transparent 
          focus:border-transparent focus:bg-green-200 text-green-700 
          focus:ring-1 focus:ring-offset-2 focus:ring-gray-500
        "
        type="checkbox" 
        role="checkbox"
      >
      <label 
        class="todo__label ml-2 text-left flex-grow	font-semibold"
        :class="[
          todo.status ? finishClass : '',
        ]"
        :for="todo.ID"
        role="label"
      >
        {{ todo.content }}
      </label>
      <button 
        class="btn"
        role="toggle-edit-btn"
        @click="toggleModifyTodo(todo.ID)"
      >
        Edit
      </button>
      <button 
        class="btn"
        role="delete-btn"
        @click="deleteTodo(todo.ID)"
      >
        Delete
      </button>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue'

export default {
  setup() {
    const todoList = ref([
      {
        ID: 0,
        status: false,
        content: 'Work'
      },
      {
        ID: 1,
        status: true,
        content: 'Exercise'
      },
    ])

    const todoFinishStatusText = computed(() => {
      const todoCountUnfinished = todoList.value.filter(({ status }) => !status).length
      if (todoCountUnfinished) return `You still have ${todoCountUnfinished} todo.`
      return 'You have already done all todo things！'
    })
    
    const newTodoContent = ref('')
    const idPrepareToModify = ref('')
    const finishClass = 'line-through text-gray-400'

    const isEditStatus = computed(() => idPrepareToModify.value !== '')

    const makeIdGenerator = () => {
      let latestTodoId = todoList.value.slice(-1)[0].ID
      return () =>  {
        latestTodoId += 1
        return latestTodoId
      }
    }
    const generateTodoId = makeIdGenerator()
    
    const addTodo = () => {
      if (!newTodoContent.value) return alert('Need todo content')
      
      todoList.value = [
        ...todoList.value,
        {
          ID: generateTodoId(),
          status: false,
          content: newTodoContent.value
        }
      ]
      newTodoContent.value = ''
    }
    
    const toggleModifyTodo = (idToModify) => {
      idPrepareToModify.value = idToModify
      newTodoContent.value = todoList.value.find(({ ID }) => ID === idToModify).content
    }
    
    const modifyTodo = () => {
      if (isEditStatus.value) {
        const newTodoList = todoList.value.map((todo) => {
          if (todo.ID === idPrepareToModify.value) {
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
        idPrepareToModify.value = ''
      }
    }

    const cancelModifyTodo = () => {
      idPrepareToModify.value = ''
      newTodoContent.value = ''
    }
    
    const deleteTodo = (idToDelete) => {
      todoList.value = todoList.value.filter(({ ID }) => ID !== idToDelete)
    }

    return {
      todoList,
      todoFinishStatusText,
      newTodoContent,
      isEditStatus,
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
