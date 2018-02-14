$('#add-task').on('click', function () {
    $('#new-task').toggle('slow', onNewToDoClosing);
});

$('#add-todo').on('keypress', function (e) {
    if (e.which === 13) {
        onNewToDoAdding();
    }
});

function onNewToDoClosing() {
    $(this).find('input').val('');
}

function onNewToDoAdding() {
    var $todo = $('#add-todo');
    var todoText = $todo.val();

    var ul = $('#todos-list');
    var li = document.createElement('li');
    var todoContent = document.createElement('div');
    todoContent.textContent = todoText;
    todoContent.className = 'todo-record-content';
    todoContent.onclick = markAsDone;

    var todoDelete = document.createElement('div');
    todoDelete.className = 'delete';
    todoDelete.onclick = deleteMe;
    var i = document.createElement('i');
    i.className = 'fa fa-trash';

    li.className = 'todo-record';
    todoDelete.appendChild(i);
    li.appendChild(todoContent);
    li.appendChild(todoDelete);
    li.onmouseenter = toggleDeleteButtonVisibility;
    li.onmouseleave = toggleDeleteButtonVisibility;
    li.setAttribute('data-id', $('#todos-list li').length + 1);
    ul.prepend(li);

    $todo.val('');
}

$('.todo-record-content').on('click', markAsDone);
$('#todos-list li').hover(toggleDeleteButtonVisibility);

function markAsDone() {
    $(this).toggleClass('strikeout');
}

function toggleDeleteButtonVisibility() {
    $(this).find('.delete').toggle();
}

function deleteMe() {
    $(this).parent().remove();
}

