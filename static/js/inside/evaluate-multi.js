// functions and variables with ids and names
function get_files_apply(id, onload_function) {
    $(function () {
        $("#"+id).change(function () {
            if (this.files) {
                for (i = 0; i < this.files.length; i++) {
                    var reader = new FileReader();
                    reader.onload = function (item) {
                        resize_image_uri(item.target.result, onload_function);
                    }
                    reader.readAsDataURL(this.files[i]);
                }
            }
        });
    });
}
function onload_picture(image_uri) {
    image_string = image_uri;

    var temp = document.getElementById("results-template");
    var clone = document.importNode(temp.content, true);

    const unique_id = uuidv4()
    const photo_id = "photo" + unique_id
    const wrong_table_0_id = "wrong-answers-table-0" + unique_id
    const wrong_table_1_id = "wrong-answers-table-1" + unique_id
    const overall_score_id = "overall-score" + unique_id
    clone.getElementById("photo").id = photo_id
    clone.getElementById("wrong-answers-table-0").id = wrong_table_0_id
    clone.getElementById("wrong-answers-table-1").id = wrong_table_1_id
    clone.getElementById("overall-score").id = overall_score_id
    
    document.getElementById("results-row").appendChild(clone)

    display_image(image_string, photo_id);
    json = {"image_uri":image_string,
            "collect":document.getElementById("enable-collection").checked};
    json_post(json,
              JSON_URL,
              function (response){
                    display_response_data(response,
                                          "right-answers-table-0",
                                          "right-answers-table-1",
                                          wrong_table_0_id,
                                          wrong_table_1_id,
                                          overall_score_id,
                                          "credits");
              },
              something_wrong);
}
get_files_apply("image_file", onload_picture);
