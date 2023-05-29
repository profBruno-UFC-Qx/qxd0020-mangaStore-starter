## Feitos

1. Criar um projeto usando o Vite
1. Copiar template [Album do bootstrap](https://getbootstrap.com/docs/5.3/examples/album/)
 - Clique na opção de salvar no navegador ou baixe os (exemplos)[https://github.com/twbs/bootstrap/releases/download/v5.3.0-alpha3/bootstrap-5.3.0-alpha3-examples.zip] e localize o exemplo Album
1. Altere o index recém salvo para trocar qualquer link para css e js externos por links da CDN usadas pelo Bootstrap
1. Substitua o index.html criado pelo Vite pelo index.html copiado pelo Bootstrap, mas não se esqueça de manter o código referente a div onde vai ser montado o componente do vue
1. Mova o código referente ao container para dentro do **template** do componente **App.vue**
1. Copie o código html referente a **um** card, e cole no template de um novo componente chamado **MangaCard**
1. Defina as seguintes props no **MangaCard**:
  - title: string, number:number e price:number
1. Altere o **template** para que as props sejam utilizadas
1. Import o **MangaCard** no **App.vue** e crie um vetor de objetos com o seguinte formato: `{ title: "", number:"", price: ""}`
1. Adicione alguns elementos nesse vetor e utilize um **v-for** para mostrar um **MangaCard** para cada elemento do vetor
1. Instale o Axios
1. Faça a configuração da instância do axios
1. Dentro do **App.vue** chame o axios para buscar os mangas providos pelo Strapi
  - A chamada assíncrona deve ser feita dentro do **onMounted**
1. Altere o **App.vue** de forma que ele mostre os mangas respondidos pelo Strapi
1. Instale o Vue-Router
1. Realize a configuração padrão do Vue-Router
1. Crie o componente **Home.vue** e copie o código do **template** do **App.vue** para ele, copie todo o código necessário do **App.vue**
1. Altere o **template** do **App.vue** para `<router-view></router-view>`
1. Configura a rota **/** para mostrar o componente **Home.vue**
1. Configure uma rota **/mangas/id**, onde o id é um número, nesta roda deve levar a um novo componente chamdo **MangaInDetails**
1. O componente MangaInDetails deve receber uma Manga como prop
1. Crie um método para recuperar um manga a partir do seu ID via Axios
1. Altere o **MangaInDetails** para que ele utilizar o id enviado, recuperar o Mangá junto ao backend e mostrá-lo 
1. Explicar diferença do onMoutend vs onBeforeMount
1. LoadingContainer
1. Criar a tabela Comentário no Strapi
1. Mostrar os comentários no MangaInDetails 
1. Explicar componentes de comentários
1. Tratando o 404 e rotas inexistentes
1. Explicar paginação

## A fazer
1. Área de adminstração, vue-router
1. Página de login
1. Autenticação/Autorização teórico
1. Escrever métodos de autenticação/autorização com o Strapi
1. Pinia
1. Proteger rota + Axios interceptors
1. Listar manga na home do usuário admin
1. Criar o método de deleção de um mangá
1. No home do admin, permitir a deleção de um mangá. Confirmar a deleção via modal.
1. Criar rota de atualização de um mangá
1. Criar o página de edição/criação de Manga, **MangaForm.vue**
