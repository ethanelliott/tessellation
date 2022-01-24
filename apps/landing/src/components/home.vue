<template>
  <v-main>
    <v-container style="height: calc(100vh - 100px)">
      <v-col>
        <v-row
          justify="center"
          align="center"
        >
          <v-card
            width="1200"
            flat
            outlined
            class="px-16"
            color="transparent"
            dark
          >
            <v-row
              justify="center"
              align="center"
            >
              <v-col
                cols="4"
                class="text-center"
              >
                <div
                  style="font-size: 400px"
                  class="font-weight-bold"
                >
                  T
                </div>
              </v-col>
              <v-col
                cols="8"
                class="text-left"
              >
                <div class="display-4 text-capitalize white--text mb-8">
                  Tessellation
                </div>
                <div class="display-1 font-weight-thin">
                  a nodejs-typescript framework for developing backend
                  applications
                </div>
              </v-col>
            </v-row>
            <v-row
              align="center"
              justify="center"
            >
              <v-btn
                x-large
                rounded
                color="primary"
                class="mr-8"
                disabled
              >
                <v-icon left>
                  mdi-play
                </v-icon>
                GET STARTED
              </v-btn>
              <v-btn
                x-large
                rounded
                href="http://github.com/ethanelliott/tessellation"
                target="_blank"
              >
                <v-icon left>
                  mdi-github
                </v-icon>
                GITHUB
              </v-btn>
            </v-row>
          </v-card>
        </v-row>
      </v-col>
    </v-container>
    <v-container>
      <v-row>
        <v-col cols="4">
          <v-row
            align="center"
            justify="center"
          >
            <v-card
              class="flex-fill text-center mr-4 mb-8"
              flat
              outlined
            >
              <h1 class="text-capitalize font-weight-regular primary--text my-4">
                Simple
              </h1>
              <p>very easy to make things</p>
            </v-card>
          </v-row>
        </v-col>
        <v-col cols="4">
          <v-row
            align="center"
            justify="center"
          >
            <v-card
              class="flex-fill text-center mr-4 mb-8"
              flat
              outlined
            >
              <h1 class="text-capitalize font-weight-regular primary--text my-4">
                Composable
              </h1>
              <p>combine things to make other things</p>
            </v-card>
          </v-row>
        </v-col>
        <v-col cols="4">
          <v-row
            align="center"
            justify="center"
          >
            <v-card
              class="flex-fill text-center mb-8"
              flat
              outlined
            >
              <h1 class="text-capitalize font-weight-regular primary--text my-4">
                Scalable
              </h1>
              <p>start small and grow with it</p>
            </v-card>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
import Vue from 'vue';

export default Vue.extend({});
</script>
