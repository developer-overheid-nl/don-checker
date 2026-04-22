import '@geonovum/standards-checker/index.css';
import { mount } from '@geonovum/standards-checker/ui';
import specs from './specs';

mount(document.getElementById('root')!, specs, {
  title: 'DON Checker',
  githubUrl: 'https://github.com/developer-overheid-nl/don-checker',
});
