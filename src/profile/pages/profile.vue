<template>
  <div class="profile ma-10">
    <h1 class="pl-5">Profile</h1>
    <v-card class="mx-5 mt-3">
      <div class="indigo accent-4">
        <v-card-title v-if="isTeacher" class="white--text font-weight-bold">Hello Teacher</v-card-title>
        <v-card-title v-else class="white--text font-weight-bold">Hello Director</v-card-title>
      </div>
      <v-row>
        <v-col cols="2" class="px-8 pt-8">
          <div class="pa-3">
            <v-img
                src="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/apple/285/man-teacher_1f468-200d-1f3eb.png"
                height="130px"
                width="130px"
                class="teacher-img"
            ></v-img>
          </div>
        </v-col>
        <v-col cols="10">
          <v-card-text>
            <h1 class="text--primary">Personal Information:</h1>
            <div class="text--primary pt-2">
              Name: {{user.firstName}}<br>
              Last Name: {{user.lastName}}<br>
              Age: {{user.age}}<br>
              Phone: {{user.phone}}<br>
              Email: {{user.email}}<br>
            </div>
          </v-card-text>
        </v-col>
      </v-row>
    </v-card>
    <h1 v-if="isTeacher" class="pl-5 pt-10">Points</h1>
    <v-card v-if="isTeacher" class="mx-5 mt-3">
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
              {{user.point}} Points
            </v-chip>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </div>
</template>

<script>
//import ProfileService from '../services/profile.service'

export default {
  name: "profile",
  data:()=>({
    typeUser: '',
    isTeacher: false,
    user: {},
    id: '',
    firstname: '',
    lastname: '',
    age: '',
    phone: '',
    point: 0,
    email: '',
  }),
  created() {
    this.user = JSON.parse(localStorage.getItem('user'))
    this.validate()
  },
  methods: {
    validate (){
      this.typeUser = localStorage.getItem('typeUser').toString()
      if (this.typeUser == "director")
        this.isTeacher = false
      else this.isTeacher = true
    },
  }
}
</script>

<style scoped>

</style>