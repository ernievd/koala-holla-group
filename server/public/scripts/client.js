$(document).ready(readySetGo);

function readySetGo() {
    console.log('readySetGo working');
    // Display koalas onload
    getKoalas();

    // Event Listeners
    $('#addKoala').on('click', addKoalas);
    $('#koalaList').on('click', '.transferButton', updateTransferStatus);
    $('#koalaList').on('click', '.deleteButton', deleteKoala);
}

function getKoalas() {
    $.ajax({
        method: 'GET',
        url: '/koalas',
        success: function(response) {
            $('#koalaList').empty();
            console.log('response from GET', response);
            for (let i = 0; i < response.length; i++) {
                const koala = response[i];
                let transferButton;

                if (koala.ready_to_transfer === true) {
                    koala.ready_to_transfer = "Yes";
                } else {
                    koala.ready_to_transfer = "No";
                    // Define a button for transfer
                    transferButton = '<button class="transferButton">Ready for Transfer</button>';
                }
                let $listItem = $('<li class="koalaItem" data-id="' + koala.id + '">');
                $listItem.append('<h2>' + koala.name + '</h2>');
                $listItem.append(`<p class="age">Age: ${koala.age} </p>`);
                $listItem.append('<p class="gender">Gender: ' + koala.gender + '</p>');
                $listItem.append('<p class="transferrable">Ready to Transfer? ' + koala.ready_to_transfer + '</p>');
                $listItem.append('<p class="notes">Notes: ' + koala.notes + '</p>');
                $listItem.append(transferButton);
                $listItem.append('<button class="deleteButton">Delete</button>');
                $('#koalaList').prepend($listItem);
            }
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

function updateTransferStatus() {
    const buttonId = $(this).parents('.koalaItem').data('id');
    console.log('buttonId', buttonId);
    
    $.ajax({
        method: 'PUT',
        url: '/koalas/' + buttonId,
        data: { ready_to_transfer: 'Y' },
        success: function(response) {
            console.log('response:', response);
            getKoalas();
        }
    });
}

function deleteKoala() {
    const buttonId = $(this).parents('.koalaItem').data('id');

    $.ajax({
        method: 'DELETE',
        url: '/koalas/' + buttonId,
        success: function(response) {
            console.log('response', response);
            getKoalas();
        }
    });
}