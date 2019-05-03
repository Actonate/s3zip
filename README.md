## S3Zip

[![npm version](https://badge.fury.io/js/s3zip.svg)](https://www.npmjs.com/package/s3zip)
[![CircleCI](https://circleci.com/gh/smarchetti/s3zip.svg?style=shield&circle-token=7072b60c32d16edc8b813d665e4d51ab629d9441)](https://circleci.com/gh/smarchetti/s3zip)

S3Zip is a lightweight library that creates a zip file from files in a S3 bucket and stores the zip file in the same S3 bucket.

## Install

```bash
$ npm install s3zip
```

## Usage

```javascript
zipFiles({keys, bucket, outputFile, s3})
```
**Arguments**

- __keys *([string])*__: an array of S3 keys<br>
- __bucket  *(string)*__ : an S3 bucket<br>
- __outputFile *(string)*__ : the destination key for the zip file on S3<br>
- __s3 *(object)*__ : AWS S3 instance
- __acl *string)*__ : Pass acl string, for public - 'public-read'
**Returns**

- __*(Promise)*__: Returns a promise of the S3 upload operation

## Example

```javascript
const AWS = require('aws-sdk')
const {zipFiles} = require('s3zip')

zipFiles({
  keys: ['file1.txt', 'file2.txt']),
  bucket: 'some-bucket',
  outputFile: 'files.zip',
  acl: 'public-read',
  s3: new AWS.S3({accessKeyId, secretAccessKey})
})
.then(console.log)
/*
{
  ETag: '"52344a8de6c541c261b9d2e3bda6fda2"',
  Location: 'https://some-bucket.s3.amazonaws.com/files.zip',
  key: 'files.zip',
  Key: 'files.zip',
  Bucket: 'some-bucket'
}
*/

```
