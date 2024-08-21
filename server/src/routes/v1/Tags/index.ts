import { Router } from "express";
import TagsController from "./controller";

const TagsRouter = Router({mergeParams: true});

TagsRouter.post('/', TagsController.createTag)

TagsRouter.get('/search/:query', TagsController.getTasksByTag)
TagsRouter.get('/:tagId', TagsController.getTag)

TagsRouter.get('/', TagsController.getAllTags)



export default TagsRouter;