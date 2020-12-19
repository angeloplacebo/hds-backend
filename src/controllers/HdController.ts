import { Response, Request} from 'express'


import Hd from '../models/Hd'

const HdController = {

  async index(req: Request, res: Response){
    try{
      var text = (req.query.text != undefined) ? String(req.query.text).toUpperCase() : ''
      const hds = await Hd.find({"TAG": {$regex: text,$options:'i'}})
      return hds
    }catch(err){
      return err
    }
  },

  async create(req: Request,res: Response) {
    try{
      req.body.TAG = String(req.body.TAG).toUpperCase()
      req.body.PN = String(req.body.PN).toUpperCase()
      req.body.SN = String(req.body.SN).toUpperCase()
      req.body.Capacidade = String(req.body.Capacidade).toUpperCase()
      const hd = await Hd.create(req.body)
      return res.status(201).json(hd)
    }catch (err){
      return res.status(500).json(err)
    }
  },

  async delete(req: Request, res: Response){
    try{
      const {id} = req.query
      const result = await Hd.findOneAndDelete({"_id": id})
      return result != null ? ("success"): ("not found or already deleted")
    }catch(err){
      return ("error")
    }
  },

  async show(req: Request, res: Response){
    const hd = await Hd.findById(req.params.id);
    return hd != null ? res.status(200).json(hd) : res.status(404).json({"error":"not found"})
  }

}

export default HdController