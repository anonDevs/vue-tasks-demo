<template>
  <div class="bg-gray-600 text-white text-xl p-3 mt-2 flex">
    {{ task.name }}
    <button
      @click="$emit('edit-task', task)"
      class="bg-yellow-400 ml-auto text-black px-3"
    >
      Edit
    </button>
    <button
    @click="$emit('delete-task', task._id)"
     class="bg-red-400 ml-4 text-black px-3">Delete</button>
  </div>
</template>

<script>
export default {
  name: "Task",
  props: ["task"],
};
</script>

<style>
</style>