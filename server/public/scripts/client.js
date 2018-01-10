$(document).ready(readySetGo);

function readySetGo() {
    console.log('readySetGo working');
    // Display koalas onload
    getKoalas();

    // Event Listeners
    $('#addKoala').on('click', addKoalas);
    $('#koalaList').on('click', '.transferButton', updateTransferStatus);
    $('#koalaList').on('click', '.deleteButton', deleteKoala);
    $('#koalaList').on('click', '.editButton', editKoala);
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
                    transferButton = '<button class="transferButton btn btn-info">Ready for Transfer</button>';
                }
                let $listItem = $(`<li class="koalaItem jumbotron" data-id="${koala.id}">`);
                $listItem.append(`<h2 class="name" data-name="${koala.name}">${koala.name}</h2>`);
                $listItem.append(`<p class="age" data-age="${koala.age}">Age: ${koala.age} </p>`);
                $listItem.append(`<p class="gender" data-gender="${koala.gender}">Gender: ' + ${koala.gender} + '</p>`);
                $listItem.append(`<p class="transferrable" data-transfer="${koala.ready_to_transfer}">Ready to Transfer? ' + ${koala.ready_to_transfer} + '</p>`);
                $listItem.append(`<p class="notes" data-notes="${koala.notes}">Notes: ' + ${koala.notes} + '</p>`);
                $listItem.append(transferButton);
                $listItem.append('<button class="deleteButton btn btn-info">Delete</button>');
                $listItem.append('<button class="editButton btn btn-info">Edit</button>');
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
        },
        error: function(response) {
            alert('Fill out all input fields, you silly koala person.');
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

function editKoala() {
    let koalaName = $(this).parents('.koalaItem').find('.name').text();
    $(this).parents('.koalaItem').find('.name').replaceWith(`<input value=${koalaName} />`);

    let koalaAge = $(this).parents('.koalaItem').find('.age').data('age');
    $(this).parents('.koalaItem').find('.age').replaceWith(`<input value="${koalaAge}" />`);

    let koalaGender = $(this).parents('.koalaItem').find('.gender').text();
    $(this).parents('.koalaItem').find('.gender').replaceWith(`<input value=${koalaGender} />`);

    let koalaTransfer = $(this).parents('.koalaItem').find('.transferrable').text();
    $(this).parents('.koalaItem').find('.transferrable').replaceWith(`<input value=${koalaTransfer} />`);
    
    let koalaNotes = $(this).parents('.koalaItem').find('.notes').text();
    $(this).parents('.koalaItem').find('.notes').replaceWith(`<input value=${koalaNotes} />`);

    // let editedKoala = {
    //     name: $('#koalaName').val(),
    //     gender: $('#koalaGender').val(),
    //     age: $('#koalaAge').val(),
    //     transferrable: $('#readyToTransfer').val(),
    //     notes: $('#koalaNotes').val() 
    // }
}