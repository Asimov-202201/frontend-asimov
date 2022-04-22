<template>
  <div class="log-in mt-15 pt-15">
    <v-container class="mt-5 px-4">
      <v-row>
        <v-col cols="12" align="center">
          <v-hover>
            <template v-slot:default="{ hover }">
              <v-card max-width="400" :class="`elevation-${hover ? 24 : 3}`" class="transition-swing" >
            <v-card-title class="justify-center font-weight-bold mb-2">Log In</v-card-title>

            <v-card-text class="pb-0">
              <v-form ref="form" v-model="valid" lazy-validation>
                <v-text-field
                    v-model="email"
                    :rules="emailRules"
                    label="E-mail"
                    placeholder="example@mail.com"
                    required outlined
                >
                  <template v-slot:append>
                    <v-tooltip bottom>
                      <template v-slot:activator="{ on }">
                        <v-icon v-on="on">mdi-email-outline</v-icon>
                      </template>
                      Write here the email you registered
                    </v-tooltip>
                  </template>
                </v-text-field>
                <v-text-field
                    v-model="password"
                    :rules="passwordRules"
                    label="Password"
                    placeholder="*******"
                    type="password"
                    required outlined
                >
                  <template v-slot:append>
                    <v-tooltip bottom>
                      <template v-slot:activator="{ on }">
                        <v-icon v-on="on">mdi-key-outline</v-icon>
                      </template>
                      Your password is not displayed
                    </v-tooltip>
                  </template>
                </v-text-field>
                <v-radio-group v-model="typeUser"
                               class="pa-0 ma-0 ml-2 mb-1"
                               :rules="radioRules"
                               row required>
                  <v-radio
                      label="Director"
                      value="director"
                  ></v-radio>
                  <v-radio
                      label="Teacher"
                      value="teacher"
                  ></v-radio>
                  <template v-slot:append>
                    <v-tooltip bottom>
                      <template v-slot:activator="{ on }">
                        <v-icon v-on="on" class="mr-3">mdi-help-circle-outline</v-icon>
                      </template>
                      Type of user
                    </v-tooltip>
                  </template>
                </v-radio-group>
              </v-form>
            </v-card-text>

            <v-divider></v-divider>

            <v-card-actions>
              <v-btn color="error"
                     class="font-weight-bold"
                     text @click="reset">
                Reset Form
              </v-btn>
              <v-spacer></v-spacer>
              <v-btn :disabled="!valid"
                     class="font-weight-bold"
                     color="indigo accent-4"
                     text @click="submit">
                Submit
              </v-btn>
            </v-card-actions>
          </v-card>
            </template>
          </v-hover>
        </v-col>
      </v-row>
    </v-container>
    <v-snackbar v-model="snackbar" color="error" dark>
      {{ text }}
      <template v-slot:action="{ attrs }">
        <v-btn text v-bind="attrs" @click="snackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
import AuthService from '@/log-in/services/log-in.service'
import router from "@/router";

export default {
  name: "log-in",
  data: () => ({
    snackbar: false,
    text: '',
    typeUser: "",
    password: null,
    formHasErrors: false,
    valid: true,
    passwordRules: [
      v => !!v || 'Password is required',
    ],
    radioRules: [
      v => !!v || 'Type user is required',
    ],
    email: '',
    emailRules: [
      v => !!v || 'E-mail is required',
      v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
    ],
  }),
  mounted() {
    this.$store.dispatch('changeAuthenticatedFalseAction')
    if(localStorage.getItem('user')){
        router.push('/')
    }
  },
  methods: {
    submit () {
      this.$refs.form.validate()
      let val = this.$refs.form.validate();
      let val2 = this.typeUser;
      console.log(val);
      console.log(val2);

      if(val){
        const user = {
          email: this.email,
          password: this.password,
        };

        AuthService.login(user,val2)
            .then(response => {
              if (response.data.token) {
                localStorage.setItem('user', JSON.stringify(response.data));
                localStorage.setItem('typeUser', val2);
                this.$store.dispatch('changeAuthenticatedTrueAction')
                router.push('/')
              }
              console.log(response);
            })
            .catch(e => {
              this.snackbar = true;
              this.text = 'Wrong username or password';
              console.log(e);
            });
        console.log("The user is: ", user);

        this.reset()
      }
    },
    reset () {
      this.$refs.form.reset()
    }
  },
}
</script>

<style scoped>

</style>