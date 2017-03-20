const expect = require('chai').expect
const zipFiles = require('./index').zipFiles

describe('s3zip', () => {
  describe('zipFiles', () => {
    it('throw an error when accessKeyId is undefined', () => {
      expect(() => {
        zipFiles({
          keys: ['key'],
          bucket: 'bucket',
          outputFile: 'output',
          secretAccessKey: 'secretAccessKey'
        })
      }).to.throw(Error)
    })

    it('throw an error when secretAccessKey is undefined', () => {
      expect(() => {
        zipFiles({
          keys: ['key'],
          bucket: 'bucket',
          outputFile: 'output',
          accessKeyId: 'accessKeyId'
        })
      }).to.throw(Error)
    })

    it('throw an error when accessKeyId is keys', () => {
      expect(() => {
        zipFiles({
          bucket: 'bucket',
          outputFile: 'output',
          accessKeyId: 'accessKeyId',
          secretAccessKey: 'secretAccessKey'
        })
      }).to.throw(Error)
    })

    it('throw an error when bucket is keys', () => {
      expect(() => {
        zipFiles({
          keys: ['key'],
          outputFile: 'output',
          accessKeyId: 'accessKeyId',
          secretAccessKey: 'secretAccessKey'
        })
      }).to.throw(Error)
    })

    it('throw an error when outputFile is keys', () => {
      expect(() => {
        zipFiles({
          keys: ['key'],
          bucket: 'bucket',
          accessKeyId: 'accessKeyId',
          secretAccessKey: 'secretAccessKey'
        })
      }).to.throw(Error)
    })

    it('throw an error when keys is not an array or keys is an empty array', () => {
      expect(() => {
        zipFiles({
          keys: 'key',
          bucket: 'bucket',
          outputFile: 'output',
          accessKeyId: 'accessKeyId',
          secretAccessKey: 'secretAccessKey'
        })
      }).to.throw(Error)
    })
  })
})
