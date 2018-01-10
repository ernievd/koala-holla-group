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
            for (let i = 0; i < response.length; i++) {
                const koala = response[i];
                if (koala.ready_to_transfer === true) {
                    koala.ready_to_transfer = "Yes";
                } else {
                    koala.ready_to_transfer = "No";
                }
                let $listItem = $('<li>');
                $listItem.append('<h2>' + koala.name + '</h2>');
                $listItem.append('<p class="age">Age: ' + koala.age + '</p>');
                $listItem.append('<p class="gender">Gender: ' + koala.gender + '</p>');
                $listItem.append('<p class="transferrable">Ready to Transfer? ' + koala.ready_to_transfer + '</p>');
                $listItem.append('<p class="notes">Notes: ' + koala.notes + '</p>');
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