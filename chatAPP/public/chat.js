
const socket = io(`http://localhost:3000`); //dizendo ao socket do frontend onde estamos conectados
let user =null;
socket.on('update_messages',(messages)=>{ //listener no codigo 'update messages' que vem do backend com as mensagens dos usuários
    updateMessagesOnScreen(messages); //funçao para printar as mensagens
})

function updateMessagesOnScreen(messages){ //funçao que printa as imagens formatadas
    const chatDiv = document.getElementById('chatDiv');

    let list_messages = 
    "<ul>"
    messages.forEach(message => {
        list_messages+=`<li>${message.user}: ${message.msg}</li>`
    });
    list_messages+="</ul>"

    chatDiv.innerHTML=list_messages;
}

document.addEventListener('DOMContentLoaded',()=>{ //ao carregar a página
    const form = document.getElementById('messageForm'); // recebendo o formulário
    form.addEventListener('submit',(e)=>{ //no press do botao de enviar, o formulário irá executar o seguinte bloco de código
        e.preventDefault(); //negar o comportamento padrao do forms(evitar que ele redirecione)
            if (!user) {
                alert('Defina um usuário!');
                return
            }
        const message=document.forms['messageForm']['msg'].value; //recebendo a mensagem digitada no momento do envio
        document.forms['messageForm']['msg'].value="" //setando o campo de mensagem para vazio novamente
        socket.emit('new_message',{user:user,msg:message}) //enviando a mensagem para o backend tratar e mandar de volta para o frontend printar na tela
    })
})

document.addEventListener('DOMContentLoaded',()=>{ //ao carregar a página
    const userForm = document.getElementById('userForm'); // recebendo o formulário
    userForm.addEventListener('submit',(e)=>{ //no press do botao de enviar, o formulário irá executar o seguinte bloco de código
        e.preventDefault(); //negar o comportamento padrao do forms(evitar que ele redirecione)
         user=document.forms['userForm']['user'].value; //recebendo a mensagem digitada no momento do envio
        userForm.parentNode.removeChild(userForm)
    })
})