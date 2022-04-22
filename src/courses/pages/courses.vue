<template>
  <div class="courses">
    <v-row class="pt-4">
      <v-col cols="12" class="pb-0">
        <h1 class="pl-5">Courses</h1>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <div class="d-flex flex-wrap justify-center mb-8">
          <v-card v-for="course in courses" :key="course.id" class="pb-2 ma-3" width="290" max-height="450">
            <div class="indigo accent-3">
              <v-card-subtitle class="pb-0 white--text">
                Course
              </v-card-subtitle>
              <v-card-title class="pb-1 pt-0 white--text font-weight-bold">
                {{course.name}}
              </v-card-title>
            </div>
            <v-card-text class="text-justify pb-1 text--secondary text-truncate">
              <strong>Description:</strong> {{course.description}}
            </v-card-text>
            <v-card-actions>
              <v-btn text color="indigo accent-4" class="font-weight-bold te" :to="`/courses/${course.id}`">see more</v-btn>
            </v-card-actions>
          </v-card>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import CoursesService from '@/courses/services/courses.service';

export default {
  name: "courses",
  data: () => ({
    courses: [],
    id: '',
    name: '',
    description: '',
  }),
  created() {
    this.refreshList()
  },
  methods: {
    getDisplayCourse(course){
      return {
        id: course.id,
        name: course.name,
        description: course.description
      };
    },
    refreshList (){
      CoursesService.getAll()
          .then((response) => {
            this.courses = response.data.map(this.getDisplayCourse);
            console.log(response.data);
          })
    },
  }
}
</script>

<style scoped>

</style>