<template>
  <q-page class="q-mx-xl q-mt-lg">
    <div class="row q-col-gutter-lg">
      <div class="col-12">
        <div class="text-h5 text-primary text-bold">Upcoming Projects</div>
      </div>
      <div v-for="(entry, index) in sortedProjects" :key="entry.id" class="col-6">
        <ProjectsCard :project="entry" :bgGradient="index === 0" />
      </div>
    </div>
    <div class="row q-col-gutter-lg q-mt-lg">
      <div class="col-12">
        <div class="text-h5 text-primary text-bold">Your Tasks</div>
      </div>
      <div v-for="task in openTasks" :key="task.id">
        {{ task.name }}
        <q-btn @click="$router.push(`/project/${task.project}`)" flat noCaps>View</q-btn>
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue';
import ProjectsCard from 'components/ProjectsCard.vue';
import { useGlobalStore } from "stores/global";
const global = useGlobalStore();
import { useAuthStore } from "stores/auth";
const auth = useAuthStore();
export default defineComponent({
  name: 'IndexPage',
  components: {
    ProjectsCard
  },
  async created() {
    await global.loadData();
  },
  computed: {
    sortedProjects() {
      return global.projects.slice().sort((a, b) => {
        const dateA = new Date(a.startDate);
        const dateB = new Date(b.startDate);
        return dateA - dateB;
      });
    },
    openTasks() {
      return global.projects.flatMap(project =>
        project.tasks.map(task => ({
          ...task,
          project: project.id
        }))
      )
      .filter(task => task.status === 'pending' && task.owner === auth.user.id)
      .sort((a, b) => new Date(a.deadline) - new Date(b.deadline));
    }
  },
  methods: {
    taskProgressLabel(project) {
      if (!project || !project.tasks) {
        return 'No tasks';
      }
      const totalTasks = project.tasks.length;
      const completedTasks = project.tasks.filter(task => task.status === 'done').length;
      return `${completedTasks}/${totalTasks} Tasks Completed`;
    },
    taskProgressValue(project) {
      if (!project || !project.tasks) {
        return 0; // No tasks available
      }
      const totalTasks = project.tasks.length;
      const completedTasks = project.tasks.filter(task => task.status === 'done').length;
      return completedTasks / totalTasks;
    },
    daysRemaining(endDate) {
      const now = new Date();
      const end = new Date(endDate);
      const timeDiff = end - now;
      const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
      if (days < 0) {
        return `${Math.abs(days)} Days ago`;
      }
      return `${days} Days remaining`;
    }
  }
});
</script>
