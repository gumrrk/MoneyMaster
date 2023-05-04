// Função que muda o display do modal para flex, cria um overlay e adiciona os efeitos de fechar o modal a alguns botões
function openModal() {
    const openModalButtons = document.querySelectorAll('.openModal');
    const dialog = document.querySelector('.financialOperation_dialog');
    const overlay = document.createElement('div');
    overlay.className = 'overlay';

    // Adiciona um event listener para cada botão com a classe 'openModal'
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

// Função que adiciona uma animação de entrada ao modal
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