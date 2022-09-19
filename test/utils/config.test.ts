import mock from 'mock-fs'
import test, { expect } from '@oclif/test'
import { readRsxConfig } from '../../src/utils/config'

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
            .it(
                'should return .rsxrc parsed as a json object, if it exists',
                async () => {
                    expect(await readRsxConfig()).to.eql({
                        dest: 'bin',
                        typescript: false,
                        style: 'css',
                        extraOptions: {},
                    })
                },
            )

        test.do(() =>
            mock({
                nothing: {},
            }),
        ).it('return an empty object if there is no config file', async () => {
            expect(await readRsxConfig()).to.eql({})
        })
    })
})
