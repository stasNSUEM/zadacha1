let persons = ["Олег", "Оксана", "Евгений", "Алексей", "Степан", "Михаил", "Мария", "Наталья", "Валерия", "Дмитрий"];

function swapPersons(fromSeat, toSeat) {
  if (fromSeat === toSeat) return;

  let temp = persons[fromSeat];
  persons[fromSeat] = persons[toSeat];
  persons[toSeat] = temp;

  $('[data-seat="' + fromSeat + '"]').html(persons[fromSeat]);
  $('[data-seat="' + toSeat + '"]').html(persons[toSeat]);

  list.find('li').eq(fromSeat).html(persons[fromSeat]);
  list.find('li').eq(toSeat).html(persons[toSeat]);
}

let list = $('#list');
let seats = $('.seat').sort(function(a, b) {
  let aSeat = Number(a.getAttribute('data-seat'));
  let bSeat = Number(b.getAttribute('data-seat'));
  if (aSeat > bSeat) return 1;
  if (aSeat < bSeat) return -1;
  return 0;
});

seats.draggable({
  helper: 'clone'
});
seats.droppable({
  activeClass: 'active',
  hoverClass: 'hover',
  drop: function(event, ui) {
    let draggable = ui.draggable,
      droppable = $(this);
    let fromSeat = Number(droppable.attr('data-seat'));
    let toSeat = Number(draggable.attr('data-seat'));
    swapPersons(fromSeat, toSeat);
  }
});
seats.each(function(i) {
  $(this).html(persons[i]);
  list.append('<li>' + persons[i] + '</li>');
});