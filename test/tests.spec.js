let chai = require('chai');
let app = require('../app/main.js')
let sinon = require('sinon');
let getJSON = require('get-json')

beforeAll(function(){
  window.console.log = function() {} // Keeps tests clean
})


test('buildUrl should return url with id appended', function(){
  let result = app.buildUrl(1)
  chai.expect(result).to.eql("https://jsonplaceholder.typicode.com/photos?albumId=1")
})

test('process_data should return array', function(){
  let data = [{id:1,title:'yo'}, {id:2, title:'sup'}]

  let result = app.process_data(data)
  chai.expect(result).to.eql(["[1] yo", "[2] sup"])
})

test('format_data should return only id and title', function(){
  let test_data= {id:1, title:'yo', other:'abc'}
  let result = app.format_data(test_data)
  chai.expect(result).to.eql("[1] yo")
})

test('get_data should call getJson and process_data', function(){
  let getJSON_spy = sinon.spy(getJSON)
  let process_data_spy = sinon.spy(app, "process_data");
  let output_data_spy = sinon.spy(app, "output_data");
  let log_spy = sinon.spy(console, "log")

  let result = app.get_data("https://jsonplaceholder.typicode.com/photos?albumId=1")

  expect(getJSON_spy.calledOnce)
  expect(process_data_spy.calledOnce)
  expect(output_data_spy.calledOnce)
  expect(log_spy.called)

  log_spy.restore()
  output_data_spy.restore()
  process_data_spy.restore()
})

test('main should buildUrl and get_data',function(){
  let buildUrl_spy = sinon.spy(app, "buildUrl");
  let get_data_spy = sinon.spy(app, "get_data");

  app.main(1)
  expect(buildUrl_spy.calledOnce)
  expect(get_data_spy.calledOnce)

  get_data_spy.restore()
  buildUrl_spy.restore()

})

test('output_data should log each element of array', function(){
  let log_spy = sinon.spy(console, "log")
  app.output_data([1])
  expect(log_spy.calledOnce)

})
// window.console.log = old_log
