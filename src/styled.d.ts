import 'styled-components';
import { ITheme } from './themes';

declare module "styled-components" {
    /* tslint:disable */
    export interface DefaultTheme extends ITheme { }
}