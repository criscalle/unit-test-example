const { Router } = require('express');
const response = require('../../network/response')
const router = Router();
const ctrl = require('./index');
const {tiMonth, fuelEnergySelector, costElectricalKM, electricalConsumption, combustionConsumption, fuelConsumption, fuelEfficiency, fuelCostKm, energyKm, emisionKm} = require('../../calculators/environment')

const tableInjected = 'my_table'

router.get('/env_test/:fuel', async (req, res) => {
    const fuel = req.params.fuel

    const electrical_consumption = electricalConsumption(81.14, 200)
    const combustion_consumption = combustionConsumption(electrical_consumption)
    const fuel_selector = fuelEnergySelector(fuel)
    const fuel_consuption = fuelConsumption(combustion_consumption, fuel_selector ["fuel_energy"])
    const energy_km = energyKm(combustion_consumption)

    try{
        const list = {
            "month_inflation": tiMonth(2.8),
            "fuel_selected": fuel_selector,
            "electrical_consuption": electrical_consumption,
            "cost_electrical_km": costElectricalKM(electrical_consumption, 238.25),
            "combustion_consuption": combustion_consumption,
            "fuel_consuption": fuel_consuption,
            "fuel_eficienty": fuelEfficiency(fuel_consuption),
            "fuel_cost_km": fuelCostKm(16700, fuel_consuption),
            "energy_km": energyKm(combustion_consumption),
            "emision_km": emisionKm(69.25, energy_km)
        }
        response.success(req, res, list, 200);
    } catch(error){
        response.error(req, res, error.message, 500);
    }
})

router.get('/list', async (req, res) => {
    try {
        const id = req.params.id
        const list = await ctrl.list(tableInjected);
        response.success(req, res, list, 200);    
    } catch (error) {
        response.error(req, res, error.message, 500); 
    }
})


router.get('/list2', async (req, res) => {
    try {
        response.success(req, res, tiMonth(1.4), 200);    
    } catch (error) {
        response.error(req, res, error.message, 500); 
    }
})


router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id
        const list = await ctrl.listById(tableInjected, id);
        response.success(req, res, list, 200);    
    } catch (error) {
        response.error(req, res, error.message, 500); 
    }
})



router.post('/add', async (req, res) => {
    try {
        await ctrl.addElement(tableInjected, data = {
            "data": req.body.data,
        });
        response.success(req, res, `Item Created`, 200);    
    } catch (error) {
        response.error(req, res, error.message, 500);
    }
});


router.put('/update', async (req, res) => {
    try {
        let { id, data } = req.body;
        await ctrl.updateElement(tableInjected, data = {
            "id": id,
            "data": data,
        });
        response.success(req, res, `Item updated`, 200);     
    } catch (error) {
        response.error(req, res, error.message, 500);
    }
});


module.exports = router ;