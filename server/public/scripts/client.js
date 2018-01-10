$(document).ready(readySetGo);

function readySetGo() {
    console.log('readySetGo working');
    // Display koalas onload
    getKoalas();

    // Event Listeners
    $('#addKoala').on('click', addKoalas);
}

function getKoalas() {
    $.ajax({
        method: 'GET',
        url: '/koalas',
        success: function(response) {
            console.log('response from GET', response);
            
        }
    });
}

function addKoalas() {
    let newKoala = {
        name: $('#koalaName').val(),
        gender: $('#koalaGender').val(),
        age: $('#koalaAge').val(),
        transferrable: $('#readyToTransfer').val(),
        notes: $('#koalaNotes').val() 
    };

    $.ajax({
        method: 'POST',
        url: '/koalas',
        data: newKoala,
        success: function(response) {
            console.log('response:', response);
            getKoalas();
        }
    });
}