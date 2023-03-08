const kpiModel = require('../model/kpi')

class Controller {
    // -------------------- Fetch All KPIS
    async allKpis(req, res, next) {
        try {
            const Kpis = await kpiModel.find({});
            res.status(200).json({ success: true, message: 'Kpis', data: Kpis });
        } catch (err) {
            next(err);
        }
    }

    // -------------------- Add Kpi
    async addKpi(req, res) {

        // Check if the request body is empty
        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({ success: false, message: "You must add KPI name" });
        }

        // Check if the KPI is already in the database 
        const kpiExists = await kpiModel.findOne({ name: req.body.name })
        if (kpiExists) {
            // 409 Conflict
            return res.status(409).json({ success: false, message: "KPI already exists" })
        }

        const newKpi = new kpiModel({
            name: req.body.name.toLowerCase(),
        });

        // Save new KPI to database
        try {
            const savedKPI = await newKpi.save();
            return res.status(201).json({ success: true, message: "New KPI added successfully", data: savedKPI });
        } catch (error) {
            // return res.status(500).json({ success: false, message: "Failed to add KPI" });
            next(error)
        }

    }

    // -------------------- Delete
    async deleteKPI(req, res, next) {

        try {
            const kpi = await kpiModel.findById(req.params.id).populate('employees')

            // Check if KPI is associated with employees
            if (kpi.employees.length > 0) {
                res.status(403).json({ success: true, message: "This KPI is associated with a list of employees, cannot be deleted" })
            }

            // Delete KPI from database
            const deletedKpi = await kpiModel.findByIdAndDelete(req.params.id);

            if (!deletedKpi) {
                return res.status(404).json({ message: "KPI not found" });
            }

            res.status(200).json({ success: true, message: "KPI removed from database!" });
        } catch (err) {
            next(err);
        }

    }

    // ---------------------  Update KPI name
    async updateKPIName(req, res, next) {

        try {

            // Check if the request body is empty
            if (!req.body || Object.keys(req.body).length === 0) {
                return res.status(400).json({ success: false, message: "You must add KPI name" });
            }

            // Check if the name already exists
            const apiExists = await kpiModel.findOne({ name: req.body.name });
            if (apiExists) {
                return res.status(400).json({ message: 'KPI already exists' });
            }

            // Update the KPI by ID
            const kpiData = await kpiModel.findByIdAndUpdate(
                req.params.id,
                { $set: req.body },
                { new: true }
            );

            res.status(200).json({ success: true, message: 'Data updated successfully', data: kpiData });
        } catch (err) {
            next(err)
        }

    }
}




const controller = new Controller(); //Creating an instance from this class 
module.exports = controller; 