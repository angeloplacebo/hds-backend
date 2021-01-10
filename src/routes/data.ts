import {Router} from 'express'
import fileupload from 'express-fileupload'

import contentController from '../controllers/ContentController'
import HdController from '../controllers/HdController'
import auth from './verifyToken'

const routes = Router()

routes.use(fileupload())

routes.get('/api', auth ,async (req,res) =>{
  const item = req.query.item
  switch(item){
    case 'hd':
      if(req.query.text?.length != 5){
        var hds = await HdController.index(req,res)
        return res.status(200).json({"hds": hds})
      }else{
        var hds = await HdController.index(req,res)
        var contents = await contentController.findbyTag(req,res)
        return res.status(200).json({"hds": hds, "img-bkp": contents})
      }

    case 'img-bkp':
      var contents = await contentController.index(req,res)
      return res.status(200).json({"img-bkp": contents})

    case 'both':
      var hds = await HdController.index(req,res)
      var contents = await contentController.index(req,res)
      return res.status(200).json({"hds": hds, "img-bkp": contents})
      
    default:
      return res.status(404).json("item not found")
  }
})

routes.get('/api/content/:id',auth , contentController.show)
routes.get('/api/hd/:id',auth , HdController.show)

routes.post('/api/hd',auth ,HdController.create)
routes.post('/api/content',auth ,contentController.create)
routes.post('/api/content/file',auth ,contentController.createByFile)

routes.delete('/api',auth, async(req,res) =>{
  const item = req.query.item
  switch(item){
    case 'hd': 
      let hd = await HdController.delete(req,res)
      return res.status(200).send(hd)
    case 'imgbkp': 
      let imgbkp = await contentController.delete(req,res)
      return res.status(200).send(imgbkp)
    default:
      return res.status(404).send("error")
  }
})

export default routes    