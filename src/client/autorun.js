import { autorun } from 'mobx';

export default function ({ ui }) {
  // Update document title whenever it changes
  autorun(() => {
    if (ui.title) {
      document.title = ui.title;
    }
  });
}
