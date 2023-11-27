import Department from '../models/department.model';
import merge from 'lodash/merge';
import errorHandler from './../helpers/dbErrorHandler';

const create = async (req, res) => {
    const department = new Department(req.body);
    try{
        await department.save();
        return res.status(200).json({
            message: 'Successfully created department'
        });
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        });
    }
};

const list = async (req, res) => {
    try {
        let departments = await Department.find().select('Name department updated created');
        res.json(departments);
    } catch (err) {
        return res.status('400').json({
            error: errorHandler.getErrorMessage(err)
        })
    }
};

const departmentById = async (req, res, next, id) => {
    try {
        let department = await Department.findById({_id: id});
        if(!department) {
            return res.status(400).json({
                error: 'Department not found'
            });
        }
        req.profile = department;
        next();
    } catch (err) {
        return res.status(400).json({
            error: "Could not retrieve department"
        });
    }
};

const read = (req, res) => { 
    req.name = 'ss';
    return res.json(req.profile);
  };

const update = async (req, res, next) => {
    try {
        let department = req.profile;
        department = merge(department, req.body);
    } catch (err) {
        console.log(err);
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        });
    }
};

const remove = async (req, res, next) => {
    try {
        console.log('deleted');
        let department = req.profile;
        console.log('department to remove', department);
        let deletedDepartment = await department.deleteOne();
        res.json(deletedDepartment);
    } catch(err) {
        console.log(err);
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        });
    }
};

export default {
    create,
    list,
    read,
    remove,
    departmentById,
    update
};