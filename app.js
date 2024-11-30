class Chatbox {
    constructor() {
        this.args = {
            openButton: document.querySelector('.chatbox__button'),
            chatBox: document.querySelector('.chatbox__support'),
            sendButton: document.querySelector('.send__button')
        }

        this.state = false;
        this.messages = [];

        // Definir preguntas y respuestas predefinidas
        this.predefinedResponses = {
            "hola": "Hola",
            "Hola": "Hola",
            "¿cómo estás?": "Estoy bien, gracias por preguntar.",
            "¿qué hora es?": "La hora actual es " + new Date().toLocaleTimeString(),
            "¿qué día es hoy?": "Hoy es " + new Date().toLocaleDateString('es-ES', { weekday: 'long' }),
            "¿cuál es tu nombre?": "Me llamo Chatito.",
            "¿qué haces?": "Estoy aquí para ayudarte.",
            "¿cuál es la fecha de hoy?": "La fecha de hoy es " + new Date().toLocaleDateString(),
            "¿dónde estás?": "Estoy en la nube.",
            "¿cuál es tu color favorito?": "Me gustan todos los colores.",
            "Adiós": "Adiós, que tengas un buen día."
            
        };
    }

    display() {
        const {openButton, chatBox, sendButton} = this.args;

        openButton.addEventListener('click', () => this.toggleState(chatBox));

        sendButton.addEventListener('click', () => this.onSendButton(chatBox));

        const node = chatBox.querySelector('input');
        node.addEventListener("keyup", ({key}) => {
            if (key === "Enter") {
                this.onSendButton(chatBox);
            }
        });
    }

    toggleState(chatbox) {
        this.state = !this.state;

        if (this.state) {
            chatbox.classList.add('chatbox--active');
        } else {
            chatbox.classList.remove('chatbox--active');
        }
    }

    onSendButton(chatbox) {
        var textField = chatbox.querySelector('input');
        let text1 = textField.value.trim(); // Elimina espacios en blanco alrededor
        if (text1 === "") {
            return;
        }

        let msg1 = { name: "User", message: text1 };
        this.messages.push(msg1);
        this.updateChatText(chatbox); // Actualiza el chat para mostrar el mensaje del usuario

        // Verifica respuestas predefinidas
        let response = this.predefinedResponses[text1.toLowerCase()];
        if (response) {
            let msg2 = { name: "Sam", message: response };
            this.messages.push(msg2);
            this.updateChatText(chatbox);
            textField.value = '';
        } else {
            // Si no hay respuesta predefinida, realiza la solicitud al servidor
            fetch('http://127.0.0.1:5000/predict', {
                method: 'POST',
                body: JSON.stringify({ message: text1 }),
                mode: 'cors',
                headers: {
                  'Content-Type': 'application/json'
                },
            })
            .then(r => r.json())
            .then(r => {
                let msg2 = { name: "Sam", message: r.answer };
                this.messages.push(msg2);
                this.updateChatText(chatbox);
                textField.value = '';
            })
            .catch((error) => {
                console.error('Error:', error);
                this.updateChatText(chatbox);
                textField.value = '';
            });
        }
    }

    updateChatText(chatbox) {
        var html = '';
        this.messages.slice().reverse().forEach(function(item) {
            if (item.name === "Sam") {
                html += '<div class="messages__item messages__item--visitor">' + item.message + '</div>';
            } else {
                html += '<div class="messages__item messages__item--operator">' + item.message + '</div>';
            }
        });

        const chatmessage = chatbox.querySelector('.chatbox__messages');
        chatmessage.innerHTML = html;
    }
}

const chatbox = new Chatbox();
chatbox.display();
