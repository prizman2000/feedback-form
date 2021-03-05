document.addEventListener('DOMContentLoaded', () => {
    const button = document.getElementById('submit');

    let formInfo = {
        valid: false
    };

    const getInfo = () => {
        formInfo.name = document.getElementById('name').value;
        formInfo.phone = document.getElementById('phone').value;
        formInfo.email = document.getElementById('email').value;
        formInfo.message = document.getElementById('message').value;
    }

    const checkInfo = (props) => {
        let valid = true;
        let regPhone = /^(\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/;
        let regEmail = /^(\w)+(@([a-z]+(.[a-z]+)))$/;
        if(!regPhone.test(props.phone)){
            valid = false;
            document.getElementById('phone__error').innerText = 'Телефон должен соответствовать формату: +7 (423) 123-45-67';
        }
        if(!regEmail.test(props.email)){
            valid = false;
            document.getElementById('email__error').innerText = 'Email должен соответствовать формату: name@example.com';
        }
        if(formInfo.name.length === 0){
            valid = false;
            document.getElementById('name__error').innerText = 'Поле "ФИО" обязательно для заполнения';
        }
        return valid;
    }

    async function postData(url = '', data = {}){
        const response = await fetch(url, {
            method: 'POST',
            mode: 'no-cors',
            cache: 'no-cache',
            body: JSON.stringify(data)
        });
        return await response.json();
    }

    button.addEventListener('click', () => {

        getInfo();

        formInfo.valid = checkInfo(formInfo);

        if(formInfo.valid){
            document.getElementById('phone__error').innerText = '';
            document.getElementById('email__error').innerText = '';
            document.getElementById('name__error').innerText = '';
            postData('https://vk.com/neu_net', formInfo)
                .then(data => console.log(data))
                .catch(err => console.log('Что-то пошло не так :(', err));
        }
    });
});