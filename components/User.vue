<template> <div>{{ fullName }}</div> </template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

interface User {
  firstName: String
  lastName: String
}

@Component
export default class UserComponent extends Vue {
  @Prop({ type: Object, required: true }) readonly user!: User

  message: String = 'This is a message'

  get fullName (): String {
    return `${this.user.firstName} ${this.user.lastName}`
  }
}
</script>

<style scoped />
