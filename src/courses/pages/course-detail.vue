<template>
  <div class="course-detail">
    <v-container>
      <v-row class="pt-4">
        <v-col cols="8">
          <h1 class="font-weight-bold pb-3">Course information</h1>
          <v-card class="mx-auto" max-height="170" min-height="150">
            <v-card-title class="mb-1 indigo accent-4 font-weight-bold white--text">
              {{course.name}}
            </v-card-title>
            <v-card-text class="text--primary mt-3">
              <strong>Description:</strong>
              <p class="text-justify mb-0">{{course.description}}</p>
            </v-card-text>
          </v-card>
        </v-col>

        <v-col cols="4" class="pl-15">
          <h1 class="font-weight-bold pb-3">Course progress</h1>
          <v-card class="mx-auto pa-5" min-height="150">
            <p class="display-3 font-weight-bold">{{ this.valueBarProgress }} %</p>
              <v-progress-linear
                  class="rounded-pill"
                  color="indigo accent-4"
                  height="25"
                  v-bind:value="this.valueBarProgress"
                  striped
              ></v-progress-linear>
          </v-card>
        </v-col>
      </v-row>

      <v-row class="pt-4">
        <v-col cols="8">
          <h1 class="font-weight-bold pb-3">Course Items</h1>

          <v-dialog persistent v-if="dialog" v-model=itemSelect width="720">
            <v-card>
              <v-card-title class="grey lighten-2 font-weight-bold">
                {{ itemSelect.name }}
              </v-card-title>
              <v-divider></v-divider>

              <div v-if="itemSelect.name == 'Video'" class="d-flex justify-center align-center py-3">
                <iframe width="560" height="315" v-bind:src="itemSelect.value"
                        title="YouTube video player" frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowfullscreen></iframe>
              </div>
              <p v-else class="d-flex justify-start align-center pt-5 pb-3 px-7 text-justify">
                {{itemSelect.value}}
              </p>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn text color="red accent-4" class="font-weight-bold" @click="cancelDialog">
                  Cancel
                </v-btn>
                <v-btn text color="indigo accent-4" class="font-weight-bold" @click="changeStateItem(itemSelect.id)">
                  Completed
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>

          <v-card v-for="item in items" :key="item.id" class="mx-auto mb-3">
            <v-container>
              <v-row>
                <v-col>
                  <div>Item</div>
                  <p class="text--primary font-weight-bold mb-1">{{ item.name }}</p>
                  <div class="text--secondary  text-truncate" style="max-width: 450px;">{{ item.value }}</div>
                </v-col>
                <v-col class="d-flex justify-center align-center">
                  <v-btn outlined rounded color="indigo accent-4" class="font-weight-bold" @click.stop="openDialog(item)">
                    {{ item.name }}
                  </v-btn>
                </v-col>
              </v-row>
            </v-container>
          </v-card>
        </v-col>

        <v-col cols="4" class="pl-15">
          <h1 class="font-weight-bold pb-3">Competences includes</h1>
          <v-card class="d-flex mx-auto px-5 align-center" min-height="150">
            <div>
              <v-chip-group class="py-3" column>
                <v-chip outlined v-for="competence in competences" :key="competence">
                  {{ competence.title }}
                </v-chip>
              </v-chip-group>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import CoursesService from '../services/courses.service'
import ItemsService from '../services/items.service'

export default {
  name: "course-detail",
  data: () => ({
    dialog: false,
    items: [],
    valueBarProgress: 0,
    competences: [],
    id: '',
    name: '',
    description: '',
    idCourse: '',
    course: {
      id: '',
      name: '',
      description: ''
    },
    itemSelect: {
      id: '',
      name: '',
      value: '',
      state: '',
      courseId: '',
    }
  }),
  created() {
    this.SelectCourse();
    this.refreshList();
    this.refreshListCompetences();
  },
  updated() {
    this.changeValueProgress();
  },
  methods: {
    SelectCourse(){
      CoursesService.getById(this.$route.params.id)
          .then((response) => {
            this.course = response.data;
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });
    },
    refreshList(){
      CoursesService.getByIdCourse(this.$route.params.id)
          .then((response) => {
            this.items = response.data.map(this.getDisplayItem);
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });
    },
    refreshListCompetences(){
      CoursesService.getCompetencesByIdCourse(this.$route.params.id)
        .then((response) => {
          this.competences = response.data;
          console.log(response.data)
        })
    },
    getDisplayItem(item){
      return {
        id: item.id,
        name: item.name,
        value: item.value,
        state: item.state,
        courseId: item.courseId,
      };
    },
    openDialog(data){
      this.itemSelect = data,
      this.dialog=true
    },
    cancelDialog(){
      this.dialog=false
    },
    changeStateItem(id){
      this.itemSelect.state = true,
      ItemsService.update(id, this.itemSelect)
          .catch(e => {
            console.log(e);
          }),
      console.log("Change state", this.itemSelect.id),
      this.dialog=false
    },
    changeStateCourse(){
      this.course.state = true,
          CoursesService.updateCourse(this.course.id, this.course)
              .catch(e => {
                console.log(e);
              }),
          console.log("Change state", this.course.name)
    },
    validateStateCourse(){
      let val = 100 - this.valueBarProgress;
      if(this.valueBarProgress >= 99) {
        this.changeStateCourse();
      }
      else
        console.log(val,"% missing to complete the course")
    },
    changeValueProgress(){
      let countComplete = 0;
      let total = this.items.length;
      for (let i = 0; i < this.items.length; i++) {
        if(this.items[i].state == true){
          countComplete = countComplete + 1;
        }
      }
      this.valueBarProgress = Math.round((countComplete/total)*100);
      this.validateStateCourse();
    }
  }
}
</script>

<style scoped>

</style>