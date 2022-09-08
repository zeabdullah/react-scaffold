import mock from 'mock-fs'
import {expect} from '@oclif/test'
import * as hp from '../../src/helpers'

describe('Helper methods', () => {
    describe('getSubdirectories', () => {
        before(() =>
            mock({
                path: {
                    to: {
                        dir1: {file1: 'text 1'},
                        dir2: {file2: 'text 2'},
                    },
                },
            }),
        )

        it('should return the list of subdirectories of a given root folder', async () => {
            expect(await hp.getSubdirectories(process.cwd())).to.eql([
                'path',
                'path/to',
                'path/to/dir1',
                'path/to/dir2',
            ])
        })

        after(mock.restore)
    })
})
