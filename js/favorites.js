//class que vai conter a logica dos dados
//como os dados serao estruturados

export class favorites{
    constructor(root){
        this.root = document.querySelector(root)
        this.tbody = this.root.querySelector('table tbody')
        this.load()    
    }

    load(){
        this.entries = JSON.parse(localStorage.getItem('@minhaLista')) || []
    }

    save(){
        localStorage.setItem("@minhaLista",JSON.stringify(this.entries))
    }

    delete(user){
        let filteredEntries = this.entries
        .filter(entry => user.nome !== entry.nome)
        this.entries = filteredEntries
        
        this.entries.splice(this.entries,0)
        this.update()
        this.save()
    }

}


//class que vai criar a visualizacao e eventos do HTML

export class favoritesView extends favorites{
    constructor(root){
        super(root)
         
       this.update()
       this.onadd()
    }

    onadd(){
        let btnAdicionar = this.root.querySelector(`#idFormulario`)
        btnAdicionar.addEventListener('submit',(e)=>{
           e.preventDefault()
           
           this.nome = document.getElementsByTagName(`input`)[0]
           this.contato = document.getElementsByTagName(`input`)[1]

            let novaPessoa = new Object()
            novaPessoa.nome = this.nome.value
            novaPessoa.contato = this.contato.value
            
            this.entries.push(novaPessoa)
            // console.log(this.entries)
            // this.reset()

            this.save()
            this.update()
        })
    }

    update(){//funtion admin
        this.removeAllTr()
        
        this.entries.forEach(user => {
            let row = this.createRow()
            row.getElementsByTagName('p')[0].innerHTML = user.nome
            row.getElementsByTagName('p')[1].innerHTML = user.contato
            row.querySelector('#remove').onclick = () =>{

                let isOk = confirm('Tem certeza que deseja deletar essa linha?')
                if(isOk){

                    this.delete(user)
                }
            }
                
            	
            
            this.tbody.append(row)
        })
    }

    createRow(){
        let tr = document.createElement('tr')
        tr.innerHTML = 
        `
            <td><p>Joao</p></td>
            <td><p>38 988563257</p></td>
            <td>
                <button id="remove" type="submit">Remover</button>
            </td>
        `
        return tr
    }

    removeAllTr(){//com isso sem conteudo tbody td 'removido'.
        
        this.tbody.querySelectorAll('tr').forEach(tr => {
            tr.remove()
        })
    }
}
