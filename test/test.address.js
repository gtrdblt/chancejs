define(['Chance', 'mocha', 'chai', 'underscore'], function (Chance, mocha, chai, _) {
    var assert = chai.assert,
        expect = chai.expect;

    describe("Address", function () {
        var zip, suffix, suffixes, state, address, phone, chance = new Chance();

        describe("Zip", function () {
            it("returns a valid basic zip code", function () {
                _(1000).times(function () {
                    zip = chance.zip();
                    expect(zip.length).to.equal(5);
                    expect(/(^\d{5}$)|(^\d{5}-\d{4}$)/.test(zip)).to.be.true;
                });
            });

            it("returns a valid zip+4 code", function () {
                _(1000).times(function () {
                    zip = chance.zip({plusfour: true});
                    expect(zip.length).to.equal(10);
                    expect(/(^\d{5}$)|(^\d{5}-\d{4}$)/.test(zip)).to.be.true;
                });
            });
        });

        describe("Street", function () {
            it("street suffixes returns the suffix array", function () {
                suffixes = chance.street_suffixes();
                expect(suffixes).to.be.an('array');
                _.each(suffixes, function (suffix) {
                    expect(suffix).to.have.keys('name', 'abbreviation');
                });

            });

            it("street suffixes are short", function () {
                suffixes = chance.street_suffixes();
                _.each(suffixes, function (suffix) {
                    expect(suffix.abbreviation).to.have.length.below(5);
                });
            });

            it("full street suffixes are longish", function () {
                suffixes = chance.street_suffixes();
                _.each(suffixes, function (suffix) {
                    expect(suffix.name).to.have.length.above(2);
                });
            });

            it("street suffix returns a single suffix", function () {
                _(1000).times(function () {
                    suffix = chance.street_suffix();
                    expect(suffix).to.be.an('object');
                    expect(suffix.name).to.be.a('string');
                    expect(suffix.abbreviation).to.be.a('string');
                });
            });
        });

        describe("State", function () {
            it("states() returns an array of states", function () {
                expect(chance.states()).to.be.an('array');
            });

            it("state() returns a random (short) state name", function () {
                _(1000).times(function () {
                    state = chance.state();
                    expect(state.length).to.be.below(3);
                });
            });

            it("state({full: true}) returns a random (long) state name", function () {
                _(1000).times(function () {
                    state = chance.state({full: true});
                    expect(state.length).to.be.above(2);
                });
            });
        });

        describe("Address", function () {
            it("address() returns a string", function () {
                expect(chance.address()).to.be.an('string');
            });

            it("address() starts with a number", function () {
                _(1000).times(function () {
                    expect(chance.address()).to.match(/[0-9]+.+/);
                });
            });

            it("address() can take short_suffix arg and obey it", function () {
                _(1000).times(function () {
                    address = chance.address({short_suffix: true});
                    expect(address.split(' ')[2].length).to.be.below(5);
                });
            });
        });

        describe("Phone Number", function () {
            it("areacode() looks right", function () {
                expect(chance.areacode()).to.be.a('string');
                _(1000).times(function () {
                    expect(chance.areacode()).to.match(/\(([0-9]{3})\)/);
                });
            });

            it("phone() returns a string", function () {
                expect(chance.phone()).to.be.a('string');
            });

            it("phone() looks like an actual phone number", function () {
                _(1000).times(function () {
                    expect(chance.phone()).to.match(/\(([0-9]{3})\)?[\-. ]?([0-9]{3})[\-. ]?([0-9]{4})/);
                });
            });
        });

        describe("City", function () {
            it("city() looks right", function () {
                expect(chance.city()).to.be.a('string');
            });
        });
    });
});
