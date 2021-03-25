'use strict';
const modals = (state) => {
    function bindModal(triggerSelector, modalSelector, closeSelector, closeClickOverlay = true, curState = -1) {
        const trigger = document.querySelectorAll(triggerSelector),
            modal = document.querySelector(modalSelector),
            close = document.querySelector(closeSelector),
            windows = document.querySelectorAll('[data-modal]');

        function checkState() {
            if (curState == 1) {
                if (state.hasOwnProperty('form') && state.hasOwnProperty('width') && state.hasOwnProperty('height')) {
                    return true;
                } else {
                    return false;
                }
            }
            if (curState == 2) {
                if (state.hasOwnProperty('type') && state.hasOwnProperty('profile')) {
                    return true;
                } else {
                    return false;
                }
            }
            return true;
        }

        trigger.forEach(item => {
            item.addEventListener('click', (e) => {
                if (e.target) {
                    e.preventDefault();
                }
                if (checkState(curState)) {
                    windows.forEach(item => {
                        item.style.display = 'none';
                    });
                    modal.style.display = 'block';
                    document.body.style.overflow = 'hidden';
                } else {
                    let statusMessage = document.createElement('div');
                    statusMessage.classList.add('status');
                    statusMessage.textContent = 'Заполните все поля...';
                    item.parentNode.appendChild(statusMessage);
                    setTimeout(() => {
                        statusMessage.remove();
                    }, 5000);
                }
            });
        });




        close.addEventListener('click', () => {
            windows.forEach(item => {
                item.style.display = 'none';
            });
            modal.style.display = 'none';
            document.body.style.overflow = '';
            // document.body.classList.remove('modal-open');
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal && closeClickOverlay) {
                windows.forEach(item => {
                    item.style.display = 'none';
                });

                modal.style.display = 'none';
                document.body.style.overflow = '';
                // document.body.classList.remove('modal-open');
            }
        });
    }

    function showModalByTime(selector, time) {
        setTimeout(function() {
            document.querySelector(selector).style.display = 'block';
            document.body.style.overflow = 'hidden';
        }, time);
    }

    bindModal('.popup_engineer_btn', '.popup_engineer', '.popup_engineer .popup_close');
    bindModal('.phone_link', '.popup', '.popup .popup_close');
    bindModal('.popup_calc_btn', '.popup_calc', '.popup_calc_close');
    bindModal('.popup_calc_button', '.popup_calc_profile', '.popup_calc_profile_close', false, 1);
    bindModal('.popup_calc_profile_button', '.popup_calc_end', '.popup_calc_end_close', false, 2);
    // showModalByTime('.popup', 60000);
};

export default modals;