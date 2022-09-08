import mock from 'mock-fs'
import test, {expect} from '@oclif/test'
import {readRsxConfig} from '../../src/utils/config'

describe('Config utility functions (util/config.ts)', () => {
    describe('readRsxConfig', () => {
        test.do(() =>
            mock({
                '.rsxrc': JSON.stringify({
                    dest: 'bin',
                    typescript: false,
                    style: 'css',
                    extraOptions: {},
                }),
            }),
        )
            .finally(mock.restore)
            .it('should return .rsxrc parsed as a json object', async () => {
                expect(await readRsxConfig()).to.eql({
                    dest: 'bin',
                    typescript: false,
                    style: 'css',
                    extraOptions: {},
                })
            })
    })
})
