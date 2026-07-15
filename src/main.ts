import '@geonovum/standards-checker/index.css';
import { mount } from '@geonovum/standards-checker/ui';
import standards from './standards';

mount(document.getElementById('root')!, standards, {
  title: 'DON Checker',
  githubUrl: 'https://github.com/developer-overheid-nl/don-checker',
});
