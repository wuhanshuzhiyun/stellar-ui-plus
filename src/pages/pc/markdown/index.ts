import { componentFiles, restsFiles } from './requireFiles';
import './markdown.scss';
import viewPages from './view-pages';

export const rests = restsFiles();

export const components = componentFiles();

export const pages = viewPages();
