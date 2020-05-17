
document.addEventListener('DOMContentLoaded', ()=> {
    const monstList = document.getElementById('monster-container')
    let currrentPage = 1
    fetchMonsters(currrentPage)
    const divForm = document.getElementById('create-monster')
    let form = document.createElement('form')
    divForm.appendChild(form)

    function createForm(params) {
        let child = document.createElement('input')
        child.id = `${params}`
        child.placeholder = `${params}...`
        form.appendChild(child)
    }
    createForm('name')
    createForm('age')
    createForm('description')

    let button = document.createElement('button')
    button.innerHTML = "Create Monster"
    form.appendChild(button)

    button.addEventListener('click', (e) =>{
        e.preventDefault()
        let newMonster = document.createElement('div')
        newMonster.innerHTML = `
        <h2>Name: ${form.name.value}</h2>
        <h4>Age: ${form.age.value}</h4>
        <p>Bio: ${form.description.value} </p>`
        monstList.appendChild(newMonster)
        fetch('http://localhost:3000/monsters', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body: JSON.stringify({
                name: form.name.value, 
                age: form.age.value, 
                description: form.description.value
            })
        })
        .then(response => response.json())
        .then(data => {console.log('Success:', data)})
        .catch((error) => {console.error('Error:', error)})
        form.reset()

    })

    const fButton = document.getElementById('forward')
    const bButton = document.getElementById('back')
    fButton.addEventListener('click', (e) => {
        while (monstList.firstChild) {
            monstList.removeChild(monstList.firstChild);
        }
        fetchMonsters(currrentPage + 1)
        currrentPage++
    })
    bButton.addEventListener('click', (e) => {
        if (currrentPage === 1){
            return alert("there is nothing this way")
        } else {
            while (monstList.firstChild) {
                monstList.removeChild(monstList.firstChild);
            }
            fetchMonsters(currrentPage - 1)
            currrentPage--
        }
    })

    function fetchMonsters(page){
        fetch(`http://localhost:3000/monsters/?_limit=50&_page=${page}`)
        .then(response => response.json())
        .then(json => {
            json.map((element) => {
                let div = document.createElement('div')
                div.innerHTML = `
                <h2>Name: ${element.name}</h2>
                <h4>Age: ${element.age}</h4>
                <p>Bio: ${element.description} </p>`
                monstList.appendChild(div)
            })
        })
    }
})
