// global setup
$.ajaxSetup({
    cache: false,
    headers: {
        'Cache-Control': 'no-cache'
    }
});
// helper function to display and delete elements
function empty_element(id) {
    $("#" + id).empty();
}
function delete_image(image_id) {
    $("#" + image_id).attr("src","");
}
function display_image(image_string, image_id) {
    $('#' + image_id).attr('src', image_string);
}
function replace_text(id, text) {
    $("#" + id).text(text);
}
function delete_wrong_tables(id_0,id_1,id_score) {
    empty_element(id_0);
    empty_element(id_1);
    empty_element(id_score);
}

// functions to create one side of table
function create_right_table(num_rows, start_num,table_id, options_names) {
    if (options_names == null) {
        options_names = OPTIONS_NAMES;
    }
    
    empty_element(table_id);

    var table = document.getElementById(table_id);
    for (i = start_num; i < num_rows + start_num; i++) {
        
        var row = table.insertRow(-1);
        var cell0 = row.insertCell(0);
        var cell1 = row.insertCell(1);
        
        cell0.innerHTML = i + 1;
        var selector = document.createElement("select");
        const options_len = options_names.length;
        for (a = 0; a < options_len; ++a) {
            var option = document.createElement("option");
            option.innerHTML = options_names[a]
            selector.appendChild(option)
        }
        option.selected = true;
        
        cell1.appendChild(selector);
    }
}
function create_wrong_table(table_id, arr,start_num, options_names) {
    if (options_names == null) {
        options_names = OPTIONS_NAMES;
    }
    empty_element(table_id);
    var table = document.getElementById(table_id);
    for (i = 0; i < arr.length; ++i) {
        var row = table.insertRow(-1);
        var cell0 = row.insertCell(0);
        var cell1 = row.insertCell(1);
        
        cell0.innerHTML = start_num + i + 1;
        cell1.innerHTML = options_names[parseInt(arr[i])];
    }
}


// helper functions to create both sides of tables
function create_right_tables(table_0_id, table_1_id, num_q) {
    var start_0 = 0;
    var num_half = num_q / 2;
    var start_1 = num_half;
    create_right_table(num_half, start_0, table_0_id);
    create_right_table(num_half, start_1, table_1_id);
}


function create_wrong_tables(table_0_id, table_1_id, arr) {
    var half_num = parseInt(arr.length / 2);
    
    var arr_0 = arr.slice(0, half_num);
    var arr_1 = arr.slice(half_num , arr.length);
    
    create_wrong_table(table_0_id, arr_0, 0);
    create_wrong_table(table_1_id, arr_1, half_num);
}



// function to comapare one side of tables and color the cells
function compare_tables(right_table_id, wrong_table_id, right_color, wrong_color) {
    
    if (right_color == null) {
        right_color = "green";
    }
    if (wrong_color == null) {
        wrong_color = "red";
    }
    right_table = document.getElementById(right_table_id);
    wrong_table = document.getElementById(wrong_table_id);
    
    right_answers = 0;
    if (right_table.rows.length != wrong_table.rows.length) {
        console.log("not equal length");
        return -1;
    }
    for (i = 0; i < right_table.rows.length; ++i) {
        console.log(i)
        right_answer = right_table.rows[i].cells[1].childNodes[0].value;
        wrong_answer = wrong_table.rows[i].cells[1].innerHTML;
        if (right_answer == wrong_answer) {
            ++right_answers;
            wrong_table.rows[i].cells[1].bgColor = right_color;
        }
        else {
            wrong_table.rows[i].cells[1].bgColor = wrong_color;
        }
    }
    
    return (right_answers / right_table.rows.length)
    
}

//helper function to comapare all tables and show overall score
function compare_all(right_table_0_id,
                     right_table_1_id,
                     wrong_table_0_id,
                     wrong_table_1_id,
                     score_text_id) {
    percentage_right = 0.0;
    percentage_right = percentage_right + compare_tables(right_table_0_id, wrong_table_0_id);
    percentage_right = percentage_right + compare_tables(right_table_1_id, wrong_table_1_id);
    if (percentage_right >= 0) {
        score = (percentage_right / 2) * 100;
        $("#"+score_text_id).text(parseInt(score) + "%");
    }
}


