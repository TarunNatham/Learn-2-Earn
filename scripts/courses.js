let itemID;

document.querySelectorAll('.link').forEach(item => {
  item.addEventListener('click', event => {
    localStorage.setItem('questionType', item.id);
    window.open('/problems', '_self');
  })
})