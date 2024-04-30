<template>
  <q-page class="q-ma-lg">
    <div v-if="project">
      <div>
        <ProjectsCard :project="project" :bgGradient="true" />
      </div>
      <div>
        <p class="text-h6">Participants</p>
      </div>
    </div>
    <div v-else>
      <q-spinner color="primary" />
      <div>Loading project details...</div>
    </div>
  </q-page>
</template>

<script>
import { useGlobalStore } from "stores/global";
const global = useGlobalStore();
import ProjectsCard from 'components/ProjectsCard.vue';
export default {
  name: 'ProjectPage',
  components: {
    ProjectsCard
  },
  data() {
    return {
      project: null
    };
  },
  computed: {
    global() {
      return {
        projects: global.projects,
        current: global.current
      };
    },
  },
  mounted() {
    this.global.current.page = "Project"
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
    },
    fetchProjectById(id) {
      console.log(id)
      console.log(this.global.projects)
      return this.global.projects.find(p => p.id === id);
    }
  },
  watch: {
    '$route.params.id': {
      immediate: true,
      handler(newId) {
        this.project = this.fetchProjectById(newId);
      }
    }
  }
};
</script>
