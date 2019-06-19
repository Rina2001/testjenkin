import { Repository, EntityRepository } from 'typeorm';
import { Customer } from '../entity/customer.entity';
import { ResponseBody } from './responseBody';
import { Status } from 'controller/base.controller';

@EntityRepository(Customer)
export class CustomerRepository extends Repository<Customer>
{
    updateCustomerByID(customer:Customer){
                // block customer 
             return   this.update(customer.ID,{
                    firstName:customer.firstName,
                    lastName:customer.lastName,
                    gender:customer.gender,
                    dob:customer.dob,
                    telephone1:customer.telephone1,
                    telephone2:customer.telephone2,
                    // latitude:customer.latitude,
                    // longtitude:customer.longtitude,
                    city:customer.city,
                    province:customer.province,
                    district:customer.district,
                    village:customer.village,
                    steetNo:customer.steetNo,
                    homeNo:customer.homeNo
                 }) 
                 .then(res=>{
                    let  response = new ResponseBody<any>();
                    response.body=["1"]
                    response.status = Status.success
                    return Promise.resolve(response)
                 }) 
                 .catch(err=>{
                    console.log(err)
                     let  response = new ResponseBody<any>();
                       response.body=[err]
                       response.status = Status.logic_error
                     return Promise.resolve(response)
                })  
        }

     addCustomer(customer:Customer){
            try {
                return  
                    this.save(customer).then(res=>{
                        let  response = new ResponseBody<any>();
                        response.body=["1"]
                        response.status = Status.success
                        return Promise.resolve(response);
                    })
            } 
            catch (error) {
                console.log("CustomerRepository -> addCustomer"+error)
                return Promise.resolve(error)
            }
        }

}