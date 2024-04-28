<template>
  <q-page class="q-ma-lg">
    <div class="row q-col-gutter-lg">
      <div class="col-12">
        <div class="text-h5">Upcoming Projects</div>
      </div>
      <div v-for="entry in sortedProjects" :key="entry.id" class="col-4">
        <q-card class="bg-gradient-primary-accent shadow-0">
          <div style="position: absolute; top: 1rem; right: 1rem;z-index:9">
            <q-btn @click="$router.push(`/project/${entry.id}`)" flat noCaps>Open</q-btn>
          </div>
          <q-card-section>
            <q-card-section>
              <p class="text-body1 text-bold" style="min-height: 48px;">{{ entry.name }}</p>
              <div class="text-caption" style="min-height: 40px;"><span class="text-bold">Quận 1</span>, {{ entry.location }}</div>
            </q-card-section>
            <q-card-section class="row justify-between q-py-none">
              <div class="text-caption">{{ new Date(entry.startDate).toLocaleString('default', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }) }}</div>
              <div class="text-caption">{{ daysRemaining(entry.endDate) }}</div>
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
    <div class="row q-col-gutter-lg">
        <div class="col-12">
          <div class="text-h5">Needs your Attention</div>
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
