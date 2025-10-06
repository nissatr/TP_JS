const todoList = [{
  name: 'review course',
  dueDate: '2025-09-29'
}];

renderTodoList();

function renderTodoList() {
  let todoListHTML = '';


  // Parcourir chaque tâche et générer le HTML
  todoList.forEach((todoObject, index) => {
    const { name, dueDate } = todoObject;
    const html = `
      <div class="todo-item">
        <span>${name}</span>
        <span>${dueDate}</span>
        <button class="delete-todo-button" data-index="${index}">Supprimer</button>
      </div>
    `;
    todoListHTML += html;
  });

  // Afficher le HTML généré dans l'élément avec la classe js-todo-list
  document.querySelector('.js-todo-list').innerHTML = todoListHTML;

  // Ajouter un eventListener à chaque bouton supprimer
  const deleteButtons = document.querySelectorAll('.delete-todo-button');
  deleteButtons.forEach((button) => {
    button.addEventListener('click', (event) => {
      const index = event.target.dataset.index;
      todoList.splice(index, 1);
      renderTodoList();
    });
  });

}

document.querySelector('.js-add-todo-button')
  .addEventListener('click', () => {
    addTodo();
  });

function addTodo() {
  const inputElement = document.querySelector('.js-name-input');
  const name = inputElement.value;

  const dateInputElement = document.querySelector('.js-due-date-input');
  const dueDate = dateInputElement.value;

  // Ajouter la nouvelle tâche au tableau todoList
  if (name && dueDate) {
    todoList.push({ name, dueDate });
  }

  inputElement.value = '';
  dateInputElement.value = '';

  renderTodoList();
}