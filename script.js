$('body').on('click', '.btn-delete', function() {
  $(this).closest('.developer').remove();
});

$('body').on('click', '.btn-add', function() {
  $('.developers').append(`
    <div class="row developer">
      <div class="col-md-3 col-12 mb-3">
        <input type="text" class="form-control name" placeholder="Имя">
      </div>
      <div class="col-md-3 col-12 mb-3">
        <div class="input-group">
          <div class="input-group-text">Ч</div>
          <input type="text" class="form-control time" placeholder="Время">
        </div>
      </div>
      <div class="col-md-3 col-12 mb-3">
        <div class="input-group">
          <div class="input-group-text">&#8381;</div>
          <input type="text" class="form-control price" placeholder="Оплата за час">
        </div>
      </div>
      <div class="col-md-3 col-12 mb-3 text-end">
        <button class="btn btn-danger btn-delete">Удалить</button>
      </div>
    </div>
  `);
});

$('body').on('click', '.btn-result', function() {
  let isError = false;
  let budget = parseFloat($('.budget').val().replaceAll(' ', ''));
  if (!budget) isError = true;

  let result = {};

  $('.developer').each((i, el) => {
    let name = $(el).find('.name').val();
    let price = parseFloat($(el).find('.price').val());
    let time = parseFloat($(el).find('.time').val());

    if (!name || !price || !time) isError = true;
    
    result[name] = price * time;
    budget -= price * time;
  });

  if (isError) {
    alert('Заполните все поля!');
    return;
  }

  if (budget > 0) {
    result['Бюджет'] = budget * 0.3;

    if (result['Антон'])
      result['Антон'] += budget * 0.35;
    else 
      result['Антон'] = budget * 0.35;

    if (result['Саша'])
      result['Саша'] += budget * 0.35;
    else 
      result['Саша'] = budget * 0.35;
  }

  let html = '';
  for (let name in result) {
    html += `
      <p>${name} - <i>${numberWithSpaces(result[name].toFixed(2))}&#8381;</i></p>
    `;
  }

  $('.result').html(html);
});

$('.budget, .price').on('input change', function() {
  let val = $(this).val().replaceAll(' ', '');
  if (val) val = numberWithSpaces(val);
  $(this).val(val);
});

function numberWithSpaces(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}