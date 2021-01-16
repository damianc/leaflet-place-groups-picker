import { pluginFactory as factory } from './plugin-factory';

import './scss/style.scss';

if (typeof L !== 'undefined') {
  factory(L);
}