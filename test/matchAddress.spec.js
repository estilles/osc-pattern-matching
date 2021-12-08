const { matchAddress } = require('../src')
const { expect } = require('chai')

describe('matchAddress(pattern, address)', function () {
	describe('with `trueFalse` set to `false`', function () {
		describe('existing addresses', function () {
			it('should match an exact address', function () {
				expect(matchAddress('/first/this/one', '/first/this/one', true)).to.be.true
			})

			it('should match using "*" character', function () {
				expect(matchAddress('/first/*', '/first/this/one, true')).to.be.true
				expect(matchAddress('/first/*/*', '/first/this/one', true)).to.be.true
				expect(matchAddress('/first/this/*', '/first/this/one', true)).to.be.true
			})

			it('should match using "?" character', function () {
				expect(matchAddress('/first/this/on?', '/first/this/one', true)).to.be.true
				expect(matchAddress('/first/this/???', '/first/this/one', true)).to.be.true
				expect(matchAddress('/f????/t???/o??', '/first/this/one', true)).to.be.true
			})

			it('should match using "{foo,bar,baz}"', function () {
				expect(matchAddress('/first/this/{one,two,three}', '/first/this/one', true)).to.be.true
			})
		})

		describe('non-existing addresses', function () {
			it('should not match an non-existing address', function () {
				expect(matchAddress('/first/this/bad', '/first/this/one', true)).to.be.false
				expect(matchAddress('/second/this/*', '/first/this/one', true)).to.be.false
				expect(matchAddress('/first/this/?', '/first/this/one', true)).to.be.false
				expect(matchAddress('/first/this/{foo,bar,baz}', '/first/this/one', true)).to.be.false
			})
		})
	})
	describe('with `trueFalse` set to `true`', function () {
		describe('existing addresses', function () {
			it('should match an exact address', function () {
				expect(matchAddress('/first/this/one', '/first/this/one', true)).to.be.true
			})

			it('should match using "*" character', function () {
				expect(matchAddress('/first/*', '/first/this/one, true')).to.be.true
				expect(matchAddress('/first/*/*', '/first/this/one', true)).to.be.true
				expect(matchAddress('/first/this/*', '/first/this/one', true)).to.be.true
			})

			it('should match using "?" character', function () {
				expect(matchAddress('/first/this/on?', '/first/this/one', true)).to.be.true
				expect(matchAddress('/first/this/???', '/first/this/one', true)).to.be.true
				expect(matchAddress('/f????/t???/o??', '/first/this/one', true)).to.be.true
			})

			it('should match using "{foo,bar,baz}"', function () {
				expect(matchAddress('/first/this/{one,two,three}', '/first/this/one', true)).to.be.true
			})
		})

		describe('non-existing addresses', function () {
			it('should not match an non-existing address', function () {
				expect(matchAddress('/first/this/bad', '/first/this/one', true)).to.be.false
				expect(matchAddress('/second/this/*', '/first/this/one', true)).to.be.false
				expect(matchAddress('/first/this/?', '/first/this/one', true)).to.be.false
				expect(matchAddress('/first/this/{foo,bar,baz}', '/first/this/one', true)).to.be.false
			})
		})
	})
})
