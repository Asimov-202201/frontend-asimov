<template>
  <div class="sign-up">
    <v-container class="mt-5 px-4">
      <v-row>
        <v-col cols="12" align="center">
          <v-hover>
            <template v-slot:default="{ hover }">
              <v-card max-width="400" :class="`elevation-${hover ? 24 : 3}`" class="transition-swing" >
                <v-card-title class="justify-center font-weight-bold mb-2">Sign Up</v-card-title>

                <v-card-text class="pb-0">
                  <v-form ref="form" v-model="valid" lazy-validation>
                    <v-text-field
                        class="mb-2"
                        hide-details="auto"
                        v-model="firstName"
                        :rules="nameRules"
                        label="First name"
                        required outlined
                    >
                      <template v-slot:append>
                        <v-tooltip right>
                          <template v-slot:activator="{ on }">
                            <v-icon v-on="on">mdi-account-circle-outline</v-icon>
                          </template>
                          Write here your first name
                        </v-tooltip>
                      </template>
                    </v-text-field>
                    <v-text-field
                        class="mb-2"
                        hide-details="auto"
                        v-model="lastName"
                        :rules="nameRules"
                        label="Last name"
                        required outlined
                    >
                      <template v-slot:append>
                        <v-tooltip right>
                          <template v-slot:activator="{ on }">
                            <v-icon v-on="on">mdi-account-circle-outline</v-icon>
                          </template>
                          Write here your last name
                        </v-tooltip>
                      </template>
                    </v-text-field>
                    <v-text-field
                        class="mb-2"
                        hide-details="auto"
                        v-model="age"
                        :rules="ageRules"
                        type="number"
                        label="Age"
                        required outlined
                    >
                      <template v-slot:append>
                        <v-tooltip right>
                          <template v-slot:activator="{ on }">
                            <v-icon v-on="on">mdi-counter</v-icon>
                          </template>
                          Write your age here
                        </v-tooltip>
                      </template>
                    </v-text-field>
                    <v-text-field
                        class="mb-2"
                        hide-details="auto"
                        v-model="email"
                        :rules="emailRules"
                        label="E-mail"
                        placeholder="example@mail.com"
                        required outlined
                    >
                      <template v-slot:append>
                        <v-tooltip right>
                          <template v-slot:activator="{ on }">
                            <v-icon v-on="on">mdi-email-outline</v-icon>
                          </template>
                          Write here the email you registered
                        </v-tooltip>
                      </template>
                    </v-text-field>

                    <v-text-field
                        class="mb-2"
                        hide-details="auto"
                        v-model="password"
                        :rules="passwordRules"
                        label="Password"
                        placeholder="*******"
                        type="password"
                        required outlined
                    >
                      <template v-slot:append>
                        <v-tooltip right>
                          <template v-slot:activator="{ on }">
                            <v-icon v-on="on">mdi-key-outline</v-icon>
                          </template>
                          Your password is not displayed
                        </v-tooltip>
                      </template>
                    </v-text-field>
                    <v-text-field
                        class="mb-4"
                        hide-details="auto"
                        v-model="phone"
                        :rules="phoneRules"
                        type="number"
                        label="Phone number"
                        placeholder="999999999"
                        required outlined
                    >
                      <template v-slot:append>
                        <v-tooltip right>
                          <template v-slot:activator="{ on }">
                            <v-icon v-on="on">mdi-card-account-phone-outline</v-icon>
                          </template>
                          Write your number phone here
                        </v-tooltip>
                      </template>
                    </v-text-field>
                    <v-radio-group v-model="typeUser"
                                   class="pa-0 ma-0 ml-2 pt-2"
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
                        <v-tooltip right>
                          <template v-slot:activator="{ on }">
                            <v-icon v-on="on" class="mr-3">mdi-help-circle-outline</v-icon>
                          </template>
                          Type of user
                        </v-tooltip>
                      </template>
                    </v-radio-group>
                    <v-select
                        class="mb-4"
                        v-if="typeUser=='teacher'"
                        :items="items"
                        v-model="directorId"
                        label="Director of your institution"
                        outlined hide-details="auto"
                    ></v-select>
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
          <v-hover>
            <template v-slot:default="{ hover }">
              <v-card max-width="400" :class="`elevation-${hover ? 24 : 3}`" class="transition-swing mt-5 flex">
                <v-card-actions class="pl-5">
                  Login here
                  <v-spacer></v-spacer>
                  <v-btn text class="font-weight-bold"
                      color="indigo accent-4" to="/log-in">Here</v-btn>
                </v-card-actions>
              </v-card>
            </template>
          </v-hover>
        </v-col>
      </v-row>
    </v-container>
    <v-snackbar v-model="snackbar" :color=color dark>
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
import AuthService from "@/sign-up/services/sign-up.service";
import router from "@/router";

export default {
  name: "sign-up",
  data: () => ({
    firstName: '',
    lastName: '',
    age: '',
    phone: '',
    email: '',
    password: null,
    directorId: "",
    typeUser: "",
    items: [],
    valid: true,
    snackbar: false,
    text: '',
    color: '',
    formHasErrors: false,
    nameRules: [ v => !!v || 'Name is required'],
    ageRules: [
      v => !!v || 'Age is required',
      v => v>=18 && v<=90 || 'Age is required',
    ],
    phoneRules: [
      v => !!v || 'Phone number is required',
      v => v>=(900000000) && v<=(999999999) || 'Phone number is invalid',
    ],
    passwordRules: [ v => !!v || 'Password is required'],
    radioRules: [ v => !!v || 'Type user is required'],
    emailRules: [
      v => !!v || 'E-mail is required',
      v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
    ],
  }),
  mounted() {
    this.$store.dispatch('changeAuthenticatedFalseAction')
    this.refreshListDirectors()
  },
  methods: {
    submit () {
      this.$refs.form.validate();
      let val = this.$refs.form.validate();
      if(val) {
        let user = {};
        if(this.typeUser=='teacher'){
          let idSelect = this.directorId[0];
          user = {
            firstName:  this.firstName,
            lastName:   this.lastName,
            age:        this.age,
            phone:      this.phone,
            email:      this.email,
            password:   this.password,
            directorId: idSelect[0]
          };
        } else {
          user = {
            firstName: this.firstName,
            lastName: this.lastName,
            age: this.age,
            phone: this.phone,
            email: this.email,
            password: this.password,
          }
        }

        AuthService.register(user,this.typeUser)
          .then(response => {
            console.log(response.data);
            this.color = 'success';
            this.text = 'User created successfully';
            this.snackbar = true;
            router.push("/log-in");
          })
      }
    },
    reset () {
      this.snackbar = true;
      this.color = 'indigo accent-4';
      this.text = 'Clean form fields';
      this.$refs.form.reset()
    },
    refreshListDirectors () {
      AuthService.getAllDirectors()
          .then((response) => {
            this.items = response.data.map(this.displayDirectorsName)
            console.log(response.data);
            console.log("items",this.items);
      })
    },
    displayDirectorsName(item){
      return [
        `${item.id} - ${item.firstName}`
      ]
    }
  }
}
</script>

<style scoped>

</style>