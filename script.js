let name, modelo, gola, tecido, image, owner;
let estoque = Array(10)

function getName() {
    name = prompt("Qual seu nome?")
    while (typeof (name) !== "string") {
        name = prompt("Qual seu nome?")
    }
    owner = name
}

function select(child, parent) {
    if (parent) {
        parent.classList.remove('selecionado')
    } child.classList.toggle('selecionado')
}

function chooseModelo(elem) {
    let selecionado = document.querySelector('.modelo .selecionado')
    let circulo = elem.firstChild.nextElementSibling
    modelo = circulo.classList[0]
    select(circulo, selecionado)
    setReady()

}

function chooseGola(elem) {
    let selecionado = document.querySelector('.gola .selecionado')
    let circulo = elem.firstChild.nextElementSibling
    gola = circulo.classList[0]
    select(circulo, selecionado)
    setReady()
}

function chooseTecido(elem) {
    let selecionado = document.querySelector('.tecido .selecionado')
    let circulo = elem.firstChild.nextElementSibling
    tecido = circulo.classList[0]
    select(circulo, selecionado)
    setReady()
}

function setImage() {
    image = document.querySelector('.referencia input').value
    setReady()
}

function setReady() {
    let verificaUrl = /^[a-zA-Z0-9-_]+[:./\\]+([a-zA-Z0-9 -_./:=&"'?%+@#$!])+$/
    if (modelo && gola && tecido && verificaUrl.test(image)) { document.querySelector('.referencia button').classList.add('pronto') }
}

function create() {
    if (modelo && gola && tecido && image) {
        let order = {
            "model": modelo,
            "neck": gola,
            "material": tecido,
            "image": image,
            "owner": owner,
            "author": name
        }

        let promise = axios.post('https://mock-api.driven.com.br/api/v4/shirts-api/shirts', order)

        promise
            .catch(err => alert('Ops, não conseguimos processar sua encomenda.'))
            .then(resp => {
                alert(`Pedido de ${name} confirmado.`)
                lastOrders()
            })
    }
}

function foi(elem, item) {
    if (item.id === elem.id) {
        return true
    } else return false
}

function clickOrder(elem) {
    let pedido = estoque.filter((item) => String(item.id) === String(elem.id))[0]
    let confirmar = confirm('Você deseja encomendar este mesmo modelo?')
    if (confirmar) {
        modelo = pedido.model
        gola = pedido.neck
        tecido = pedido.material
        image = pedido.image
        owner = pedido.owner
        create()
    }
}

function lastOrders() {
    let promise = axios.get("https://mock-api.driven.com.br/api/v4/shirts-api/shirts")
    promise
        .catch(err => console.log(err))
        .then(response => {
            let list = document.querySelector('.pedido ul')
            list.innerHTML = ''
            for (let i = 0; i < 10; i++) {
                list.innerHTML +=
                    `<li onclick='clickOrder(this)' id='${response.data[i].id}'>
                        <img src="${response.data[i].image}">
                        <p><strong>Criador: </strong>${response.data[i].owner}</p>
                    </li>`

                estoque[i] = response.data[i]
            }
        })
}

getName()
lastOrders()