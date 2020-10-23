<template>
  <div class="flex justify-center">
    <div>
      <form class="mt-10">
        <h3 class="text-xl font-bold mb-3">Add Task</h3>
        <input
          v-model="newTask.name"
          type="text"
          class="bg-gray-100 p-2"
          placeholder="Task Name"
        />
        <input
          @click.prevent="saveTask"
          type="submit"
          class="p-2 bg-yellow-400"
          value="Save"
        />
      </form>

      <form class="mt-10">
        <h3 class="text-xl font-bold mb-3">Edit Task</h3>
        <input
          :disabled="editingTask.id === ''"
          v-model="editingTask.name"
          type="text"
          class="bg-gray-100 p-2"
          placeholder="Task Name"
        />
        <input
          :class="{ 'bg-yellow-400': editingTask.name !== '' }"
          :disabled="editingTask.name === ''"
          @click.prevent="editTask"
          type="submit"
          class="p-2"
          value="Save"
        />
      </form>
    </div>
    <div class="self-start p-10 mt-10 ml-10 shadow w-3/4 bg-gray-100">
      <h1 class="text-4xl">Tasks</h1>
      <div v-if="tasks.length !== 0">
        <Task
          @edit-task="setEditTask"
          @delete-task="deleteTask"
          v-for="task in tasks"
          :key="task.id"
          :task="task"
        ></Task>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Task from "@/components/task.component";
export default {
  name: "Tasks",
  data() {
    return {
      newTask: {
        name: "",
      },
      editingTask: {
        name: "",
        id: "",
      },
      tasks: [],
    };
  },
  mounted() {
    this.getAllTasks();
  },
  methods: {
    //   Set the editing task
    setEditTask(payload) {
      this.editingTask = {
        name: payload.name,
        id: payload._id,
      };
    },
    // Clear both forms
    clearForms() {
      this.newTask = {
        name: "",
      };

      this.editingTask = {
        name: "",
        id: "",
      };
    },
    // Get all tasks from DB
    async getAllTasks() {
      try {
        const response = await axios.get("/api/tasks", {
          headers: {
            authorization: `bearer ${this.$store.state.token}`,
          },
        });
        console.log(response.data);
        this.tasks = response.data.tasks;
      } catch (e) {
        console.log(e);
      }
    },
    // Save task currently in newTasl var
    async saveTask() {
      try {
        console.log(this.newTask.name);
        const response = await axios.post(
          "/api/tasks/",
          { name: this.newTask.name },
          {
            headers: {
              authorization: `bearer ${this.$store.state.token}`,
            },
          }
        );
        if (response.status === 201) {
          this.getAllTasks();
          this.clearForms();
        }
      } catch (e) {
        console.log(e);
      }
    },
    // Save the task in the edit task form
    async editTask() {
      try {
        const response = await axios.patch(
          `/api/tasks/${this.editingTask.id}`,
          { name: this.editingTask.name },
          {
            headers: {
              authorization: `bearer ${this.$store.state.token}`,
            },
          }
        );
        if (response.status === 200) {
          this.clearForms();
          this.getAllTasks();
        }
      } catch (e) {
        console.log(e);
      }
    },
    // Delete a task
    async deleteTask(id) {
      try {
        const response = await axios.delete(`/api/tasks/${id}`, {
          headers: {
            authorization: `bearer ${this.$store.state.token}`,
          },
        });
        if (response.status === 200) {
          this.clearForms();
          this.getAllTasks();
        }
      } catch (e) {
        console.log(e);
      }
    },
  },
  components: {
    Task,
  },
};
</script>

<style>
</style>