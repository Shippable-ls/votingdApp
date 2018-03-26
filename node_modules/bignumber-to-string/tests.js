const test = require('tape')
const BigNumber = require('bignumber.js')
const bigNumberToString = require('./index')

test('test array of bignumbers', function (t) {
  t.plan(2)

  const arr = [100, 'sdfsfds', [], [[]], new BigNumber(100), null, 22]
  const newArr = bigNumberToString(arr)

  t.deepEqual(typeof newArr[4], 'string')
  t.deepEqual(newArr[4], '100')
})

test('test object containing bignumbers', function (t) {
  t.plan(4)

  const obj = {nick: 100, bn2: new BigNumber(1000), john: '284jsfdhsd', kim: '222', bn: new BigNumber(22)}
  const newObj = bigNumberToString(obj)

  t.deepEqual(typeof newObj.bn2, 'string')
  t.deepEqual(newObj.bn2, '1000')
  t.deepEqual(typeof newObj.bn, 'string')
  t.deepEqual(newObj.bn, '22')
})

test('test deeply nested object containing bignumbers', function (t) {
  t.plan(10)

  const obj = {
    sdfk: 100,
    kkjkjsfdk: 'sdfsdfsd',
    bn: new BigNumber(1000),
    something: {
      bn: new BigNumber(10000),
      something: {
        something: {
          something: new BigNumber(800)
        }
      }
    }
  }
  const newObj = bigNumberToString(obj)

  t.deepEqual(typeof newObj.sdfk, 'number')
  t.deepEqual(newObj.sdfk, 100)
  t.deepEqual(typeof newObj.kkjkjsfdk, 'string')
  t.deepEqual(newObj.kkjkjsfdk, 'sdfsdfsd')
  t.deepEqual(typeof newObj.bn, 'string')
  t.deepEqual(newObj.bn, '1000')
  t.deepEqual(typeof newObj.something.bn, 'string')
  t.deepEqual(newObj.something.bn, '10000')
  t.deepEqual(typeof newObj.something.something.something.something, 'string')
  t.deepEqual(newObj.something.something.something.something, '800')
})

test('test deeply nested array containing bignumbers', function (t) {
  t.plan(8)
  const arr = [3333, [], new BigNumber(100), 'sfdfds', [[[[new BigNumber('300')]], [new BigNumber(10000)]], [new BigNumber(200)]]]
  const newArr = bigNumberToString(arr)

  t.deepEqual(typeof newArr[0], 'number')
  t.deepEqual(Array.isArray(newArr[1]), true)
  t.deepEqual(typeof newArr[2], 'string')
  t.deepEqual(newArr[2], '100')
  t.deepEqual(newArr[3], 'sfdfds')
  t.deepEqual(newArr[4][0][0][0][0], '300')
  t.deepEqual(newArr[4][1][0], '200')
  t.deepEqual(newArr[4][0][1][0], '10000')
})
