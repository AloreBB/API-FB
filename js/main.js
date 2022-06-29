const API = "https://graph.facebook.com/"
const CAMPOS = "?fields=id,name,picture&"
const TOKEN = "access_token=EAAHdrk9jidQBALQbZBvvwemcIyIx5JMHuOjb6Epg1OX9foZCSJZB03mZAv02IUKjAraJzjDLnfSUT9pJAlVs9Sw8IYCp78mwmNr76ew4UAhHZB8lbQ0PylGCZCLCnF99VD3bTjJkZAlWPpMIqQZBiBKOR9ZAWqq4vZAmEZA70LitdZBMvgZDZD"
//se cortó la función Buscar y se ubicó en methods

const jovy = Vue.createApp({
    data() {
        return {
          busqueda: null,
          result: null,
          error: null,
          favoritos: new Map()
        }
      },
      computed:{
        estaFav(){
          return this.favoritos.has(this.result.id)
        },

        //  pasamos la informacion a un autentico array
        allFavorites(){
          //El metodo value() solo traera los valores sin las claves
          return Array.from(this.favoritos.values())
        },
      },

      methods: {
        async Buscar(){
          this.result = this.error
            try{
              const response = await fetch(API + this.busqueda + CAMPOS + TOKEN)
              //ahora quiero traer la info en formato json
              if(!response.ok) throw new Error("Usuario no encontrado")
              const data = await response.json()
              console.log(data)
              this.result = data //cambiar true por data  
            }
            catch (error) {
                this.error = error
            }
            finally{
              this.busqueda = null
            }
        },
        addFavoritos(){
          this.favoritos.set(this.result.id, this.result)
          this.actualizarStorage()
        },
        removerFavoritos(){
          this.favoritos.delete(this.result.id)
          this.actualizarStorage()
        },
        actualizarStorage(){
          window.localStorage.setItem('misFavoritos',JSON.stringify(this.allFavorites))
        },
        mostrarFavorito(parametro){
          //parametro: tipo array con objetos de javascript o JSON
          this.result = parametro
        }
    
    }
})
