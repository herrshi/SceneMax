export interface IMapInitialize {
  container: string
  theme?: string
  camera?: __esri.Camera
}

export interface IWidgetConfig {
  content: HTMLElement
  expanded?: boolean
  position?: string
  icon?: string
}
