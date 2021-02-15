const Department = require("../models/Department");

module.exports = {

    async list(req, res){
        let departments = await Department.find({});
        res.json(departments);
    },

    async create(req, res){
        let departmentName = req.body.name;
        let departmentVerify = await Department.find({name: departmentName});

        if(departmentVerify.length > 0){
            res.json({msg: "Já existe um departamento com este nome"});
        }

        let saveDepartment = await Department.create({name: departmentName});
        res.json(saveDepartment);
    },

    async update(req, res){
        let departmentId = req.params.id;
        let departmentName = req.body.name;

        let updateDepartment = await Department.findOneAndUpdate({_id: departmentId}, {name: departmentName});

        res.json(updateDepartment);
    },

    async delete(req, res){
        let departmentId = req.params.id;
        let departDelete = await Department.findOneAndDelete({_id: departmentId});

        res.json(departDelete);
    }
}