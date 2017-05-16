var getJSON = require('get-json')


var buildUrl = function(album_id){
  return "https://jsonplaceholder.typicode.com/photos?albumId=" + album_id;
}

var process_data = function(data){
  var ret_data = []
  for (var i = 0; i < data.length; i++) {
    ret_data.push(format_data(data[i]));
  }
  return ret_data;
}

var format_data = function(data){
  return `[${data['id']}] ${data['title']}`;
}

var get_data = function(url){
  getJSON(url, function(err,resp){
   data = resp;
   let formatted_data = process_data(data)
   output_data(formatted_data)
 })
}

var output_data = function(data){
  for (var i = 0; i < data.length; i++) {
    console.log(data[i])
  }
}

var main = function(album_id){
  let url = buildUrl(album_id);
  console.log('photo-album ' + album_id);
  get_data(url);
}


module.exports = {
  main: main,
  get_data: get_data,
  process_data:process_data,
  buildUrl:buildUrl,
  format_data:format_data,
  output_data:output_data
}
