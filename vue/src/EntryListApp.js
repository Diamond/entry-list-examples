import Vue from "vue";

var SearchBarComponent = Vue.extend({
  template: `<input type="text" placeholder="Search" v-model="searchFor">`,
  props: ['searchFor']
});

var AddTodoComponent = Vue.extend({
  template: `
    <input type="text" placeholder="Entry Name" v-model="newEntry" v-on:keyup.enter="addTodo">
    <button v-on:click="addTodo">Add</button>
    <h3>New entry: {{newEntry}}</h3>
  `,
  data() {
    return {
      newEntry: ""
    };
  },
  props: ['todos'],
  methods: {
    addTodo() {
      this.todos.push(this.newEntry);
      this.newEntry = "";
    },
  }
});

var TodoComponent = Vue.extend({
  template: `
    <li>
      {{todo}}
      <button v-on:click="removeTodo">Remove</button>
    </li>
  `,
  props: ['todo', 'todos'],
  methods: {
    removeTodo() {
      this.todos = this.todos.filter(item => {
        return item.indexOf(this.todo) === -1;
      });
    }
  }
});

var EntryListComponent = Vue.extend({
  template: `
    <h2>Entries</h2>
    <search-bar v-bind:search-for.sync="searchFor"></search-bar>
    <ul>
      <todo v-for="todo in filteredTodos" v-bind:todo="todo" v-bind:todos.sync="todos"></todo>
    </ul>
    <add-todo v-bind:todos.sync="todos"></add-todo>
  `,
  components: {
    'search-bar': SearchBarComponent,
    'add-todo': AddTodoComponent,
    'todo': TodoComponent
  },
  data() {
    return {
      todos: ["a", "b", "c"],
      searchFor: "",
    };
  },
  computed: {
    filteredTodos: function() {
      return this.todos.filter(item => {
        return item.indexOf(this.searchFor) !== -1;
      })
    }
  }
});

Vue.component("entry-list", EntryListComponent);
new Vue({ el: "#app" });
