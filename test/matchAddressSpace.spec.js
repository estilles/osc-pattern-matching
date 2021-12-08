const { matchAddressSpace } = require('../src')
const { expect } = require('chai')

const addressSpace = ['/first/this/one', '/second/1', '/second/2', '/third/a', '/third/b', '/third/c']

describe('matchPattern(pattern, addressSpace)', function () {
	describe('existing addresses', function () {
		it('should match an exact address', function () {
			expect(matchAddressSpace('/first/this/one', addressSpace)).to.deep.equal(['/first/this/one'])
		})

		it('should match using "*" character', function () {
			expect(matchAddressSpace('/first/*', addressSpace)).to.deep.equal(['/first/this/one'])
			expect(matchAddressSpace('/first/this/*', addressSpace)).to.deep.equal(['/first/this/one'])
			expect(matchAddressSpace('/second/*', addressSpace)).to.deep.equal(['/second/1', '/second/2'])
			expect(matchAddressSpace('/third/*', addressSpace)).to.deep.equal(['/third/a', '/third/b', '/third/c'])
		})

		it('should match using "?" character', function () {
			expect(matchAddressSpace('/first/this/on?', addressSpace)).to.deep.equal(['/first/this/one'])
			expect(matchAddressSpace('/first/this/???', addressSpace)).to.deep.equal(['/first/this/one'])
			expect(matchAddressSpace('/f????/t???/o??', addressSpace)).to.deep.equal(['/first/this/one'])
			expect(matchAddressSpace('/second/?', addressSpace)).to.deep.equal(['/second/1', '/second/2'])
		})

		it('should match using "{foo,bar,baz}"', function () {
			expect(matchAddressSpace('/first/this/{one,two,three}', addressSpace)).to.deep.equal(['/first/this/one'])
			expect(matchAddressSpace('/second/{1,2,3,4}', addressSpace)).to.deep.equal(['/second/1', '/second/2'])
			expect(matchAddressSpace('/third/{a,b,c,d}', addressSpace)).to.deep.equal(['/third/a', '/third/b', '/third/c'])
		})
	})

	describe('non-existing addresses', function () {
		it('should not match an non-existing address', function () {
			expect(matchAddressSpace('/404/*', addressSpace)).to.deep.equal([])
			expect(matchAddressSpace('/first/this/on?404', addressSpace)).to.deep.equal([])
			expect(matchAddressSpace('/first/this/{404}', addressSpace)).to.deep.equal([])
		})
	})
})
