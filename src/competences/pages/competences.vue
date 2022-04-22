<template>
  <div class="competences">
    <v-row class="pt-4">
      <v-col cols="12" class="pb-0">
        <h1 class="pl-5">Competences</h1>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" class="pt-1">
        <div class="d-flex flex-column justify-center mb-8">
          <v-card v-for="competence in competences" :key="competence.id" class="pb-2 ma-3" max-height="450">
            <div class="indigo accent-3">
              <v-card-subtitle class="pb-0 white--text">
                Competence
              </v-card-subtitle>
              <v-card-title class="pb-1 pt-0 white--text">
                {{competence.title}}
              </v-card-title>
            </div>
            <v-card-text class="text-justify pb-1 text--secondary">
              <strong>Concept: </strong>{{competence.description}}
            </v-card-text>
          </v-card>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import CompetencesService from '@/competences/services/competences.service';

export default {
  name: "competences",
  data: () => ({
    competences: [],
    id: '',
    title: '',
    description: '',
  }),
  created() {
    this.refreshList()
  },
  methods: {
    getDisplayCompetence(competence){
      return {
        id: competence.id,
        title: competence.title,
        description: competence.description,
      };
    },
    refreshList (){
      CompetencesService.getAll()
          .then((response) => {
            this.competences = response.data.map(this.getDisplayCompetence);
            console.log(response.data);
          })
    },
  }
}
</script>

<style scoped>

</style>