<template>
  <mdb-card>
    <mdb-card-body class="z-depth-2 white-text">
      <h3 class="text-center">
        <mdb-icon icon="sign-in-alt" class="mr-2" />登  录
      </h3>

      <hr class="hr-light">

      <mdb-input
        v-model="userName"
        label="用户名"
        label-color="white"
        icon="user"
      />
      <mdb-input
        v-model="password"
        label="密码"
        label-color="white"
        icon="lock"
        type="password"
      />

      <p class="font-small grey-text d-flex justify-content-end">
        <a href="#" class="white-text font-weight-bold">忘记密码?</a>
      </p>

      <mdb-row class="d-flex align-items-center mb-4 mt-5">
        <mdb-col md="5" class="d-flex align-items-start">
          <div class="text-center">
            <mdb-btn color="primary" type="button" class="z-depth-1a" rounded @click="login">
              <mdb-icon icon="sign-in-alt" class="mr-2" />登  录
            </mdb-btn>
          </div>
        </mdb-col>

        <mdb-col md="7" class="d-flex justify-content-end">
          <p class="font-small grey-text mt-3">
            没有账户?
            <a href="#" class="white-text ml-1 font-weight-bold">注册</a>
          </p>
        </mdb-col>
      </mdb-row>
    </mdb-card-body>
  </mdb-card>
</template>

<script lang="ts">
import { Vue, Component, Emit } from 'vue-property-decorator'
import { ILoginResult, LoginStatus } from '~/assets/ts/types/app'

@Component
export default class Login extends Vue {
  private userName: string = ''
  private password: string = ''

  @Emit()
  private login (): ILoginResult {
    return {
      loginStatus: LoginStatus.success,
      message: '登录成功'
    }
  }
}
</script>

<style scoped></style>
