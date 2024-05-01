<template>
  <div>
    <q-card :class="bgGradient ? 'bg-gradient-primary-accent' : 'bg-grey-1'" class="shadow-0 border">
      <div style="position: absolute; top: 1rem; right: 1rem;z-index:9">
        <q-btn @click="$router.push(`/project/${project.id}`)" flat noCaps>:</q-btn>
      </div>
      <q-card-section>
        <q-card-section>
          <p class="text-body1 text-bold q-mb-sm" style="min-height: 48px;">{{ project.name }}</p>
          <div class="text-caption" style="min-height: 40px;"><span class="text-bold">Quận 1</span>, {{ project.location }}</div>
        </q-card-section>
        <q-card-section class="row justify-between q-py-none">
          <div class="text-caption text-bold">Waiting for Approval</div>
          <div class="text-caption text-bold">{{ daysRemaining(project.endDate) }}</div>
          <div class="text-caption">{{ new Date(project.startDate).toLocaleString('default', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }) }}</div>

        </q-card-section>
        <q-card-section class="row justify-between q-py-none">
          <q-linear-progress v-if="project.tasks" rounded size="24px" :value="taskProgressValue(project)" color="primary" class="q-mt-sm">
            <div class="absolute-full flex flex-center">
              <q-badge color="transparent" text-color="white" :label="taskProgressLabel(project)" class="text-shadow" />
            </div>
          </q-linear-progress>
        </q-card-section>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import { useGlobalStore } from "stores/global";
const global = useGlobalStore();

export default {
  props: {
    project: {
      type: Object,
      required: true
    },
    bgGradient: Boolean
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
        return 0;
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
  },
};
</script>
