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
        <div class="text-h5 text-primary text-bold">Important Open Tasks</div>
      </div>
      <div v-for="task in openTasks" :key="task.id" class="col-4">
        <q-card class="shadow-0 border">
          <q-card-section>
            <q-btn @click="$router.push(`/project/${task.projectId}`)" size="sm" noCaps color="secondary" outline class="q-mb-sm">{{task.projectName}}</q-btn>
            <div class="text-body2 q-my-sm">{{ task.name }}</div>
            <div class="row items-center q-gutter-sm">
              <q-avatar size="2rem">
                <img :src="'users/'+task.owner + '.jpg'" style="object-fit: cover" />
              </q-avatar>
              <div class="text-caption">{{ daysRemaining(task.deadline) }}</div>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>
    <div class="row q-col-gutter-sm q-mt-lg">
      <div class="col-12">
        <div class="text-h5 text-primary text-bold">History</div>
      </div>
      <div v-for="(log, index) in logs" :key="index" class="col-12">
        <q-card class="shadow-0 border">
          <q-card-section class="q-pa-sm">
            <div class="row items-center q-col-gutter-sm justify-between">
              <div class="col-2 row items-center">
                <q-avatar size="2rem">
                <img :src="'users/'+log.user + '.jpg'" style="object-fit: cover" />
              </q-avatar>
              <div class="q-ml-sm text-caption text-bold">{{ global.userDetail(log.user).firstName }} {{ global.userDetail(log.user).lastName }} </div>
              </div>
              <div class="col-3 text-caption">{{ log.text }}</div>
              <div class="col-2 text-caption">{{ new Date(log.date).toLocaleString('default', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }) }}</div>
              <div class="col-3 text-right">
                <q-btn @click="$router.push(`/project/${log.projectId}`)" size="sm" noCaps color="primary" outline class="q-mb-sm">{{log.projectName}}</q-btn>
              </div>

            </div>
          </q-card-section>
        </q-card>
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
    global() {
      return {
        userDetail: global.userDetail,
      };
    },
    sortedProjects() {
      return global.projects.slice().sort((a, b) => {
        const dateA = new Date(a.startDate);
        const dateB = new Date(b.startDate);
        return dateA - dateB;
      });
    },
    openAssignedTasks() {
      return global.projects.flatMap(project =>
        project.tasks.map(task => ({
          ...task,
          projectId: project.id,
          projectName: project.name
        }))
      )
      .filter(task => task.status === 'pending' && task.owner === auth.user.id)
      .sort((a, b) => new Date(a.deadline) - new Date(b.deadline));
    },
    openTasks() {
      return global.projects.flatMap(project =>
        project.tasks.map(task => ({
          ...task,
          projectId: project.id,
          projectName: project.name
        }))
      )
      .filter(task => task.status === 'pending')
      .sort((a, b) => new Date(a.deadline) - new Date(b.deadline));
    },
    logs() {
      return global.logs.map(log => ({
          ...log,
        }))
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
