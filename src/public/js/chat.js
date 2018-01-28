iziToast.question({
    timeout: 10000,
    close: false,
    overlay: true,
    toastOnce: true,
    id: 'question',
    zindex: 999,
    rtl: true,
    title: 'قبول کردن چت',
    position: 'center',
    buttons: [
      ['<button><b>اره</b></button>', (instance, toast) => {
        instance.hide(toast, { transitionOut: 'fadeOut' }, 'button');

        socket.emit('take', chatID);
        $('#send-message-form').toggleClass('hidden-el');

      }, true],
      ['<button>نه</button>', (instance, toast) => {
        instance.hide(toast, { transitionOut: 'fadeOut' }, 'button');

        window.location.href = '/u/chats';

      }]
    ]
});
