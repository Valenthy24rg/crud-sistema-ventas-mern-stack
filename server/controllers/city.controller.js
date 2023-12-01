import City from '../models/city.model';
import merge from 'lodash/merge';
import errorHandler from './../helpers/dbErrorHandler';


const create = async (req, res) => {
    const city = new City(req.body);
    try {
        await city.save();
        return res.status(200).json({
            message: 'City saved Successfully!'
        });
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        });
    }
};


const list = async (req, res) => {
    try {
        let cities = await City.find().select('name city updated created');
        res.json(cities);
    } catch (err) {
        return res.status('400').json({
            error: errorHandler.getErrorMessage(err)
        })
    }
};

const cityById = async (req, res, next, id) => {
    try {
        let city = await City.findById({_id: id});
        if(!city) {
            return res.status(400).json({
                error: 'City not found'
            });
        }
        req.profile = city;
        next();
    } catch (err) {
        console.log(err);
        return res.status(400).json({
            error: "Could not retrieve city"
        })
    }
};

const read = (req, res) => {
    req.name = 'ss'
    return res.json(req.profile);
};

const update = async (req, res, next) => {
    try {
        let city = req.profile;
        city = merge(city, req.body);

        city.updated = Date.now();
        await city.save();

        res.json(city);
    }  catch (err) {
        console.log(err);
        return res.status(400).json({
          error: errorHandler.getErrorMessage(err)
        });
      }
};


const remove = async (req, res, next) => {
    try {
        console.log('deleted');
        let city = req.profile;
        console.log('city to remove', city);
        let deletedCity = await city.deletedOne();
        res.json(deletedCity);
    } catch(err) {
        console.log(err);
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        });
    }
};

const addDepartment = async (req, res) => {
    try {
        const result = await City.findByIdAndUpdate(
            req.body.cityId,
            { $push: { department: req.body.departmentId } },
            { new: true }
        )
        .populate('department', '_id name')
        .exec();
        result.salt = undefined;
        res.json(result);
    } catch (err) {
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
    cityById,
    update,
    addDepartment
};