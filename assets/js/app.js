/*
Este exercício será um pouquinho diferente dos anteriores.

Seu desafio é desenvolver uma versão do quiz que:

- Aborda um tema diferente (não pode ser de filmes);
- Tem um tema de cores diferente do que foi apresentado na aula;
- Exibe na tela a pontuação que o usuário fez. Não há certo ou errado, apenas faça. Essa exibição de pontos é uma das implementações que faremos na próxima aula =D

Independente se você já fez o quiz dos filmes enquanto acompanhava a aula, tente fazer esse exercício sem rever partes da aula.

É importante que a sua versão do quiz seja feita apenas com o conteúdo que vimos até aqui.

Depois de fazer o que foi pedido acima, crie um repositório no GitHub para a sua aplicação e abra uma issue no repositório do curso com:

- O link da sua versão do quiz;
- Quais foram as suas maiores dúvidas ou dificuldades durante a execução desse exercício;
- Quais foram as suas menores dificuldades durante a execução desse exercício.

Link do repositório do curso: https://github.com/roger-melo-treinamentos/curso-de-js-roger-melo/issues

Ps: se você não conseguiu fazer tudo o que foi pedido acima, abra a issue mesmo assim =)
*/
const username = document.querySelector('input[name="username"]')
const form = document.querySelector('form')
const resultWrapper = document.querySelector('.result-wrapper')
const p = document.createElement('p')

const pattern = /^[a-zA-Z]{6,}$/


const player = {
    playerName: null,
    score: 0
}

const validParagraph = {
    message: 'O usuário é válido.',
    className: 'help-success-feedback'
}

const invalidParagraph = {
    message: 'O usuário deve ter no mínimo 6 caracteres, apenas letras.',
    className: 'help-fail-feedback'
}

const correctAnswers = ['A','B','B','A','B']

const validateUserName = username => pattern.test(username)

resultWrapper.addEventListener('click', event => {
    const classesToClosePopUp = ['result-wrapper', 'result-x']
    const clickedElementClass = event.target.classList[0]
    const isEnableToClose = classesToClosePopUp.some(element => clickedElementClass === element)
    
    if(isEnableToClose){
        resultWrapper.style.display = 'none'
    }
})


const insertParagraphIntoDOM = (paragraph) => {
    const {message, className} = paragraph
    p.textContent = message
    p.setAttribute('class', className)
    username.insertAdjacentElement('afterend', p)
}


username.addEventListener('input', event => {
    const username = event.target.value

    if(validateUserName(username)){
        event.target.setAttribute('class', 'help-success-username')
        insertParagraphIntoDOM(validParagraph)
        return
    }
    event.target.setAttribute('class', 'help-fail-username')
    insertParagraphIntoDOM(invalidParagraph)
})


form.addEventListener('submit', event => {
    event.preventDefault()
    player.score = 0
    const playerAnswers = [
        form.question1.value,
        form.question2.value,
        form.question3.value,
        form.question4.value,
        form.question5.value
    ]
    if(validateUserName(username.value)){
        player.playerName = username.value
        const scorePlace = document.querySelector('[data-playerscore]')
        const namePlace = document.querySelector('[data-playername]')


        playerAnswers.forEach((answer, index, array) => {
            if(answer === correctAnswers[index]){
                player.score += 10
            }
        })
        resultWrapper.style.display = 'block'
        scorePlace.textContent = `${player.score}`
        namePlace.textContent = `${player.playerName}`
        username.value = ''
        player.playerName = null
        return
    }
    username.focus()
})