// ajax function to send json to server
function json_post(json, link_uri, success_function, error_function) {
    $.ajax({
        headers: { "X-CSRFToken": Cookies.get("csrftoken") },
        type:"POST",
        url: link_uri,
        data: JSON.stringify(json),
        contentType: 'application/json',
        success: success_function ,
        error: something_wrong,
    })
};
function rotate_side_image_uri(uri, onload_function) {
    var img = document.createElement("img");
    img.onload = function () {
        var canvas = document.createElement("canvas");
        var ctx = canvas.getContext("2d");
        canvas.width = this.height;
        canvas.height = this.width;

        ctx.translate(parseInt(this.height / 2), parseInt(this.width / 2));
        ctx.rotate(ROTATE_DEGREES * Math.PI / 180);
        ctx.drawImage(this, -this.width / 2, -this.height / 2);

        var dataURI = canvas.toDataURL('image/jpeg', JPEG_QUALITY);
        onload_function(dataURI);
    }
    img.src = uri;
}
function resize_image_uri(uri, onload_function) {
    // Takes a data URI and returns the Data URI corresponding to the resized image at the wanted size.
        // We create an image to receive the Data URI
        var img = document.createElement('img');

        // When the event "onload" is triggered we can resize the image.
        img.onload = function()
            {        
                // We create a canvas and get its context.
                var canvas = document.createElement('canvas');
                var ctx = canvas.getContext('2d');

                // We set the dimensions at the wanted size.

                // determine the scale ration for resizing
                if (this.width > this.height) {
                    ratio = MAX_IMAGE_H / this.width;
                }
                else {
                    ratio = MAX_IMAGE_H / this.height;
                }

                new_height = parseInt(this.height * ratio);
                new_width = parseInt(this.width * ratio);
                canvas.width = new_width;
                canvas.height = new_height;
                console.log("image resize: "+ new_width+","+new_height);
                // We resize the image with the canvas method drawImage();
                ctx.drawImage(this, 0, 0, new_width, new_height);


                // rotate if needed
                if (this.width > this.height) {
                    var dataURI = canvas.toDataURL('image/png');
                    rotate_side_image_uri(uri, onload_function);
                }
                else {
                    var dataURI = canvas.toDataURL('image/jpeg', JPEG_QUALITY);
                    onload_function(dataURI);
                }
            };

        // We put the Data URI in the image's src attribute
        img.src = uri;
}
function get_file_apply(id, onload_function) {
    $(function () {
        $("#"+id).change(function () {
            if (this.files) {
                var reader = new FileReader();
                reader.onload = function (item) {
                    resize_image_uri(item.target.result, onload_function);
                }
                reader.readAsDataURL(this.files[0]);
            }
        });
    });
}
// alert functions about errors
function something_wrong() {
    alert("Try to refresh");
}
function try_again_photo() {
    alert("Photo is not clear, take picture again");
}

// function with information about json response from server about prediction
function display_response_data(response,
                               right_table_0_id,
                               right_table_1_id,
                               wrong_table_0_id,
                               wrong_table_1_id,
                               overall_score_id,
                               credits_id) {
    console.log(response);
    if (response["predicted"] == true) {
        arr = response["prediction"];
        create_wrong_tables(wrong_table_0_id, wrong_table_1_id, arr);
        compare_all(right_table_0_id,
                    right_table_1_id,
                    wrong_table_0_id,
                    wrong_table_1_id,
                    overall_score_id);
        replace_text(credits_id, response["credit"]);
    }
    else {
        replace_text(overall_score_id, "No prediction");
    }
}


// functions and variables with ids and names
function onload_picture(image_uri) {
    image_string = image_uri;
    delete_image("photo");
    delete_wrong_tables("wrong-answers-table-0","wrong-answers-table-1","overall-score");
    display_image(image_string, "photo");
    json = {"image_uri":image_string};
    json_post(json,
              JSON_URL,
              function (response){
                    display_response_data(response,
                                          "right-answers-table-0",
                                          "right-answers-table-1",
                                          "wrong-answers-table-0",
                                          "wrong-answers-table-1",
                                          "overall-score",
                                          "credits");
              },
              something_wrong);
}
// JSON_URL = "#"
ROTATE_DEGREES = 90;
JPEG_QUALITY = 0.7;
OPTIONS_NAMES = ["A", "B", "C", "D", "E","None"];
MAX_IMAGE_H = 2000;
get_file_apply("image_file", onload_picture);
