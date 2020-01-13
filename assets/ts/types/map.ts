export interface ICamera {
  heading: number
  tilt: number
  position: {
    x: number
    y: number
    z: number
  }
}

export interface IMapInitialize {
  container: string
  theme?: string
  camera?: ICamera
}

export interface IWidgetConfig {
  content: HTMLElement
  expanded?: boolean
  position?: string
  icon?: string
}

export interface IBookmark {
  name: string,
  camera: ICamera
}
