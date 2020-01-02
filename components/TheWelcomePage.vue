<template>
  <div id="part3" class="classic-from-page">
    <mdb-view>
      <mdb-mask
        class="d-flex gradient justify-content-center align-items-center"
      >
        <mdb-container>
          <mdb-row>
            <mdb-col
              id="part1"
              class="white-text text-center text-md-left col-md-6 mt-xl-5 mb-5"
            >
              <h1 class="h1-responsive font-weight-bold animated fadeInLeft">
                交通超体
              </h1>
              <hr class="hr-light animated fadeInLeft">
              <h3 class="mb-4 animated fadeInLeft">
                SceneMax
              </h3>
            </mdb-col>

            <mdb-col id="part2" md="6" xl="5" class="mb-4">
              <login class="animated fadeInRight" @login="loginResult" />
            </mdb-col>
          </mdb-row>
        </mdb-container>
      </mdb-mask>
    </mdb-view>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import anime from 'animejs'
import Login from '~/components/Login.vue'
import { ILoginResult, LoginStatus } from '~/assets/ts/types/app'

@Component({
  components: {
    Login
  }
})
export default class WelcomPage extends Vue {
  private async loginResult (result: ILoginResult) {
    if (result.loginStatus === LoginStatus.success) {
      anime({ targets: '#part1', translateX: -100, opacity: 0, duration: 1000 })
      await anime({ targets: '#part2', translateX: 100, opacity: 0, duration: 1000 }).finished
      this.$router.push({ name: 'Home' })
    }
  }
}
</script>

<style scoped>
.view {
  background-image: url('~assets/image/91.jpg');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
  height: 100vh;
}

.gradient {
  background: -webkit-linear-gradient(
    45deg,
    rgba(0, 0, 0, 0.7),
    rgba(72, 15, 144, 0.4) 100%
  );
  background: linear-gradient(
    45deg,
    rgba(0, 0, 0, 0.7),
    rgba(72, 15, 144, 0.4) 100%
  );
}

.card {
  background-color: rgba(126, 123, 215, 0.2);
}

h3 {
  line-height: 1.7;
}

label {
  color: #fff !important;
}
</style>
