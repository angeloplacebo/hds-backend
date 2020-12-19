import {Response, Request} from 'express'
import { UploadedFile } from 'express-fileupload'

import Content from '../models/Content'

const contentController = {

  async index(req: Request,res: Response){
    try{
      const text = req.query.text != undefined ? req.query.text : ''
      const contents = await Content.find({"Name":{$regex: text,$options:'i'}})
      return contents
    }catch(err){
      return err
    }
  },

  async findbyTag(req:Request, res:Response){
    try{
      const text = req.query.text != undefined ? req.query.text : ''
      const contents = await Content.find({"Local":{$regex: text,$options:'i'}})
      return contents
    }catch(err){
      return err
    }
  },

  async create(req: Request,res: Response) {
    try{
      req.body.Local = String(req.body.Local).toUpperCase()
      req.body.Size = String(req.body.Size).toUpperCase()
      const content = await Content.create(req.body)
      return res.status(201).json(content)
    }catch (err){
      return res.status(500).json(err)
    }
  },

  async createByFile(req: Request, res: Response) {
    
    try{
      const files = req.files
      var content = []

      if(files){
        const f = files.file as UploadedFile
        let fileBuffer = f.data
        let jsonBuffer = JSON.stringify(fileBuffer)
        let bufferOriginal = Buffer.from(JSON.parse(jsonBuffer).data)
        let filecontent = bufferOriginal.toString('utf-8')

        let file = JSON.parse(filecontent)
        var json_file = file

        var count = 0
        for(var i in json_file){
          count = parseInt(i)
        }

        for(let i =0; i<=count ; i++){
          content.push(await Content.create(json_file[i]))
        }

        const { ...result } = content
        return res.status(200).json(result)
      } 
    }catch(err){
      return res.status(500).json(err)
    }
  },

  async delete(req: Request, res: Response){
    try{
      const {id} = req.query
      const result = await Content.findOneAndDelete({"_id": id})
      return result != null ? ("success"): ("not found or already deleted")
    }catch(err){
      return ("error")
    }
  },

  async show(req: Request, res: Response){
    const content = await Content.findById(req.params.id);
    return content != null ? res.status(200).json(content) : res.status(404).json({"error":"not found"})
  }
}

export default contentController