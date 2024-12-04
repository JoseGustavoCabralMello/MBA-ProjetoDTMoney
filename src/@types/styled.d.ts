import 'styled-components'
import { defaultTheme } from '../styles/themes/default'

type ThemeType = typeof defaultTheme

declare module 'syled-components' {
  export interface DefaultTheme extends ThemeType {}
}