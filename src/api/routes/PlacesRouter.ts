import { Router, Request, Response } from 'express';
import PlacesController from '../controllers/PlacesController';
import PlacesService from '../services/PlacesService';

const placesRouter = Router();
const placesService = new PlacesService();
const placesController = new PlacesController(placesService);

placesRouter.get('/', (req: Request, res: Response) => placesController.getAll(req, res));
placesRouter.post('/', (req: Request, res: Response) => placesController.create(req, res));
placesRouter.put('/', (req: Request, res: Response) => placesController.update(req, res));
placesRouter.delete('/', (req: Request, res: Response) => placesController.remove(req, res));

export default placesRouter;
