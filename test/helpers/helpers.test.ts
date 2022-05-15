import {expect, test} from '@oclif/test'
import {isPascalCase} from '../../src/helpers'

describe('Helper methods', () => {
  describe('isPascalCase', () => {
    test
    .it('should return return true if string is in PascalCase', () => {
      expect(isPascalCase('ImInPascalCase')).to.be.true
      expect(isPascalCase('Mystring')).to.be.true
      expect(isPascalCase('AnotherPascalcasestring')).to.be.true
    })

    test
    .it('should return false otherwise', () => {
      expect(isPascalCase('myString')).to.be.false
      expect(isPascalCase('mystring')).to.be.false
      expect(isPascalCase('notPascalCase')).to.be.false
    })
  })
})
