(function () {

  var opt = null;

  var imageData = null;
  var index = 0;


  function showImage(index) {
    var image = imageData.images[index];
    var node = $('#' + opt.domId);
    if (image.teaser) {
      // imgNode.hide();
      node.addClass('teaser');
      return;
    }
    node.removeClass('teaser');
    var imgNode = $('#' + opt.domId + '_image');
    imgNode.attr('src', opt.folder + '/.thumbs/750-' + image.filename);
    imgNode.attr('title', image.filename);

    var timePart = '';
    if (image.exif && image.exif.time) {
      var d = new Date(image.exif.time);
      timePart = ' - ' + d.toLocaleDateString() + ' ' + d.toLocaleTimeString();
    }
    $('#impleIfs_metainfo').text(image.filename + timePart);
  }

  window.SimpleIfs = {
    init: function (options) {
      opt = options;
      $.get(options.folder + '/meta-first.json', function (data) {
        imageData = data;
        imageData.images.push({
          teaser: true
        });
        showImage(0);
      });
    },

    previous: function () {
      index = (index - 1 + imageData.images.length) % imageData.images.length;
      showImage(index);
    },

    next: function () {
      index = (index + 1) % imageData.images.length;
      showImage(index);
    }
  };
})();
