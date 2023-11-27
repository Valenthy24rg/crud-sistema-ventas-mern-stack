import City from '../models/city.model';
import merge from 'lodash/merge';
import errorHandler from './../helpers/dbErrorHandler';


const create = async (req, res) => {
    const city = new City(req.body);
    try {
        
    }
}