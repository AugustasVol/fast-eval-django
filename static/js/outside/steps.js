//function to show and hide element
function steps(arr) {
    // an array of elements to hide and show
    for (i = 0; i < arr.length; ++i) {
        elem = document.getElementById(arr[i]);
        if (elem.hidden == false) {
            elem.hidden = true;
            i++;
            if (i >= arr.length) {
                i = 0;
            }
            elem = document.getElementById(arr[i]);
            elem.hidden = false;
            return;
        }
    }
}