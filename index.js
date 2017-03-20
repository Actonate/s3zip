'use strict'

const _ = require('lodash')
const archiver = require('archiver')
const AWS = require('aws-sdk')
const Promise = require('bluebird')

// set Bluebird as the promise library for the AWS SDK
AWS.config.setPromisesDependency(Promise)

const zipFiles = ({keys, bucket, outputFile, accessKeyId, secretAccessKey}) => {
  const s3 = new AWS.S3({accessKeyId, secretAccessKey})
  if (!keys || !bucket || !outputFile || !accessKeyId || !secretAccessKey) throw new Error('keys, bucket, outputFile, accessKeyId and secretAccessKey are required')
  if (!_.isArray(keys) || !keys.length) throw new Error('keys must be an array with at least one item')
  const archive = archiver('zip', {zlib: { level: 9 }})
  archive.on('error', err => {throw err})
  _.each(keys, key => archive.append(s3.getObject({Bucket: bucket, Key: key}).createReadStream(), { name: _.last(key.split('/')) }))
  archive.finalize()
  return s3.upload({Bucket: bucket, Key: outputFile, Body: archive}).promise()
}

module.exports.zipFiles = zipFiles
