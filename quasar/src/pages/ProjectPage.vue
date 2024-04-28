<template>
  <q-page class="q-ma-lg">
    <div v-if="project">
      <div>
        <q-card class="bg-gradient-primary-accent shadow-0">
          <q-card-section>
            <q-card-section>
              <p class="text-body1 text-bold" style="min-height: 48px;">{{ project.name }}</p>
              <div class="text-subtitle1">{{ project.description }}</div>
              <div class="text-caption" style="min-height: 40px;"><span class="text-bold">Quận 1</span>, {{ project.location }}</div>
            </q-card-section>
            <q-card-section class="row justify-between q-py-none">
              <div class="text-caption">{{ new Date(project.startDate).toLocaleString('default', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }) }}</div>
              <div class="text-caption">{{ daysRemaining(project.endDate) }}</div>
            </q-card-section>
            <q-card-section class="row justify-between q-py-none">
              <div class="text-caption">Status: Waiting for Approval</div>
              <div class="text-caption">Total Progress</div>
              <q-linear-progress rounded size="24px" :value="0.8" color="primary" class="q-mt-sm">
                <div class="absolute-full flex flex-center">
                  <q-badge color="transparent" text-color="white" label="8/10 Tasks" />
                </div>
              </q-linear-progress>
            </q-card-section>
          </q-card-section>
        </q-card>
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

export default {
  name: 'ProjectPage',
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
