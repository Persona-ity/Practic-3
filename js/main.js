let eventBus = new Vue()

Vue.component('Kanban', {
    template: `
    <div id="cols">
        <newcard></newcard>
        <div class="cols__content">
            <col1 :column1="column1"></col1>
            <col2 :column2="column2"></col2>
            <col3 :column3="column3"></col3>
            <col4 :column4="column4"></col4>
        </div>
    </div>
`,
    data() {
        return {
            column1: [],
            column2: [],
            column3: [],
            column4: [],
        }
    },
    methods: {

    },
    mounted() {
        eventBus.$on('addColumn1', card => {
            this.column1.push(card)
        })
        eventBus.$on('addColumn2', card => {
            this.column2.push(card)
        })
        eventBus.$on('addColumn3', card => {
            this.column3.push(card)
        })
        eventBus.$on('addColumn4', card => {
            this.column4.push(card)
            if (card.date > card.deadline) {
                card.current = false
            }
        })
    },
    computed: {

    }
})

Vue.component('col1', { 
   template: `
       <div class="col">
           <h2>Запланированные задачи</h2>
           <li class="cards" v-for="card in column1">
               <a @click="deleteCard(card)">Удалить</a> | <a @click="card.editB = true">Редактировать</a> <br>
               <p class="card-title">{{card.title}}</p>
               <ul>
                   <li class="tasks">Описание: {{card.description}}</li>
                   <li class="tasks">Дата создания:
                   {{ card.date }}</li>
                   <li class="tasks">Дедлайн: {{card.deadline}}</li>
                   <li class="tasks" v-if="card.edit != null">Последнее изменение: {{ card.edit}}</li>
                   <li class="tasks" v-if="card.editB">
                       <form @submit.prevent="updateTask(card)">
                           <p>Новый заголовок: 
                               <input type="text" v-model="card.title" maxlength="30" placeholder="Заголовок">
                           </p>
                           <p>Новое описание: 
                               <textarea v-model="card.description" cols="20" rows="5"></textarea>
                           </p>
                           <p>
                               <input type="submit" value="Редактировать">
                           </p>
                       </form>
                   </li>
               </ul>
               <a @click="nextcol(card)">Следующая колонка</a>
           </li >
       </div>
   `,
   props: {
       column1: {
           type: Array,
       },
       column2: {
           type: Array,
       },
       card: {
           type: Object
       },
       errors: {
           type: Array
       }
   },
   methods: {
       nextcol(card) {
           this.column1.splice(this.column1.indexOf(card), 1)
           eventBus.$emit('addColumn2', card)
       },
       deleteCard(card) {
           this.column1.splice(this.column1.indexOf(card), 1)  
       },
       updateTask(card){
           card.editB = false
           this.column1.push(card)
           this.column1.splice(this.column1.indexOf(card), 1)
           card.edit = new Date().toLocaleString()
       }
       
   },
   computed: {

   },
})