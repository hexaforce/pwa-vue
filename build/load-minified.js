'use strict'

import { readFileSync } from 'fs';
import { minify } from 'uglify-es';

export default function(filePath) {
  const code = readFileSync(filePath, 'utf-8')
  const result = minify(code)
  if (result.error) return ''
  return result.code
}
