import { createNanoEvents } from 'nanoevents'

export const eventBus = createNanoEvents();


// eventBus.on('show-modal', (d) => console.log('show-modal', d));
// eventBus.on('hide-modal', (d) => console.log('hide-modal', d));
