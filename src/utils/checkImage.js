let checkImage = function (urlTocheck) {
  var image = new Image();
  image.src = urlTocheck;
  if (image.width == 0) {
    return false;
  } else {
    return true;
  }
};
export default checkImage;
