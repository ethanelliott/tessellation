<template>
  <v-app>
    <v-app-bar
      app
      absolute
      dark
      color="rgba(0,0,0,0)"
      elevation="0"
    >
      <v-container fluid>
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
                <h1 class="font-weight-thin text-lowercase">
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
      color="primary"
      dark
      height="200"
    >
      <v-container>
        <v-col>
          <v-row
            align="center"
            justify="center"
          >
            <v-btn
              icon
              href="http://github.com/ethanelliott/tessellation"
              target="_blank"
            >
              <v-icon>
                mdi-github
              </v-icon>
            </v-btn>
            <v-btn
              text
              href="https://ko-fi.com/K3K47FY1H"
              target="_blank"
            >
              <img
                height="36"
                src="https://cdn.ko-fi.com/cdn/kofi1.png?v=3"
                alt="Buy Me a Coffee at ko-fi.com"
              >
            </v-btn>
          </v-row>
          <v-row
            class="mt-8"
            align="center"
            justify="center"
          >
            <div class="font-weight-regular overline">
              &copy; Ethan Elliott {{ new Date().getFullYear() }}
            </div>
          </v-row>
        </v-col>
      </v-container>
    </v-footer>
  </v-app>
</template>

<script>
export default {};
</script>

<style lang="scss">
@import './styles/styles';
</style>
