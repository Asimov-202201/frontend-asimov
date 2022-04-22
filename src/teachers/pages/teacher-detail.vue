<template>
  <div class="teacher-detail">
    <v-container class="pt-6">
      <v-row>
        <v-col cols="8">
          <h1 class="font-weight-bold pb-3">Teacher information</h1>
          <v-card class="mx-auto" max-height="230" min-height="150">
            <v-card-title class="mb-1 indigo accent-4 font-weight-bold white--text">
              {{teacher.firstName}} {{teacher.lastName}}
            </v-card-title>
            <v-card-text class="text--primary mt-3">
                <strong>Personal information:</strong><br>
              <v-row>
                <v-col cols="2" class="font-weight-bold">
                  - Name(s):     <br>
                  - Last name:   <br>
                  - Age:         <br>
                  - Email:       <br>
                  - Phone:       <br>
                </v-col>
                <v-col cols="10">
                  {{teacher.firstName}} <br>
                  {{teacher.lastName}}  <br>
                  {{teacher.age}}       <br>
                  {{teacher.email}}     <br>
                  {{teacher.phone}}     <br>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>

        <v-col cols="4" class="pl-15">
          <h1 class="font-weight-bold pb-3">Teacher progress</h1>
          <v-card class="mx-auto pa-5" min-height="150">
            <p class="display-3 font-weight-bold">{{ this.value }}%</p>
              <v-progress-linear
                  class="rounded-pill"
                  color="indigo accent-4"
                  height="25"
                  v-bind:value="this.value"
                  striped
              ></v-progress-linear>
          </v-card>
        </v-col>
      </v-row>

      <v-row class="pt-4">
        <v-col cols="12">
          <h1 class="font-weight-bold pb-3">Point for progress</h1>
          <v-card class="mx-auto mb-3">
            <v-container>
              <v-row>
                <div class="d-flex justify-start align-center ml-5 mr-3">
                  <v-icon>mdi-check-bold</v-icon>
                </div>
                <v-col>
                  <div>This teacher</div>
                  <p class="text--primary font-weight-bold mb-1">Points earned</p>
                </v-col>
                <v-col class="d-flex justify-center align-center">
                  <v-chip outlined rounded color="green darken-1" class="font-weight-bold">
                    {{ teacher.point }} Points
                  </v-chip>
                </v-col>
              </v-row>
            </v-container>
          </v-card>
          <h1 class="font-weight-bold py-3">Courses in progress and completed</h1>
          <v-card v-for="course in courses" :key="course.id" class="mx-auto mb-3">
            <v-container>
              <v-row>
                <div class="d-flex justify-start align-center ml-5 mr-3">
                  <v-icon>mdi-file-document-outline</v-icon>
                </div>
                <v-col>
                  <div>Course</div>
                  <p class="text--primary font-weight-bold mb-1">{{ course.name }}</p>
                  <div class="text--secondary">{{ course.description }}</div>
                </v-col>
                <v-col class="d-flex justify-center align-center">
                  <v-btn v-if="course.state==true" outlined rounded color="green darken-1" class="font-weight-bold">
                    Completed
                  </v-btn>
                  <v-btn v-else outlined rounded color="red darken-1" class="font-weight-bold">
                    Incomplete
                  </v-btn>
                </v-col>
              </v-row>
            </v-container>
          </v-card>
        </v-col>

      </v-row>
    </v-container>
  </div>
</template>

<script>
import TeachersService from '../services/teachers.service'

export default {
  name: "teacher-detail",
  data: () => ({
    value: '',
    teacher: {
      id: '',
      point: '',
      firstName: '',
      lastName: '',
      age: '',
      email:'',
      phone:'',
      directorId: ''
    },
    courses: [],
    competences: [
      'Mathematical Reasoning',
      'Assertiveness',
      'Critical thinking',
      'Grammar',
      'Mathematical design',
      'Creativity',
      'Logic',
    ],
  }),
  created() {
    this.refreshDataTeacher();
    this.refreshCoursesByTeacher();
  },
  updated() {
    this.changeValueProgress();
  },
  methods: {
    refreshDataTeacher(){
      TeachersService.getById(this.$route.params.id)
          .then((response) => {
            this.teacher = response.data;
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });
    },
    refreshCoursesByTeacher(){
      TeachersService.getAllCoursesById(this.$route.params.id)
        .then((response) => {
            this.courses = response.data.map(this.getDisplayCourse);
            console.log("List of courses: ",response.data);
        })
        .catch(e => {
          console.log("Error: ", e);
        });
    },
    getDisplayCourse(course){
      return {
        id: course.id,
        name: course.name,
        description: course.description,
        state: course.state,
      }
    },
    changeValueProgress(){
      let countComplete = 0;
      let total = this.courses.length;
      for (let i = 0; i < this.courses.length; i++) {
        if(this.courses[i].state == true){
          countComplete = countComplete + 1;
        }
      }
      this.value = (countComplete/total)*100;
    }
  }
}
</script>

<style scoped>

</style>