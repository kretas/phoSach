<template>
  <q-page class="q-mx-xl q-mt-lg">
    <div class="row q-col-gutter-lg">
      <div class="col-12">
        <div class="text-h5 text-primary text-bold">Upcoming Projects</div>
      </div>
      <div v-for="(entry, index) in sortedProjects" :key="entry.id" class="col-6">
        <q-card :class="index === 0 ? 'bg-gradient-primary-accent' : 'bg-grey-1'" class="shadow-0 border">
          <div style="position: absolute; top: 1rem; right: 1rem;z-index:9">
            <q-btn @click="$router.push(`/project/${entry.id}`)" flat noCaps>:</q-btn>
          </div>
          <q-card-section>
            <q-card-section>
              <p class="text-body1 text-bold q-mb-sm" style="min-height: 48px;">{{ entry.name }}</p>
              <div class="text-caption" style="min-height: 40px;"><span class="text-bold">Quận 1</span>, {{ entry.location }}</div>
            </q-card-section>
            <q-card-section class="row justify-between q-py-none">
              <div class="text-caption text-bold">Waiting for Approval</div>
              <div class="text-caption text-bold">{{ daysRemaining(entry.endDate) }}</div>
              <div class="text-caption">{{ new Date(entry.startDate).toLocaleString('default', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }) }}</div>

            </q-card-section>
            <q-card-section class="row justify-between q-py-none">
              <q-linear-progress v-if="entry.tasks" rounded size="24px" :value="taskProgressValue(entry)" color="primary" class="q-mt-sm">
                <div class="absolute-full flex flex-center">
                  <q-badge color="transparent" text-color="white" :label="taskProgressLabel(entry)" class="text-shadow" />
                </div>
              </q-linear-progress>
            </q-card-section>
          </q-card-section>
        </q-card>
      </div>
    </div>
    <div class="row q-col-gutter-lg q-mt-lg">
      <div class="col-12">
        <div class="text-h5 text-primary text-bold">Your Tasks</div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue';
import { useGlobalStore } from "stores/global";
const global = useGlobalStore();
export default defineComponent({
  name: 'IndexPage',
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
