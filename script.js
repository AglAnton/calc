$('body').on('click', '.btn-delete', function() {
  $(this).closest('.developer').remove();
});

$('body').on('click', '.btn-add', function() {
  let devs = '';
  for (let id in developers) {
    devs += `
      <option value="${id}">${developers[id].name}</option>
    `;
  }
  $('.developers').append(`
    <div class="row developer">
      <div class="col-md-3 col-12 mb-3">
        <select class="form-select dev-id">
          <option selected>Разработчик</option>
          ${devs}
        </select>
      </div>
      <div class="col-md-3 col-12 mb-3">
        <div class="input-group">
          <div class="input-group-text">Ч</div>
          <input type="text" class="form-control time" placeholder="Время">
        </div>
      </div>
      <div class="col-md-3 offset-md-3 col-12 offset-0 mb-4 text-end">
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
    let devId = $(el).find('.dev-id').val(); 
    let time = parseFloat($(el).find('.time').val());

    if (!devId || !time) isError = true;
    
    let name = developers[devId].name;
    let price = developers[devId].price;

    result[name] = price * time;
    budget -= price * time;
  });

  if (isError) {
    alert('Заполните все поля!');
    return;
  }

  let html = '';
  html += '<hr><h4>Программисты</h4>';
  for (let name in result) {
    html += `
      <p>${name} - <i>${numberWithSpaces(result[name].toFixed(2))}&#8381;</i></p>
    `;
  }
  result = [];
  if (budget > 0) {
    html += '<hr><h4>Бизнес</h4>';
    result['Бюджет'] = budget * 0.3;
    result['Антон'] = budget * 0.35;
    result['Саша'] = budget * 0.35;
  }

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