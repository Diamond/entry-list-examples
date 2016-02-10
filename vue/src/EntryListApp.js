import Vue from "vue";
import $ from 'jquery';

new Vue({
  el: "#entry-list",
  data: {
    todos: ["a", "b", "c"],
    searchFor: "",
    newEntry: ""
  },
  computed: {
    filteredTodos: function() {
      return this.todos.filter(item => {
        return item.indexOf(this.searchFor) !== -1;
      })
    }
  },
  methods: {
    addTodo() {
      this.todos.push(this.newEntry);
      this.newEntry = "";
    },
    removeTodo(event) {
      var selected = $(event.target).data("todo");
      this.todos = this.todos.filter(item => {
        return item.indexOf(selected) === -1;
      });
    }
  }
});
