import { mount } from '@geonovum/standards-checker-ui';
import './index.css';
import specs from './specs';

mount(document.getElementById('root')!, specs, {
  title: 'DON Checker',
  githubUrl: 'https://github.com/developer-overheid-nl/don-checker',
});
