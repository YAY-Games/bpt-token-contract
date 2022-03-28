const { BN, expectRevert } = require('@openzeppelin/test-helpers');

const { expect } = require('chai');

const BoldPointToken = artifacts.require('BoldPointToken');

contract('BoldPointToken', function (accounts) {
  const [ admin, holder, recipient, anotherAccount ] = accounts;

  const testSupply = new BN("1000000");

  const name = 'Bold Point Token';
  const symbol = 'BPT';

  beforeEach(async function () {
    this.token = await BoldPointToken.new();
    await this.token.transfer(holder, testSupply, { from: admin });
  });

  describe('pausable token', function () {
    describe('transfer', function () {
      it('allows to transfer when unpaused', async function () {
        await this.token.transfer(recipient, testSupply, { from: holder });

        expect(await this.token.balanceOf(holder)).to.be.bignumber.equal('0');
        expect(await this.token.balanceOf(recipient)).to.be.bignumber.equal(testSupply);
      });

      it('allows to transfer when paused and then unpaused', async function () {
        await this.token.pause();
        await this.token.unpause();

        await this.token.transfer(recipient, testSupply, { from: holder });

        expect(await this.token.balanceOf(holder)).to.be.bignumber.equal('0');
        expect(await this.token.balanceOf(recipient)).to.be.bignumber.equal(testSupply);
      });

      it('reverts when trying to transfer when paused', async function () {
        await this.token.pause();

        await expectRevert(this.token.transfer(recipient, testSupply, { from: holder }),
          'ERC20Pausable: token transfer while paused',
        );
      });
    });

    describe('transfer from', function () {
      const allowance = new BN(40);

      beforeEach(async function () {
        await this.token.approve(anotherAccount, allowance, { from: holder });
      });

      it('allows to transfer from when unpaused', async function () {
        await this.token.transferFrom(holder, recipient, allowance, { from: anotherAccount });

        expect(await this.token.balanceOf(recipient)).to.be.bignumber.equal(allowance);
        expect(await this.token.balanceOf(holder)).to.be.bignumber.equal(testSupply.sub(allowance));
      });

      it('allows to transfer when paused and then unpaused', async function () {
        await this.token.pause();
        await this.token.unpause();

        await this.token.transferFrom(holder, recipient, allowance, { from: anotherAccount });

        expect(await this.token.balanceOf(recipient)).to.be.bignumber.equal(allowance);
        expect(await this.token.balanceOf(holder)).to.be.bignumber.equal(testSupply.sub(allowance));
      });

      it('reverts when trying to transfer from when paused', async function () {
        await this.token.pause();

        await expectRevert(this.token.transferFrom(
          holder, recipient, allowance, { from: anotherAccount }), 'ERC20Pausable: token transfer while paused',
        );
      });
    });

    describe('burn', function () {
      const amount = new BN('42');

      it('allows to burn when unpaused', async function () {
        await this.token.burn(amount, {from: holder});

        expect(await this.token.balanceOf(holder)).to.be.bignumber.equal(testSupply.sub(amount));
      });

      it('allows to burn when paused and then unpaused', async function () {
        await this.token.pause();
        await this.token.unpause();

        await this.token.burn(amount, {from: holder});

        expect(await this.token.balanceOf(holder)).to.be.bignumber.equal(testSupply.sub(amount));
      });

      it('reverts when trying to burn when paused', async function () {
        await this.token.pause();

        await expectRevert(this.token.burn(amount, { from: holder }),
          'ERC20Pausable: token transfer while paused',
        );
      });
    });
  });
});
