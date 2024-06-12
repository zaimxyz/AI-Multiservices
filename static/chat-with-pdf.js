const apiKey = 'sec_YG0HJOY8CAxiBwvChAPVE3jzPgx2uA4s';

$('#uploadBtn').on('click', function() {
    const fileInput = $('#pdfFile')[0].files[0];
    if (!fileInput) {
        alert('Please select a PDF file.');
        return;
    }

    const formData = new FormData();
    formData.append('file', fileInput);

    $('#loading').show();
    $.ajax({
        url: 'https://api.chatpdf.com/v1/sources/add-file',
        type: 'POST',
        headers: {
            'x-api-key': apiKey
        },
        data: formData,
        processData: false,
        contentType: false,
        success: function(response) {
            $('#loading').hide();
            $('#sourceIdContainer').html(`<p>Source ID: ${response.sourceId}</p>`);
            $('#chatContainer').show();
            $('#askBtn').data('source-id', response.sourceId);
        },
        error: function(jqXHR) {
            $('#loading').hide();
            alert('Error: ' + jqXHR.statusText);
        }
    });
});

$('#askBtn').on('click', function() {
    const sourceId = $(this).data('source-id');
    const question = $('#question').val();

    if (!question) {
        alert('Please enter a question.');
        return;
    }

    const data = {
        sourceId: sourceId,
        messages: [
            {
                role: "user",
                content: question
            }
        ]
    };

    $('#loading').show();
    $.ajax({
        url: 'https://api.chatpdf.com/v1/chats/message',
        type: 'POST',
        headers: {
            'x-api-key': apiKey,
            'Content-Type': 'application/json'
        },
        data: JSON.stringify(data),
        success: function(response) {
            $('#loading').hide();
            $('#answerContainer').html(`<p>Answer: ${response.content}</p>`);
        },
        error: function(jqXHR) {
            $('#loading').hide();
            alert('Error: ' + jqXHR.statusText);
        }
    });
});
