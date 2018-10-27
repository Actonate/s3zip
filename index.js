'use strict'

const _ = require('lodash')
const archiver = require('archiver')

const zipFiles = ({keys, bucket, outputFile, s3}) => {
  if (!keys || !bucket || !outputFile || !s3) throw new Error('keys, bucket, outputFile and s3 are required')
  if (!_.isArray(keys) || !keys.length) throw new Error('keys must be an array with at least one item')
  const archive = archiver('zip', {zlib: { level: 9 }})
  archive.on('error', err => {throw err})
  _.each(keys, key => archive.append(s3.getObject({Bucket: bucket, Key: key}).createReadStream(), { name: _.last(key.split('/')) }))
  archive.finalize()
  return s3.upload({Bucket: bucket, Key: outputFile, Body: archive}).promise()
}

module.exports.zipFiles = zipFiles
