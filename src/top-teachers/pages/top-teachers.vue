<template>
  <v-container>
    <h1 class="font-weight-bold py-4">TOP Teachers</h1>
    <v-card class="mx-auto">
      <h1 class="mb-1 pa-7 font-weight-bold white--text indigo accent-4">
        Teacher TOP: {{this.topTeachers[0].firstName}} {{this.topTeachers[0].lastName}}
      </h1>
      <v-container>
        <v-row>
          <v-col cols="2" class="pl-10">
            <v-img
                src="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/apple/285/man-teacher_1f468-200d-1f3eb.png"
                height="130px"
                width="130px"
                class="teacher-img"
            ></v-img>
          </v-col>

          <v-col cols="10">
            <div>Actual progress</div>
            <div class="pb-4 pt-2">
              <v-row class="d-flex justify-center align-center">
                <v-col cols="1" class="pr-0">
                  <p class="font-weight-bold my-0">45%</p>
                </v-col>
                <v-col cols="11" class="pl-0">
                  <v-progress-linear value="45" height="25" class="rounded-pill" color="indigo accent-4" striped></v-progress-linear>
                </v-col>
              </v-row>
            </div>
            <div>Actual points</div>
            <div class="font-weight-bold">
              <h3>{{this.topTeachers[0].point}} points</h3>
            </div>
          </v-col>
        </v-row>
      </v-container>

    </v-card>

    <v-container class="mt-5"></v-container>

    <h2 class="font-weight-bold">Score of the other teachers</h2>
    <v-card v-for="topTeacher in topTeachers" :key="topTeacher.id" class="mx-auto mt-5 mb-5">
      <v-list-item>
        <figure class="mr-4">
          <v-icon>mdi-clipboard-outline</v-icon>
        </figure>
        <v-list-item-content class="mt-3">
          <p class="text--primary"> <strong> Teacher:</strong> {{topTeacher.firstName}}</p>
          <p>Score obtained</p>
        </v-list-item-content>
        <v-spacer></v-spacer>
        <h2 class="font-weight-bold">{{topTeacher.point}} Pts.</h2>
      </v-list-item>
    </v-card>
  </v-container>
</template>

<script>
import TopTeachersService from '../../top-teachers/services/top-teachers.service';

export default {
  name: "top-teachers",
  data: () => ({
    topTeachers: []
  }),
  created() {
    TopTeachersService.getAll()
        .then((response) => {
          this.topTeachers = response.data.map(this.getDisplayTopTeachers);
          this.topTeachers.sort(((a, b) => a.points - b.points)).reverse();
          console.log("Order: ",this.topTeachers);
        })
        .catch(e => {
          console.log(e);
        });
  },
  methods: {
    getDisplayTopTeachers(topteacher){
      return {
        id: topteacher.id,
        point: topteacher.point,
        firstName: topteacher.firstName,
        lastName: topteacher.lastName,
        age: topteacher.age,
        email: topteacher.email,
        phone: topteacher.phone,
        directorId: topteacher.directorId
      };
    }
  }
}
</script>

<style scoped>

.teacher-profile-name {
  background-color: #2C53C9;
}
.teacher-img {
  border-radius: 50%;
}

</style>