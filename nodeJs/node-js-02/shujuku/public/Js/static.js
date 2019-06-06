function bigImg(obj) {
    var image = new Image(); 
    var path = obj.src;
    image.src = path;        
    var width = image.width; 
    var hight = image.height;

    $("#bigImg").attr('src', path);
    $(".show-bigImg").css({ "margin-top": -hight / 2, "margin-left": -width / 2 });
    $(".mengceng").css("display", "block");
    if (width > 1200) {
        $(".show-bigImg").css({ "margin-left": -1200 / 2 });
    }
    if (hight > 800) {
        $(".show-bigImg").css({ "margin-top": -800 / 2 });
    }
}
function closeImg(obj) {
    $("#bigImg").attr('src', "");
    $(".mengceng").css("display", "none");
}