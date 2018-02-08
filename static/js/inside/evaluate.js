// functions and variables with ids and names
function onload_picture(image_uri) {
    image_string = image_uri;
    delete_image("photo");
    delete_wrong_tables("wrong-answers-table-0","wrong-answers-table-1","overall-score");
    display_image(image_string, "photo");
    json = {"image_uri":image_string,
            "collect":document.getElementById("enable-collection").checked};
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
get_file_apply("image_file", onload_picture);
