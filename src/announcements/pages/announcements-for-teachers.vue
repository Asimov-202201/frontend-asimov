<template>
  <div class="announcements-for-teachers">
    <v-container class="mt-4">
      <v-row>
        <v-col cols="12">
          <h1>Announcements for teachers</h1>
        </v-col>
        <v-col cols="12" class="py-0">
          <div v-for="announcement in announcements" :key="announcement.id">
            <v-card class="mx-auto my-3 mx-2" elevation="1">
              <v-card-title><v-icon class="mr-3">mdi-human-queue</v-icon>
                {{announcement.title}}</v-card-title>
              <v-container class="d-flex justify-space-between pt-1 pb-3 px-4 align-center">
                <p class="mb-0">{{announcement.description}}</p>
              </v-container>
            </v-card>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import AnnouncementsService from '@/announcements/services/announcements.service';

export default {
  name: "announcements-for-teachers",
  data: () => ({
    announcements: [],
    id: '',
    title: '',
    description: ''
  }),
  created() {
    this.refreshList()
  },
  methods: {
    getDisplayAnnouncement(announcement) {
      return {
        id: announcement.id,
        title: announcement.title,
        description: announcement.description
      };
    },
    refreshList() {
      let user = JSON.parse(localStorage.getItem('user'))
      AnnouncementsService.getAllByID(user.directorId)
          .then((response) => {
            this.announcements = response.data.map(this.getDisplayAnnouncement);
            console.log(response.data);
          })
    }
  }
}
</script>

<style scoped>

</style>