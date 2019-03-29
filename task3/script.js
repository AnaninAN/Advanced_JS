const validation = (name, phone, email) => {
    const regexpName = /^[a-za-яё]+$/i;
    const regexpPhone = /^\+7\(\d{3}\)\d{3}-\d{4}$/;
    const regexpEmail = /^([a-z\.-]+)@([a-z]+)\.([a-z]{2})$/i;
    
    if(!regexpName.test(name.value)) name.classList.add('err');
    if(!regexpPhone.test(phone.value)) phone.classList.add('err');
    if(!regexpEmail.test(email.value)) email.classList.add('err');
    
};

function init() {
    const $name = document.querySelector('#name');
    const $phone = document.querySelector('#phone');
    const $email = document.querySelector('#email');
    const $send = document.querySelector('#send');
    const $form = document.getElementsByTagName('form')[0];
    
    $send.addEventListener('click', () => {
        validation($name,$phone,$email);
        
        if(document.querySelectorAll('.err').length === 0)
            alert('Форма заполнена верно!');   
        else
            alert('Введите поля согласно формату!');
    });
    
    $form.addEventListener('click', (e) => {
        if(e.target.tagName === 'INPUT') {
            e.target.classList.remove('err');
        }
    });
}

window.addEventListener('load', init);