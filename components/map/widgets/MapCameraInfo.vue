<template>
  <div>
    <a-card
      title="地图镜头"
      style="height: 450px; width: 300px;"
    >
      <a-form :form="form">
        <a-form-item
          label="水平角度"
          :label-col="formItemLayout.labelCol"
          :wrapper-col="formItemLayout.wrapperCol"
        >
          <a-input v-decorator="['heading']" />
        </a-form-item>

        <a-form-item
          label="垂直角度"
          :label-col="formItemLayout.labelCol"
          :wrapper-col="formItemLayout.wrapperCol"
        >
          <a-input v-decorator="['tilt']" />
        </a-form-item>

        <a-form-item
          label="高度"
          :label-col="formItemLayout.labelCol"
          :wrapper-col="formItemLayout.wrapperCol"
        >
          <a-input v-decorator="['height']" />
        </a-form-item>

        <a-form-item
          label="经度"
          :label-col="formItemLayout.labelCol"
          :wrapper-col="formItemLayout.wrapperCol"
        >
          <a-input v-decorator="['latitude']" />
        </a-form-item>

        <a-form-item
          label="纬度"
          :label-col="formItemLayout.labelCol"
          :wrapper-col="formItemLayout.wrapperCol"
        >
          <a-input v-decorator="['longitude']" />
        </a-form-item>

        <a-form-item>
          <a-row type="flex" justify="space-between">
            <a-col :span="12">
              <a-button type="primary" @click="resetCamera">
                还原
              </a-button>
            </a-col>

            <a-col :span="12">
              <a-button type="primary">
                跳转
              </a-button>
            </a-col>
          </a-row>
        </a-form-item>
      </a-form>
    </a-card>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Inject } from 'vue-property-decorator'

@Component
export default class MapCameraInfo extends Vue {
  view!: __esri.SceneView
  form: any
  formItemLayout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 }
  }

  @Inject('getView') readonly getView!: Promise<__esri.SceneView>

  beforeCreate () {
    this.form = this.$form.createForm(this)
  }

  async mounted () {
    this.view = await this.getView
    this.showCameraParams(this.view.camera)
    this.view.watch('camera', () => {
      const camera: __esri.Camera = this.view.camera
      this.showCameraParams(camera)
    })
  }

  private showCameraParams (camera: __esri.Camera) {
    const { heading, tilt, position } = camera
    this.form.setFieldsValue({
      heading: heading.toFixed(3),
      tilt: tilt.toFixed(3),
      height: position.z.toFixed(3),
      latitude: position.latitude.toFixed(6),
      longitude: position.longitude.toFixed(6)
    })
  }

  private resetCamera () {}
}
</script>

<style scoped></style>
