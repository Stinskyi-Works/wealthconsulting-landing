import { eventBus } from './eventBus';

let currentModal = null;

export const showModal = (modal) => {
  const modalElem = document.getElementById('modal');

  if (!modalElem || modal.name === currentModal?.name) {
    console.log('already shown', modal)
    return;
  }

  if (modalElem.childNodes.length > 0) {
    if (currentModal?.hideAnim) {
      currentModal.hideAnim(() => {
        modalElem.innerHTML = '';
        modalElem.appendChild(modal.element);

        if (modal?.showAnim) {
          modal.showAnim();
        }
      });
    }
  } else {
    modalElem.appendChild(modal.element);
  
    if (modal?.showAnim) {
      modal.showAnim();
    }
  }

  eventBus.emit('show-header');
  eventBus.emit('show-close-btn');

  currentModal = modal;
}

export const hideModal = (data) => {
  const modalElem = document.getElementById('modal');

  if (data.name !== currentModal?.name && data.name !== 'current') {
    return;
  }

  if (currentModal?.hideAnim) {
    currentModal.hideAnim(() => {
      modalElem.innerHTML = '';
      eventBus.emit('hide-header');
      eventBus.emit('hide-close-btn');

      if (data.afterCb) {
        data?.afterCb();
      }
    });
  } else {
    modalElem.innerHTML = '';
    eventBus.emit('hide-header');
    eventBus.emit('hide-close-btn');

    if (data.afterCb) {
      data?.afterCb();
    }
  }

  currentModal = null;
}

export const registerModal = () => {
  eventBus.on('show-modal', showModal);
  eventBus.on('hide-modal', hideModal);
}