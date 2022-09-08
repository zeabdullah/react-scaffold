import mock from 'mock-fs'
import {expect} from '@oclif/test'
import {getSubdirectories, isPascalCase} from '../../src/helpers'

describe('Helper methods', () => {
    describe('isPascalCase', () => {
        it('should return return true if string is in PascalCase', () => {
            expect(isPascalCase('ImInPascalCase')).to.be.true
            expect(isPascalCase('Mystring')).to.be.true
            expect(isPascalCase('AnotherPascalcasestring')).to.be.true

            expect(isPascalCase('myString')).to.be.false
            expect(isPascalCase('mystring')).to.be.false
            expect(isPascalCase('notPascalCase')).to.be.false
        })
    })

    describe('getSubdirectories', () => {
        before(() =>
            mock({
                path: {
                    to: {
                        dir1: {
                            file1: 'text 1',
                        },
                        dir2: {
                            file2: 'text 2',
                        },
                    },
                },
            }),
        )

        it('should return the list of subdirectories of a given root folder', async () => {
            expect(await getSubdirectories(process.cwd())).to.eql([
                'path',
                'path/to',
                'path/to/dir1',
                'path/to/dir2',
            ])
        })

        after(mock.restore)
    })
})
