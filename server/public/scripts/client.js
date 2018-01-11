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
    $('#koalaList').on('click', '.submitButton', submitEditedKoala);
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
                // Update the following to use template literals - back ticks
                let $listItem = $(`<li class="koalaItem jumbotron" data-id="${koala.id}">`);
                $listItem.append(`<h2 class="name" data-name="${koala.name}">${koala.name}</h2>`);
                $listItem.append(`<p class="age" data-age="${koala.age}">Age: ${koala.age}</p>`);
                $listItem.append(`<p class="gender" data-gender="${koala.gender}">Gender: ${koala.gender}</p>`);
                $listItem.append(`<p class="transferrable" data-transfer="${koala.ready_to_transfer}">Ready to Transfer? ${koala.ready_to_transfer}</p>`);
                $listItem.append(`<p class="notes">${koala.notes}</p>`);
                $listItem.append(transferButton);
                $listItem.append(`<button class="deleteButton btn btn-info">Delete</button>`);
                $listItem.append(`<button class="editButton btn btn-info">Edit</button>`);
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

let editedKoala = {};

function editKoala() {
    let $koalaBlock = $(this).parents('.koalaItem');
    // Get the existing data and update the fields to inputs
    let koalaName = $koalaBlock.find('.name').data('name');
    $koalaBlock.find('.name').replaceWith(`<p>Name:</p><input class="new-name" value="${koalaName}" />`);

    let koalaAge = $koalaBlock.find('.age').data('age');
    $koalaBlock.find('.age').replaceWith(`<p>Age:</p><input class="new-age" value="${koalaAge}" />`);

    let koalaGender = $koalaBlock.find('.gender').data('gender');
    $koalaBlock.find('.gender').replaceWith(`<p>Gender:</p><input class="new-gender" value="${koalaGender}" />`);

    let koalaTransfer = $koalaBlock.find('.transferrable').data('transfer');
    $koalaBlock.find('.transferrable').replaceWith(`<p>Ready To Transfer:</p><input class="new-transferrable" value="${koalaTransfer}" />`);
    
    let koalaNotes = $koalaBlock.find('.notes').text();
    $koalaBlock.find('.notes').replaceWith(`<p>Notes:</p><input class="new-notes" value="${koalaNotes}" />`);
    
    // call toggleKoalaButtons
    
    // add a Submit button
    $koalaBlock.append(`<button class="btn btn-info submitButton">Submit</button>`);

    // TODO later: Decide on behavior for multiple edit buttons pressed
}


function toggleKoalaButtons() {

}

function submitEditedKoala() {
    let $koalaBlock = $(this).parents('.koalaItem');
    // update the editedKoala object to get ready to send the updated info
    editedKoala = {
        id: $koalaBlock.data('id'),
        name: $koalaBlock.find('.new-name').val(),
        gender: $koalaBlock.find('.new-gender').val(),
        age: $koalaBlock.find('.new-age').val(),
        transferrable: $koalaBlock.find('.new-transferrable').val(),
        notes: $koalaBlock.find('.new-notes').val() 
    }
    // call toggleKoalaButtons

    // show Ready for Transfer, Delete buttons, 

    // PUT request to update the koala with editedKoala object
    console.log('editedKoala.id', editedKoala);

    $.ajax({
        method: 'PUT',
        url: '/koalas/update/' + editedKoala.id,
        data: editedKoala,
        success: function(response) {
            console.log('response:', response);
            // call getKoalas on success
            getKoalas();
        }
    });
}