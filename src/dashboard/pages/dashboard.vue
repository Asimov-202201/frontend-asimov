<template>
  <div class="dashboard">
    <v-container>
      <h1 class="mb-2 pl-3 pt-4">Dashboard</h1>
      <v-row>
        <v-col cols="12" sm="6">
        <v-container>
            <v-row>
              <v-col cols="12">
                <h3 class="mb-2 pl-1">Features</h3>
                <v-card class="py-2 mb-3 pr-2">
                  <v-container>
                    <v-row class="d-flex justify-space-between" justify="space-between">
                      <v-col class="justify-start">
                        <v-card-title>¡Meet all your teachers!</v-card-title>
                        <v-card-text class="text-justify">You will meet all your teachers in detail in the teachers
                          section. You will see an ordered list with important information about the teachers in
                          your educational institution.
                        </v-card-text>
                        <v-card-actions v-if="typeUser=='director'" class="pl-4">
                          <v-btn color="indigo accent-4" outlined link to="/teachers">Let's go!</v-btn>
                        </v-card-actions>
                      </v-col>
                      <v-col class="justify-end">
                        <v-img class="graphics"
                               src="https://s9.gifyu.com/images/asimov-teachers.gif"
                               alt="asimov teachers" width="350">
                          <template v-slot:placeholder>
                            <v-row
                                class="fill-height ma-0"
                                align="center"
                                justify="center"
                            >
                              <v-progress-circular
                                  indeterminate
                                  color="grey lighten-5"
                              ></v-progress-circular>
                            </v-row>
                          </template>
                        </v-img>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card>
                <v-card class="py-2 mb-3 pr-2">
                  <v-container>
                    <v-row class="d-flex justify-space-between">
                      <v-col class="justify-start">
                        <v-card-title>Know your course progress</v-card-title>
                        <v-card-text class="text-justify">View in detail the description of the subject you are
                          studying and complete the items of it. Here you can also view the progress of which
                          sections are complete. You can also see the skills related to the course.
                        </v-card-text>
                        <v-card-actions v-if="typeUser=='teacher'" class="pl-4">
                          <v-btn outlined color="indigo accent-4" link to="/courses">Let's go!</v-btn>
                        </v-card-actions>
                      </v-col>
                      <v-col class="justify-end">
                        <v-img class="graphics"
                               src="https://s9.gifyu.com/images/asimov-courses.gif"
                               alt="asimov courses" width="350">
                          <template v-slot:placeholder>
                            <v-row
                                class="fill-height ma-0"
                                align="center"
                                justify="center"
                            >
                              <v-progress-circular
                                  indeterminate
                                  color="grey lighten-5"
                              ></v-progress-circular>
                            </v-row>
                          </template>
                        </v-img>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card>
              </v-col>
            </v-row>

          </v-container>
        </v-col>
        <v-col cols="12" sm="6">
        <v-container>
            <v-row>
              <v-col cols="12">
                <h3 class="mb-2 pl-1">School year progress</h3>
                <v-card class="mx-auto pa-5" max-height="150">
                  <v-container class="d-flex justify-space-between align-end pt-0">
                    <p class="display-3 font-weight-bold mb-0">{{this.valueProgress}}%</p>
                    <p class="mb-0">Days to end school year:  {{this.dateOut}}</p>
                  </v-container>
                  <v-progress-linear
                      class="rounded-pill"
                      color="indigo accent-4"
                      height="25"
                      v-bind:value="this.valueProgress"
                      striped
                  ></v-progress-linear>
                </v-card>
              </v-col>
              <v-col cols="12" v-if="typeUser=='teacher'">
                <h3 class="mb-2 pl-1">Profile</h3>
                <v-card class="py-2">
                  <v-container>
                    <v-row>
                      <div class="d-flex justify-start align-center ml-5 mr-3">
                        <v-icon>mdi-check-bold</v-icon>
                      </div>
                      <v-col>
                        <div>You</div>
                        <p class="text--primary font-weight-bold mb-1">Points earned</p>
                      </v-col>
                      <v-col class="d-flex justify-center align-center">
                        <v-chip outlined rounded color="green darken-1" class="font-weight-bold">
                          1250 Points
                        </v-chip>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card>
              </v-col>
              <v-col cols="12" align-self="end">
                <h3 class="mb-2 pl-1">Last announcements</h3>
                <v-card class="mb-3">
                  <v-card-title>{{ this.announcements[0].title }}</v-card-title>
                  <v-card-text>{{ this.announcements[0].description }}</v-card-text>
                </v-card>
                <v-card class="mb-3">
                  <v-card-title>{{ this.announcements[1].title }}</v-card-title>
                  <v-card-text>{{ this.announcements[1].description }}</v-card-text>
                </v-card>
              </v-col>
            </v-row>

        </v-container>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import DashboardService from "@/dashboard/services/dashboard.service";

export default {
  name: "dashboard",
  data: () => ({
    valueProgress: '',
    dateOut: '',
    announcements: [],
    id: '',
    title: '',
    description: '',
    typeUser: '',
  }),
  created() {
    this.setProgressDate(),
    this.typeUser = localStorage.getItem('typeUser')
    this.refreshList()
  },
  methods: {
    setProgressDate(){
      let dateStart = new Date(2022,2,20);
      let dateEnd = new Date(2022,11,10);
      let dateNow = new Date();
      let totalDays = dateEnd - dateStart;
      let daysProgress = dateNow - dateStart;
      this.dateOut = (totalDays) - daysProgress;
      this.dateOut = Math.trunc(this.dateOut/(8.64*10000000));
      this.valueProgress = Math.trunc((daysProgress*100)/totalDays);
    },
    getDisplayAnnouncement(announcement){
      return {
        id: announcement.id,
        title: announcement.title,
        description: announcement.description
      };
    },
    refreshList (){
      let user = JSON.parse(localStorage.getItem('user'));
      let valId;
      if(this.typeUser=='teacher'){
        valId = user.directorId;
      }
      if(this.typeUser=='director'){
        valId = user.id;
      }
      DashboardService.getAll(valId)
          .then((response) => {
            this.announcements = response.data.map(this.getDisplayAnnouncement);
            console.log(response.data);
          })
    },
  }
}
</script>

<style scoped>
.graphics {
  border-radius: 5px;
}
</style>