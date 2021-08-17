import {defineConfig} from 'windicss/helpers';
import aspectRatio from 'windicss/plugin/aspect-ratio';
import forms from 'windicss/plugin/forms';

export default defineConfig({
  darkMode: 'media',
  theme: {
    fontFamily: {
      body: ['Atkinson Hyperlegible', 'Roboto', 'Noto Sans', 'Verdana', 'sans-serif'],
    },
    extend: {
      flex: {
        2: '2 2 0%',
        3: '3 3 0%',
        4: '4 4 0%',
      },
    },
  },
  plugins: [aspectRatio, forms],
});
