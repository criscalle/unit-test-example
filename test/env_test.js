const {test, describe, it }= require('node:test');
const assert = require('node:assert');
const {tiMonth, fuelEnergySelector, electricalConsumption, fuelConsumption, combustionConsumption, costElectricalKM, fuelEfficiency, fuelCostKm, energyKm, emisionKm } = require("../calculators/environment");

const electrical_consumption = electricalConsumption(81.14, 200)
const combustion_consumption = combustionConsumption(electrical_consumption)
const fuel_selector = fuelEnergySelector("Diesel")

test('env_ipc', () => { 
    assert.strictEqual(tiMonth(2.8), 0.0023039138595752906)
})

describe("testFuelSelector", () => {
    it("Diesel", () => {
        assert.deepStrictEqual(fuelEnergySelector("Diesel"), {
            "fuel_price": 11798,
            "fuel_energy": 40.7,
            "emision_factor": 74.01  
        })
    })
    it("Gasoline", () => {
        assert.deepStrictEqual(fuelEnergySelector("Gasoline"), {
            "fuel_price": 16700,
            "fuel_energy": 35.58,
            "emision_factor": 69.25
        })
    })
    it("Error", () => {
        assert.deepStrictEqual(fuelEnergySelector("gas"), {
            "error": "Tipo combustible no valido",
            "error_code": 500
        })
    })
})

test("electricalConsumption Test", () => {
    assert.strictEqual(electricalConsumption(81.14, 200), 0.4507777777777778);
});


test("costElectricalKM Test", () => {
    assert.strictEqual(costElectricalKM(0.4507777777777778, 238.25), 107.39780555555555);
});

test("combustionConsumption Test", () => {
    assert.strictEqual(combustionConsumption(0.4507777777777778), 1.6695473251028805);
});

test("fuelConsuption test", () => {
    assert.strictEqual(
        fuelConsumption(
            combustion_consumption, fuel_selector["fuel_energy"]),
            0.04102081879859657
    )
});


describe("fuelEfficiencySelector test", () => {
    it("Diesel", () => {
        assert.strictEqual(fuelEfficiency(0.04692375843459473), 21.31116588612275);
    })
    it("Gasoline", () => {
        assert.strictEqual(fuelEfficiency(0.04102081879859657), 24.377865417796404);
    })
})


/*test("fuelEfficiency Test", () => {
    assert.strictEqual(fuelEfficiency(0.04692375843459473), 21.31116588612275);
}); */

test("fuelCostKm Test", () => {
    assert.strictEqual(fuelCostKm(16700, 0.04692375843459473), 783.626765857732);
}); 


test("energyKm Test", () => {
    assert.deepStrictEqual(energyKm(1.6695473251028805), 6010370.370370369);
}); 


test("emisionKm Test", () => {
    assert.deepStrictEqual(emisionKm(69.25, 6010370.370370369), 416.21814814814803);
}); 
