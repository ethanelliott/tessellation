<template>
  <v-app>
    <v-app-bar
      app
      clipped-left
      dark
      color="transparent"
      elevation="0"
    >
      <v-container>
        <v-col>
          <v-row
            justify="center"
            align="center"
          >
            <v-btn
              text
              to="/"
              plain
              class="pa-0"
              :ripple="false"
            >
              <v-toolbar-title>
                <h1
                  class="font-weight-thin text-lowercase"
                >
                  tessellation
                </h1>
              </v-toolbar-title>
            </v-btn>
            <v-spacer />
            <v-btn
              icon
              href="http://github.com/ethanelliott/tessellation"
              target="_blank"
            >
              <v-icon large>
                mdi-github
              </v-icon>
            </v-btn>
          </v-row>
        </v-col>
      </v-container>
    </v-app-bar>
    <div class="background" />
    <router-view />
    <v-footer
      app
      color="transparent"
    >
      <v-spacer />
      Made with ❤️ by Ethan
      <v-spacer />
    </v-footer>
  </v-app>
</template>

<script>
export default {};
</script>

<style lang="scss">
@import './styles/styles';
</style>
