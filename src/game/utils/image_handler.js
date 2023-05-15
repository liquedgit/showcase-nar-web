export function loadImage(url) {
    let img = new Image();
    img.src = url;

    return img;
}

export function getImagePath(directory_path, folder, id) {
    let res = directory_path + "/" + folder + "/tile";

    let num_string = ""
    let counter = 3;

    while(counter > 0) {
        let temp = id % 10;
        num_string = temp + num_string;
        id /= 10;
        id = Math.floor(id)

        counter--;
    }

    res += num_string + ".png";
    return res;
}

