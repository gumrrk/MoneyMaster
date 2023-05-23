
function openModal() {
    const openModalButtons = document.querySelectorAll('.openModal');
    const dialog = document.querySelector('.financialOperation_dialog');
    const overlay = document.createElement('div');
    overlay.className = 'overlay';

    
    openModalButtons.forEach((button) => {
        button.addEventListener('click', () => {
            dialog.style.display = 'flex';
            document.body.appendChild(overlay);
            document.body.style.overflow = 'hidden';
        });
    });

    const exitButton = document.querySelector('.exitButton');
    const cancelButton = document.getElementById('cancel');

    const closeDialog = () => {
        dialog.style.display = 'none';
        document.body.removeChild(overlay);
        document.body.style.overflow = 'auto';
    };

    exitButton.addEventListener('click', closeDialog);
    cancelButton.addEventListener('click', closeDialog);
    overlay.addEventListener('click', closeDialog);
}
openModal();


function entranceModal() {
    const modal = document.querySelector('.financialOperation_dialog');
    const closeModalButtons = document.querySelectorAll('#cancel, .exitButton');

    closeModalButtons.forEach(button => {
        button.addEventListener('click', () => {
            modal.classList.add('hide');
            modal.addEventListener('animationend', () => {
                modal.classList.remove('show', 'hide');
            }, { once: true });
        });
    });
}

entranceModal();